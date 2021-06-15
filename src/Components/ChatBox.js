import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import moment from "moment";
import Message from "./Message";

const ChatBox = ({ serverChat }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  return (
    <div className="chat-container">
      <div className="chat-input-container">
        <TextField
          variant="outlined"
          placeholder="Say something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setMessageList([
              ...messageList,
              { message, date: moment(Date()).format("DD MMM hh:mm a") },
            ]);
            setMessage("");
          }}
        >
          Send
        </Button>
      </div>
      <div className="message-container">
        <div className="local-chat-container">
          {messageList &&
            messageList.map((message, index) => (
              <Message key={`message-${index}`} post={message} />
            ))}
        </div>
        <div className="server-chat-container">
          {serverChat &&
            serverChat.map((message, index) => (
              <Message key={`message-${index}`} post={message} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
