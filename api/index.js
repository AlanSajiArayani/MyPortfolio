const express = require('express');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const DATA_FILE = path.join(__dirname, '..', 'data.json');
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Initialize Supabase client if environment variables are configured
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log('Supabase client successfully initialized.');
} else {
  console.log('Running in local filesystem fallback mode.');
}

// Middleware for parsing JSON and serving static files locally
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..')));

// API Endpoint to check login password
app.post('/api/login', (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  if (adminPassword === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid admin password.' });
  }
});

// API Endpoint to get portfolio data
app.get('/api/portfolio', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (error) throw error;
      res.json(data.data);
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
      res.status(500).json({ error: 'Failed to fetch portfolio data from database.' });
    }
  } else {
    // Local filesystem fallback
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading database file:', err);
        return res.status(500).json({ error: 'Failed to read database file.' });
      }
      try {
        res.json(JSON.parse(data));
      } catch (parseErr) {
        console.error('Error parsing database JSON:', parseErr);
        res.status(500).json({ error: 'Database JSON file is corrupted.' });
      }
    });
  }
});

// API Endpoint to generate AI images (1024x1024) using Gemini Imagen or Pollinations AI fallback
app.post('/api/generate-image', async (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  if (adminPassword !== PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin password.' });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  let imageBuffer = null;
  let usedModel = '';

  const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      error: 'Gemini API Key is missing. Please enter a valid Gemini API Key in the config field at the top of the Projects tab to generate AI images.'
    });
  }

  try {
    console.log('Attempting Gemini Imagen 3 generation...');
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt
            }
          ],
          parameters: {
            sampleCount: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1'
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errMsg = errorText;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.error && errJson.error.message) {
          errMsg = errJson.error.message;
        }
      } catch (_) {}
      throw new Error(`Gemini Imagen error: ${errMsg}`);
    }

    const data = await response.json();
    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      usedModel = 'Gemini Imagen 3';
    } else {
      throw new Error('Gemini response did not contain predictions.');
    }
  } catch (err) {
    console.error('Gemini Imagen generation failed:', err.message);
    return res.status(500).json({ error: err.message });
  }

  // Save the image locally if possible
  const filename = `generated-${Date.now()}.jpg`;
  const imagesDir = path.join(__dirname, '..', 'images');
  const localFilePath = path.join(imagesDir, filename);
  const relativePath = `images/${filename}`;

  try {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    fs.writeFileSync(localFilePath, imageBuffer);
    console.log(`Saved generated image to ${localFilePath}`);
    return res.json({
      success: true,
      imagePath: relativePath,
      model: usedModel
    });
  } catch (writeErr) {
    console.warn('Could not write image to local disk (probably read-only / Vercel). Returning base64 URI.', writeErr.message);
    const base64Uri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    return res.json({
      success: true,
      imagePath: base64Uri,
      model: usedModel,
      fallbackMode: 'base64'
    });
  }
});

// API Endpoint to update portfolio data (password-protected)
app.post('/api/save', async (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  
  if (adminPassword !== PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin password.' });
  }

  const updatedData = req.body;
  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Invalid payload structure.' });
  }

  if (supabase) {
    try {
      const { error } = await supabase
        .from('portfolio')
        .update({ data: updatedData })
        .eq('id', 1);
      
      if (error) throw error;
      res.json({ message: 'Portfolio data updated successfully on Supabase.' });
    } catch (err) {
      console.error('Error writing to Supabase:', err);
      res.status(500).json({ error: 'Failed to write updates to database.' });
    }
  } else {
    // Local filesystem fallback
    fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing database file:', err);
        return res.status(500).json({ error: 'Failed to write updates to database file.' });
      }
      console.log('Local database updated successfully.');
      res.json({ message: 'Portfolio data updated successfully.' });
    });
  }
});

// Fallback to send index.html for undefined frontend routes locally
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Export Express app for Vercel serverless integration
module.exports = app;
