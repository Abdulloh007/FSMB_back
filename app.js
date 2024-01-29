const express = require('express');
const conf = require('./config/conf'); // Import the conf.js file
const app = express();
const port = conf.port || 3000; // Use the port from conf.js or default to 3000
const host = conf.host || 'localhost'; // Use the host from conf.js or default to 'localhost'

// Define your routes here

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
