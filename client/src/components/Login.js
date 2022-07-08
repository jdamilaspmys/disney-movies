import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../constant/Constants";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setIsError("");
    setErrorMessage("");
    axios
      .post(`${Constants.REACT_APP_SERVER_URL}/users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        setIsSubmit(false);
      })
      .catch((err) => {
        setIsSubmit(false);
        setIsError(true);
        console.log(err);
        if (err?.response?.status === 400) {
          setErrorMessage("INVALID_CREDENTIAL");
        } else {
          setErrorMessage("NETWORK_ERROR");
        }
        console.log(isError, errorMessage);
      });
  };

  const handlerRegister = (e) => {
    navigate("/register");
  };

  return (
    <div className={`container h-100`}>
      <div className="row align-items-center">
        <div className="col-6 mx-auto">
          <div className="jumbotron">
            <Card style={{ margin: `100px` }}>
              <Card.Body>
                <h3 className="text-center">Login</h3>
                <div className="text-center" style={{ marginBottm: "10px" }}>
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={handlerRegister}>
                    Register
                  </span>
                </div>
                <Form onSubmit={handlerSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      value={email}
                      type="email"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      value={password}
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={isSubmit}>
                      Submit
                    </Button>
                  </div>
                </Form>
                <div style={{ marginTop: "15px" }} className="text-center">
                  {isError && errorMessage === "INVALID_CREDENTIAL" && (
                    <Alert variant={"danger"}>Invalid Credential</Alert>
                  )}
                  {isError && errorMessage === "NETWORK_ERROR" && (
                    <Alert variant={"warning"}>Network Error :(</Alert>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
