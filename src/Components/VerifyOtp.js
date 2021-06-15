import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  let history = useHistory();
  const [otp, setOtp] = useState("");

  const handelOtpVerification = () => {
    const loginResponse = history.location.state.loginResponse;
    axios
      .post(
        "https://testapi.biofuelcircle.com:8050/BioFuelOAuthServer/Users/verify-login",
        {
          user_Name: loginResponse && loginResponse.user_Name,
          login_Through_Enum: 2,
          otp: otp,
          log_Id: loginResponse && loginResponse.log_Id,
          login_User_Id: loginResponse && loginResponse.login_User_Id,
          person_Id: loginResponse && loginResponse.person_Id,
          access_Method_Type_Enum: 2,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Logged In Successfully.");
          history.push({
            // pathname: "/userDetails",
            pathname: "/user/info",
            state: {
              verifyLoginResponse: res.data.data,
            },
          });
        }
        console.log("Verify Login", res);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      });
  };
  return (
    <div className="login-card">
      <Typography
        variant="p"
        style={{ color: "#000", fontWeight: 600, fontSize: 30 }}
      >
        Verify OTP
      </Typography>
      <OtpInput
        className="otp-field"
        value={otp}
        onChange={(otp) => setOtp(otp)}
        numInputs={6}
      />
      <Button variant="contained" color="primary" onClick={() => handelOtpVerification()}>
        Verify Otp
      </Button>
    </div>
  );
};
export default VerifyOtp;
