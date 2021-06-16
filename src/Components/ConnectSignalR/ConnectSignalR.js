import { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import moment from "moment";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";
import axios from "axios";
import Message from "../Message";

const ConnectSignalR = () => {
  const [personId, setPersonId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [SignalRConnection, setSignalRConnection] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (SignalRConnection) {
      SignalRConnection.on("newMessage", (message) => newMessage(message));
      const newMessage = (message) => {
        console.log(message);
        setPosts([
          {
            message: message,
            date: moment(Date()).format("DD MMM hh:mm a"),
          },
          ...posts,
        ]);
      };
    }
  }, [SignalRConnection, posts]);

  const handelConnect = () => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`https://biofenusersignalrapp.azurewebsites.net/api`, {
        headers: {
          "x-ms-signalr-userid": parseInt(personId),
          "x-functions-key": "Fendahl#123",
        },
      })
      .withAutomaticReconnect()
      .build();
    setSignalRConnection(connection);

    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("GetConnectionId").then((res) => console.log(res));
          toast.success("SignalR Connected");
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  };

  const handelAddGroup = () => {
    axios
      .post(
        `https://biofenusersignalrapp.azurewebsites.net/api/${groupName}/add/${personId}`
      )
      .then((res) => {
        if (res.status === 204) {
          toast.success("Added to Group Successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signalR-container">
      <div className="person-container">
        <TextField
          variant="outlined"
          placeholder="Enter Person Id"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!personId}
          color="primary"
          onClick={handelConnect}
        >
          Connect
        </Button>
      </div>
      <div className="person-container">
        <TextField
          variant="outlined"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!groupName}
          color="primary"
          onClick={handelAddGroup}
        >
          Add Group
        </Button>
      </div>
      <div className="message-container">
        <div className="local-chat-container">
          {posts.length > 0 && <h3>Messages</h3>}
          {posts &&
            posts.map((post, index) => (
              <Message key={`post-${index}`} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ConnectSignalR;
