const { Router } = require("express");

const DevController = require("./controller/DevController")
const SearchController = require("./controller/SearchController")

const routes = Router();

//Query params: request.query
//Route params: request.params
//Body: request.body

routes.get("/devs",DevController.index)
routes.post("/devs", DevController.store);

routes.get("/search",SearchController.index)

module.exports = routes;