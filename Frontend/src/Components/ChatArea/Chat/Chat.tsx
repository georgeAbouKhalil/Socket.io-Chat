import { Component, SyntheticEvent } from "react";
import "./Chat.css";
import chatService from "../../../Services/ChatService";

interface ChatState {
    msgToSend: string;
    messages: string[];
}

class Chat extends Component<{}, ChatState> {

    public constructor(props: {}) {
        super(props);
        this.state = { msgToSend: "", messages: [] };
    }

    private connect = () => {
        chatService.connect((msg: string) => {

            // Add new message to array: 
            const messages = [...this.state.messages];
            messages.push(msg);
            this.setState({ messages });

        });
    }

    private disconnect = () => {
        chatService.disconnect();
    }

    private setMessage = (args: SyntheticEvent) => {
        const msgToSend = (args.target as HTMLInputElement).value;
        this.setState({ msgToSend });
    }

    private send = () => {
        chatService.send(this.state.msgToSend);
    }

    public render(): JSX.Element {
        return (
            <div className="Chat">
                <button onClick={this.connect}>Connect</button>
                <button onClick={this.disconnect}>Disconnect</button>
                <hr />
                <label>Message: </label>
                <input type="text" onChange={this.setMessage} value={this.state.msgToSend} />
                <button onClick={this.send}>Send</button>
                <section>
                    {this.state.messages.map(m => <p>{m}</p>)}
                </section>
            </div>
        );
    }
}

export default Chat;
