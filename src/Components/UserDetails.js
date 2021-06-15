import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Badge,
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";
import moment from "moment";
import ChatBox from "./ChatBox";
import Message from "./Message";

const UserDetails = () => {
  let history = useHistory();
  const [auctionId, setAuctionId] = useState("");
  const [isAuctionId, setIsAuctionId] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [connection, setConnection] = useState(null);
  const [posts, setPosts] = useState([]);
  const [serverChat, setServerChat] = useState([]);

  const verifyLoginDetails = history.location.state.verifyLoginResponse;

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("http://biofenusersignalrapp.azurewebsites.net/api/")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {}, [connection, notificationCount]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          toast.success("SignalR Connected");
        })
        .catch((error) => {
          toast.error(error);
          console.log(error);
        });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      console.log("auctionId", auctionId);
      connection.on("newMessage", (message) => newMessage(message));
      const newMessage = (message) => {
        console.log("message", message);
        const splitMessage = message.text.split(":");
        if (splitMessage[0] === "AUCTION_MESSAGE") {
          if (auctionId === splitMessage[1]) {
            setPosts([
              {
                message: splitMessage[2],
                date: moment(Date()).format("DD MMM hh:mm a"),
              },
              ...posts,
            ]);
            console.log("posts", posts);
          }
        } else if (
          splitMessage[0] === "CHAT_MESSAGE" &&
          auctionId === splitMessage[1]
        ) {
          setServerChat([
            ...serverChat,
            {
              message: splitMessage[2],
              date: moment(Date()).format("DD MMM hh:mm a"),
            },
          ]);
        } else if (
          splitMessage[0] === "NOTIFICATION_MESSAGE" &&
          parseInt(splitMessage[1]) === verifyLoginDetails.person_Id
        ) {
          setNotificationCount(notificationCount + 1);
        }
      };
    }
  }, [connection, posts, auctionId, notificationCount, serverChat]);

  return (
    <>
      <Typography variant="p">Welcome</Typography>
      <Typography variant="h4">{verifyLoginDetails.user_Name}</Typography>
      <IconButton style={{ position: "absolute", top: 47, right: 30 }}>
        <Badge badgeContent={notificationCount} color="primary">
          <Notifications style={{ color: "#fff" }} />
        </Badge>
      </IconButton>
      <div className="user-details-container">
        <div className="post-container">
          <div className="auction-container">
            <Typography style={{ color: "#000", fontWeight: 600 }}>
              Auction ID
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter Auction ID"
              value={auctionId}
              onChange={(e) => {
                setAuctionId(e.target.value);
              }}
            />
            {!isAuctionId ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAuctionId(auctionId);
                  setIsAuctionId(true);
                  if (!isAuctionId) {
                    document.querySelector(".MuiTextField-root").style.width =
                      "calc(100% - 280px) !important";
                  }
                }}
              >
                Set Auction ID
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAuctionId("");
                  setIsAuctionId(false);
                }}
              >
                Reset Auction ID
              </Button>
            )}
          </div>
          <div style={{ height: "calc(100% - 46px)", overflow: "auto" }}>
            {posts &&
              posts.map((post, index) => (
                <Message key={`post-${index}`} post={post} />
              ))}
          </div>
        </div>
        <ChatBox serverChat={serverChat} />
      </div>
    </>
  );
};
export default UserDetails;
