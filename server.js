const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(async (req, res) => {
  const cocUrl = 'https://api.clashofclans.com' + req.path + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
  const response = await fetch(cocUrl, {
    headers: { 'Authorization': req.headers['authorization'] }
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.listen(process.env.PORT || 3000);
