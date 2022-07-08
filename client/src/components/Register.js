import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../constant/Constants";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
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
    axios
      .post(`${Constants.REACT_APP_SERVER_URL}/users/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        setIsSubmit(false);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsSubmit(false);
        setIsError(true);
        if (err?.response?.status === 409) {
          setErrorMessage("EMAIL_ALREADY_REGISTERED");
        } else {
          setErrorMessage("NETWORK_ERROR");
        }
      });
  };

  const handlerLogin = (e) => {
    navigate("/login");
  };

  return (
    <div className={`container h-100`}>
      <div className="row align-items-center">
        <div className="col-6 mx-auto">
          <div className="jumbotron">
            <Card style={{ margin: `100px` }}>
              <Card.Body>
                <h3 className="text-center">Register</h3>
                <div className="text-center" style={{ marginBottm: "10px" }}>
                  Already registered?{" "}
                  <span className="link-primary" onClick={handlerLogin}>
                    Login
                  </span>
                </div>
                <Form onSubmit={handlerSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      value={name}
                      type="text"
                      placeholder="Enter Fullname"
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
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
                  {isError && errorMessage === "EMAIL_ALREADY_REGISTERED" && (
                    <Alert variant={"danger"}>Email Already Registered</Alert>
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

export default Register;
