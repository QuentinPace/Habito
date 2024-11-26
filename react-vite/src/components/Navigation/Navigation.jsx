import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  return (
    <header>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="nav-buttons-container">
        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/browse")}>Browse</div>
        <div onClick={() => navigate("/createprogram")}>Create a Program</div>
        <div><ProfileButton /></div>
      </div>
    </header>
  );
}

export default Navigation;
