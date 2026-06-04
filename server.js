const app = require('./api/index.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Portfolio Admin Server running!`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`Admin Panel:  http://localhost:${PORT}/admin.html`);
  console.log(`========================================`);
});
