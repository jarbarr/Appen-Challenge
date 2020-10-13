const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, (err) => {
  if (err) {
    console.error(`server error: ${err}`);
  } else {
    console.log(`listening on port ${PORT}`);
  }
});