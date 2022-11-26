import express from 'express';
import path from 'path';

const app = express();
app.use(express.static(
  path.resolve('public'))
);

app.use('/', (req, res) => {
  res.sendStatus(404);
});

/* 
  app.use('/', (req, res) => {
    res.send('Hello');
    res.sendStatus(200);


    const filePath = path.resolve('public', 'index.html');
    res.sendFile(filePath);
  }); 
*/

app.listen(3000);
