import { useNavigate, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaCheckCircle } from "react-icons/fa"
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="header-nav">
      <div>
        {/* <NavLink to="/">Home</NavLink> */}
        <div className="logo-nav" onClick={() => navigate("/")}><span>HABIT<FaCheckCircle className="logo-check-nav"/></span></div>
      </div>

      <div className="nav-buttons-container">
        <div className={location.pathname == '/' ? "current-nav-item" : ''} onClick={() => navigate("/")}><h6>Home</h6></div>
        <div className={location.pathname == '/browse' ? "current-nav-item" : ''} onClick={() => navigate("/browse")}><h6>Browse</h6></div>
        <div className={location.pathname == '/createprogram' ? "current-nav-item" : ''} onClick={() => navigate("/createprogram")}><h6>Create</h6></div>
        <div><ProfileButton /></div>
      </div>
    </header>
  );
}

export default Navigation;
