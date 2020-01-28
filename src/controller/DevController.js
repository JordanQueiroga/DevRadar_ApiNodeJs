const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
    async index(request, response) {//search users list
        const devs = await Dev.find();
        return response.json(devs);
    },


    async store(request, response) {//save one nem user
        const { github_username, techs, longitude, latitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //se o name n existir ele pega o valor do login
            const { name , login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs)
            const location = {
                type: "Point",
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                avatar_url,
                name: !!name ? name : login,
                bio,
                techs: techsArray,
                location,
            });
            //Filtrar as conexões que estão no maximo 10km de distancia
            //e que o novo dev tennha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )
            //envia as conexões, dps a mensagem e depois os dados do novo dev
            sendMessage(sendSocketMessageTo, "new-dev", dev);
        }
        return response.json(dev);
    },

    async update(request, response) {//fazer essa parte

    },

    async destroy(request, response) {//essa tbm

    },

};