import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return <button onClick={logoutHandler}> Logout</button>;
};

export default Logout;
