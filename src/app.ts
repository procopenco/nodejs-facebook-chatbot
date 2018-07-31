
// import express from 'express';
// import request from 'request';

import * as Path from 'path';
import * as dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

dotenv.config({ path: '.env' });

import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from 'ts-express-decorators';
import { $log } from 'ts-log-debug';


// import { MessageHandlers } from './lib/message-handlers';


// Imports dependencies and set up http server
const app = express();
// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// let messageHandlers = new MessageHandlers();

app.get('/test', (_, res)=>{
  res.send('Hello worldSS!');
});


const rootDir = Path.resolve(__dirname);
@ServerSettings({
    rootDir,
    mount: {
        '/api/v1': `${rootDir}/controllers/**/**.controller.{ts,js}`
    },
    componentsScan: [
        `${rootDir}/services/**/**.service.{ts,js}`,
        `${rootDir}/middlewares/**/**.{ts,js}`,

        `${rootDir}/dal/**/**.{ts,js}`
    ],
    httpPort: process.env.PORT || 1338,
    httpsPort: false,
    acceptMimes: ['application/json'],
    swagger: {
        path: '/api-docs'
    }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  public async $onMountingMiddlewares(): Promise<any> {
      this
          .use(GlobalAcceptMimesMiddleware)
          .use(bodyParser())
          .use(compression())
          .use(express())
          .use(logger('dev'))
          .use(bodyParser.json())
          .use(bodyParser.urlencoded({
              extended: true
          }));

      return null;
  }

  async $onInit(): Promise<any> {
      // await MongooseService.connect();
      $log.debug('DB connected');
  }

  public $onReady() {
      $log.info('Server started...');
  }

  public $onServerInitError(err: any) {
      $log.error(err);
  }
}
/*

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req:any, res:any) => {  
  //return;
   
   // Parse the request body from the POST
   let body = req.body;
 
   // Check the webhook event is from a Page subscription
   if (body.object === 'page') {
 
     // Iterate over each entry - there may be multiple if batched
     body.entry.forEach(function(entry: any) {
 
       // Get the webhook event. entry.messaging is an array, but 
       // will only ever contain one event, so we get index 0
       let webhook_event = entry.messaging[0];
       console.log(webhook_event);
       
       // Get the sender PSID
       let sender_psid = webhook_event.sender.id;
       console.log('Sender PSID: ' + sender_psid);
       
       // Check if the event is a message or postback and
       // pass the event to the appropriate handler function
       if (webhook_event.message) {
         handleMessage(sender_psid, webhook_event.message);        
       } else if (webhook_event.postback) {
         handlePostback(sender_psid, webhook_event.postback);
       }
       
     });
 
     // Return a '200 OK' response to all events
     res.status(200).send('EVENT_RECEIVED');
 
   } else {
     // Return a '404 Not Found' if event is not from a page subscription
     res.sendStatus(404);
   }
 
 });
 
 // Accepts GET requests at the /webhook endpoint
 app.get('/webhook', (req, res) => {
   
   // UPDATE YOUR VERIFY TOKEN 
   const VERIFY_TOKEN = "vkmsmvls245awsdkfj42-3331";
   
   // Parse params from the webhook verification request
   let mode = req.query['hub.mode'];
   let token = req.query['hub.verify_token'];
   let challenge = req.query['hub.challenge'];
     
   // Check if a token and mode were sent
   if (mode && token) {
   
     // Check the mode and token sent are correct
     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
       
       // Respond with 200 OK and challenge token from the request
       console.log('WEBHOOK_VERIFIED');
       res.status(200).send(challenge);
     
     } else {
       // Responds with '403 Forbidden' if verify tokens do not match
       res.sendStatus(403);      
     }
   }else{
     res.status(400).send('hub.mode or hub.verify_token or hub.challenge is missing');
   }
 });

 // Handles messages events
function handleMessage(sender_psid: any, received_message: any) {
  let response = nlpProcessor(received_message);

  // Sends the response message
  callSendAPI(sender_psid, response);    
}

// Handles messaging_postbacks events
function handlePostback(sender_psid: any, received_postback: any) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid: any, response: any) {
  console.log("Sending reponse");
  console.log(response);
  
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    let error;
    if(err){
      error = err;
    }else if(body.error){
      error = body.error;
    }
    
    
    if (!error) {
      console.log('message sent!');      
    } else {
      console.error("Unable to send message:" + error);
      console.error(res);
    }
  }); 
}

function nlpProcessor(message: any){
  let entities = message.nlp.entities;
  console.log(message.nlp.entities);
  if(entities.greetings && entities.greetings[0].confidence > 0.9){
    return messageHandlers.greetingsHandler(message);
  }
  
  return messageHandlers.fallbackHandler(message);
}

export default app;
*/