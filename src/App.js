import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Forms from "./Components/Forms";
import Login from "./Components/Login";
import ShowPdf from "./Components/ShowPdf";
import UserDetails from "./Components/UserDetails";
import VerifyOtp from "./Components/VerifyOtp";
// import User from "./Components/User/User";
import User from "./Components/ConnectSignalR/ConnectSignalR";
// import SubRoutes from "./Components/SubRoutes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/verifyOtp" component={VerifyOtp} />
            <Route path="/userDetails" component={UserDetails} />
            <Route path="/showPdf" component={ShowPdf} />
            <Route path="/forms" component={Forms} />
            {/* <Route path="/user" component={SubRoutes} /> */}
            <Route path="/user" component={User} />
          </Switch>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </header>
    </div>
  );
}

export default App;
