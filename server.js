const express = require('express');
const app = express();

const SERVER_PORT = process.env.PORT || 3000

app.listen(SERVER_PORT, () => { console.log(`Server running at http://localhost:${SERVER_PORT}/`) })