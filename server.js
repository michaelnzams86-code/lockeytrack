const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// This line tells the server to allow access to all files in the folder
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
