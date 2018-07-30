
import express from 'express';



// Imports dependencies and set up http server
const app = express();


app.get('/test', (_, res)=>{
  res.send('Hello worldSS!');
});

export default app;
