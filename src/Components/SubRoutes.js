import { useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";
import moment from "moment";

import About from "./AboutUs/About";
import Contact from "./ContactUs/Contact";
import Navigation from "./Navigation/Navigation";
import User from "./User/User";

const SubRoutes = () => {
  const { path, url } = useRouteMatch();
  const [connection, setConnection] = useState(null);
  const [posts, setPosts] = useState([]);

  const verifyLoginDetails = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(
        `http://52.172.150.57:8042/NotificationUserHub?userId=${verifyLoginDetails.person_Id}`
      )
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, [verifyLoginDetails.person_Id]);

  useEffect(() => {
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
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (message) => ReceiveMessage(message));
      const ReceiveMessage = (message) => {
        console.log("message", message);
        setPosts([
          {
            message: message,
            date: moment(Date()).format("DD MMM hh:mm a"),
          },
          ...posts,
        ]);
      };
    }
  }, [connection, posts]);

  console.log("posts", posts);

  return (
    <>
      <Navigation url={url} />
      <Route path={`${path}/info`}>
        <User posts={posts} setPosts={setPosts} />
      </Route>
      <Route path={`${path}/about`}>
        <About posts={posts} />
      </Route>
      <Route path={`${path}/contact`}>
        <Contact posts={posts} />
      </Route>
    </>
  );
};
export default SubRoutes;
