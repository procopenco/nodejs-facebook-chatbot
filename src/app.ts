
import express from 'express';



// Imports dependencies and set up http server
const app = express();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.get('/test', (_, res)=>{
  res.send('Hello world');
});