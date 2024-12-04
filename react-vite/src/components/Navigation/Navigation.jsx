import { useNavigate, useLocation, Navigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaCheckCircle } from "react-icons/fa"
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(state => state.session.user)

  if(location.pathname == "/login" || location.pathname == "/signup"){
    return
  }

  if (!user) {
    return <Navigate to='/login'></Navigate>
}

  return (
    <header className="header-nav">
      <div>
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
