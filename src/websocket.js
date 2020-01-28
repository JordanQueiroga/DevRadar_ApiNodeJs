const socketio = require("socket.io");
const parsestringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");

const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);
    //este listem faz com que toda vez que um usuario se conectar vai receber um obj chamado socket
    io.on("connection", socket => {
        console.log(socket.id);
        console.log(socket.handshake.query);
        const { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coodinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parsestringAsArray(techs)
        })
        /* setTimeout(() => {
            socket.emit("message", "Hollo")
        }, 3000)//depois de 3s o backend vai enviar uma mensagem para o frontend */
    })
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connections.coodinates) < 10
            && connections.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}