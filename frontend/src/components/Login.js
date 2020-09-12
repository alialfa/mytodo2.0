/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @Login.js - allows a user to attempt to access the app
 */
import React from "react";
import Register from "./Register";
import {
  Container,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Login = (props) => {
  const { username, password, clearAll } = props;
  const { handleChange, handleLogin, responseGoogle } = props;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Col xs={4} id="loginForm" className="center">
      <Container>
        <h3>Access Portal</h3>

        <div>
          <Button variant="info" onClick={responseGoogle}>
            <i class="fab fa-google fa-2x">oogle</i>
          </Button>
          <hr></hr>
        </div>
        <div>
          <div id="inputBoxes">
            <label htmlFor="username">Username</label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="at">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="key in username.."
                id="username"
                value={username}
                onChange={handleChange}
              />
            </InputGroup>

            <label htmlFor="password">Password</label>
            <InputGroup className="mb-3">
              <FormControl
                type="password"
                placeholder="key in password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <Button variant="primary" id="btnLogin" onClick={handleLogin}>
            Log In
          </Button>
        </div>
        <hr></hr>
        <Button
          variant="secondary"
          id="btnCreateAccount"
          onClick={(e) => {
            setModalShow(true);
          }}
        >
          Register
        </Button>
        <Register
          {...props}
          show={modalShow}
          onHide={(e) => {
            clearAll(e);
            setModalShow(false);
          }}
        />
      </Container>
    </Col>
  );
};

export default Login;
