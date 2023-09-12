const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const port = 3500;

app.use(cors()); 

app.use(bodyParser.json());

const { convertCode, debugCode, checkEfficiency } = require('./codeConversion');


app.post('/convert', convertCode);
app.post('/debug', debugCode);
app.post('/check-efficiency', checkEfficiency);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
