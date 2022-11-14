import { io, Socket } from 'socket.io-client';

class ChatService {

    // Client Socket:
    private socket: Socket;

    // Connecting to server: 
    public connect(updateUI: Function): void {

        // Connect to server: 
        this.socket = io("http://localhost:3001");

        // Listen to server messages: 
        this.socket.on("msg-from-server", (msg: string) => {

            // Dispatch msg to Redux (instead the following updateUI) ...

            // Updating UI: 
            updateUI(msg);
        });
    }

    // Send message to backend: 
    public send(msg: string): void {
        this.socket.emit("msg-from-client", msg);
    }

    // Disconnect from server: 
    public disconnect(): void {
        this.socket.disconnect();
    }

}

const chatService = new ChatService();

export default chatService;


