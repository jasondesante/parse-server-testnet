import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import http from 'http';

export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Enable CORS for all routes
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", 'PUT,POST,GET,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
// //   res.header("Access-Control-Request-Headers", "x-moralis-platform");
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });


app.use(cors());
// app.use(cors({
//   origin: "*",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: true,
//   optionsSuccessStatus: 204,
//   credentials: true,
// }));



app.use(`/server`, parseServer.app);

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, async () => {
  
    console.log(`Moralis Server is running on port ${config.PORT}.`);

});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
