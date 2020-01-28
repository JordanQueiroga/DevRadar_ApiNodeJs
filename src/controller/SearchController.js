const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //pesquisa dentro de techs os usuarios que tem estas tecnologias passada (in significa dentro de ->pesquisar mongo operators)
            },
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [latitude, longitude]
                    },
                    $maxDistance: 10000//10 km
                }
            }
        });

        return response.json({ devs })
    }
}