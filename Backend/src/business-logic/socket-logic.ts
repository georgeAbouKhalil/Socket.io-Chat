import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

function socketLogic(httpServer: HttpServer): void {

    const options = {
        cors: {
            origin: "*"
        }
    };

    const socketIoServer = new SocketIoServer(httpServer, options);

    // Listen to client connections: 
    socketIoServer.sockets.on("connection", (socket: Socket) => {

        console.log("Client has been connected.");

        // Listen to message from a client: 
        socket.on("msg-from-client", (msg: string) => {

            console.log(msg);

            // All connected sockets - send that message to them all: 
            socketIoServer.sockets.emit("msg-from-server", msg);

        });

        // Listen to client disconnections: 
        socket.on("disconnect", () => {
            console.log("Client has been disconnect.");
        });

    });

}

export default socketLogic;