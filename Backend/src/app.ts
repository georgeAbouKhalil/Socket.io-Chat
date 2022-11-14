import express from "express";
import socketLogic from "./business-logic/socket-logic";

const expressServer = express();

const httpServer = expressServer.listen(3001, () => console.log("Listening..."));
socketLogic(httpServer);
