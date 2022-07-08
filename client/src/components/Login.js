import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../constant/Constants";
import { Card, Form, Button } from "react-bootstrap";

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

  const hadnlerRegister = (e) => {
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
                  <span className="link-primary" onClick={hadnlerRegister}>
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
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
