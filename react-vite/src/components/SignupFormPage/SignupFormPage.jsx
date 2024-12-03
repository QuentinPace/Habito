export default SignupFormPage;import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { FaCheckCircle } from "react-icons/fa"
import './SignupForm.css'


function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});


  if (sessionUser) return <Navigate to="/" replace={true} />;


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }


    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );


    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };


  return (
    <div className="signup-page-container">
        <div className='signup-page-left'>
        </div>
          <div className="signup-section-container">
            <div className='signup-section'>
              <h1 className='signup-title'>Sign up to <span className="login-logo">HABIT<FaCheckCircle className="logo-check-login"/></span></h1>
              {errors.server && <p className='error'>{errors.server}</p>}
              <form className='signup-form' onSubmit={handleSubmit}>
                <label className="login-label">
                  Email
                  <input
                    className="login-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                {errors.email && <p className='error'>{errors.email}</p>}
                <label className="login-label">
                  Username
                  <input
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                {errors.username && <p className='error'>{errors.username}</p>}
                <label className="login-label">
                  Password
                  <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && <p className='error'>{errors.password}</p>}
                <label className="login-label">
                  Confirm Password
                  <input
                    className="login-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                <button className="sign-up-button" type="submit">Sign Up</button>
                <button className= 'login-button'
                onClick={()=> navigate('/login')}>Log In</button>
              </form>
          </div>
      </div>
      <div className='signup-page-right'>
      </div>
    </div>
  );
}