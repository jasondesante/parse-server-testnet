import Moralis from 'moralis';

import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import http from 'http';

//
import { MongoClient } from 'mongodb';
const PORT = process.env.PORT || 3000
//

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



//
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

app.get("/items/:my_item", async (req, res) => {
  let my_item = req.params.my_item;
  let item = await client.db("my_db")
              .collection("my_collection")
              .findOne({my_item: my_item})

  return res.json(item)
})

client.connect(err => {
  if(err){ console.error(err); return false;}
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
});
//



app.use(`/server`, parseServer.app);

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, async () => {
  
    console.log(`Moralis Server is running on port ${config.PORT}.`);

});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
