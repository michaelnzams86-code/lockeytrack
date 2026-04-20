const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files (CSS, JS, Images) from the root directory
app.use(express.static(path.join(__dirname, '/')));

// Root route: sends your index.html file to the user's browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
