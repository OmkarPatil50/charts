import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../..";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const getLoginDetails = async () => {
    dispatch({ type: "UPDATE_LOADER", payload: true });
    try {
      const response = await fetch(
        "https://moonshot.omkarpatil20.repl.co/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const jsonResponse = await response.json();
      sessionStorage.setItem("encodedToken", jsonResponse.encodedToken);

      if (jsonResponse.encodedToken) {
        dispatch({ type: "UPDATE_USER_LOGIN", payload: true });

        navigate(location?.pathname === '/login' ? '/': location?.pathname );
        dispatch({ type: "UPDATE_LOADER", payload: false });
        toast.success("Logged in Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Invalid Login Credentials!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      navigate("/error");
    }
  };

  const loginWithTestCred = () => {
    setEmail("omkarp5429@gmail.com");
    setPassword("Omkar@123");
  };

  setTimeout(
    () =>
      dispatch({
        type: "UPDATE_LOADER",
        payload: false,
      }),
    1000
  );

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-container-heading">Log In</h2>
        <label htmlFor="Email-address">Email Address :</label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
        />
        <label htmlFor="Password">Password :</label>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="**********"
          value={password}
        />
        <button onClick={getLoginDetails} className="btn-log-in">
          Log In
        </button>
        <button onClick={loginWithTestCred} className="btn-log-in">
          Fill Test Credentials
        </button>
        <Link to="/signup" className="create-account-btn">
          Create New Account <i className="fa-solid fa-angle-right"></i>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
