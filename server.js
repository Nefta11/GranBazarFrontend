const express = require('express');
const cors = require('cors');
const app = express();

// ...existing code...

app.use(cors({
  origin: 'http://localhost:3000'
}));

// ...existing code...

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
