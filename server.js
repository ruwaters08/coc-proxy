const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(async (req, res) => {
  try {
    const cocUrl = 'https://api.clashofclans.com' + req.path + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
    const response = await fetch(cocUrl, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    const text = await response.text();
    try {
      res.status(response.status).json(JSON.parse(text));
    } catch {
      res.status(response.status).send(text);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
