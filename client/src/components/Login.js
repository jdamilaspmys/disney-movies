import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../constant/Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${Constants.REACT_APP_SERVER_URL}/users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handlerSubmit}>
        <label>
          <p>Email</p>
          <input
            value={email}
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
