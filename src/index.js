const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");
const {setupWebsocket} = require("./websocket");

const app = express();
const server = http.Server(app);
//Voce deve por a URL do seu banco de dados do mongodb
mongoose.connect("URL_MONGODB_SUBSTITUIR", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
setupWebsocket(server);
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());//informa p/ o express o corpo dos dados que irá receber, neste caso Json
app.use(routes)


server.listen(3333); 