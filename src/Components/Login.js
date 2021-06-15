import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");

  const handelLogin = () => {
    axios
      .post(
        "https://testapi.biofuelcircle.com:8050/BioFuelOAuthServer/Users/login",
        {
          user_Name: email,
          login_Through_Enum: 2,
          is_Resend: false,
          access_Method_Type_Enum: 2,
          log_Id: null,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Otp has been sent on your registered email id.");
          localStorage.setItem('userData',JSON.stringify(res.data.data))
          history.push({
            pathname: "/verifyOtp",
            state: {
              loginResponse: res.data.data,
            },
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      });
  };
  return (
    <>
      <div className="login-card">
        <Typography
          variant="p"
          style={{ color: "#000", fontWeight: 600, fontSize: 30 }}
        >
          Get Started With Login!
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEmail("")}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelLogin()}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
export default Login;
