import { $log } from 'ts-log-debug';
import { Server } from './app';

new Server()
    .start()
    .then(() => {
        $log.info('Server started...');
    })
    .catch((err) => {
        $log.error(err);
    });


// import app from "./app";
// import http from "http";

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

/**
 * Start Express server.
 */
// Sets server port and logs message on success
// let port  = process.env.PORT || 1338;
// app.set('port', port);

// console.log('application port will be ' + port);

// var server = http.createServer(app);

// console.log('Start listening...');
// server.listen(port);

// // app.listen(port, ()=>{
// //   console.log(
// //     "  App is running at http://localhost:%d in %s mode",
// //     app.get("port"),
// //     app.get("env")
// //   );
// //   console.log("  Press CTRL-C to stop\n");  
// // });

// // app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


// // const server = app.listen(app.get("port"), () => {
// //   console.log(
// //     "  App is running at http://localhost:%d in %s mode",
// //     app.get("port"),
// //     app.get("env")
// //   );
// //   console.log("  Press CTRL-C to stop\n");
// // });

// export default server;