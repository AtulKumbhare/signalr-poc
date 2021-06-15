import { Link } from "react-router-dom";
import './Navigation.css'

const Navigation = ({ url }) => {
  const activeUrl = window.location.href.split("/")[
    window.location.href.split("/").length - 1
  ];
  return (
    <ul>
      <li>
        <Link style={{ color: activeUrl === "info" && "yellow"}} to={`${url}/info`}>
          UserInfo
        </Link>
      </li>
      <li>
        <Link style={{ color: activeUrl === "about" && "yellow"}} to={`${url}/about`}>About US</Link>
      </li>
      <li>
        <Link style={{ color: activeUrl === "contact" && "yellow"}} to={`${url}/contact`}>Contact Us</Link>
      </li>
    </ul>
  );
};
export default Navigation;
