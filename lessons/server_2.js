import express from 'express';

const app = express();

app.use(express.static('public'));

app.post('/api', express.json(), (req, res) => {
  console.log(req.body)
});

app.listen(3000);
