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
