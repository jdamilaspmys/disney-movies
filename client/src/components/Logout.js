import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";
const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    navigate("/login");
  };
  return (
    <Button
      className={styles.logout}
      variant="secondary"
      onClick={logoutHandler}
    >
      {" "}
      Logout
    </Button>
  );
};

export default Logout;
