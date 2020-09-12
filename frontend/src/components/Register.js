/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @Register.js - allows a user to register to the app
 */
import React from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Container,
  Col,
} from "react-bootstrap";

const Register = (props) => {
  const { usernameRegister, passwordRegister, handleChange } = props;

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="registerModal"
      >
        <Col xs={12} id="registerForm" className="center">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              TODO | REGISTER
            </Modal.Title>
          </Modal.Header>
          <label htmlFor="username">Username</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="at">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="usernameRegister"
              value={usernameRegister}
              onChange={handleChange}
            />
          </InputGroup>

          <label htmlFor="password">Password</label>
          <InputGroup className="mb-3">
            <FormControl
              type="password"
              id="passwordRegister"
              value={passwordRegister}
              onChange={handleChange}
            />
          </InputGroup>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              id="btnFinish"
              onClick={(e) => {
                props.handleRegister(e);
                props.onHide(e);
              }}
            >
              FINISH SIGNUP!
            </Button>

            <Button
              variant="secondary"
              className="uncheck"
              onClick={(e) => {
                props.onHide(e);
              }}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Col>
      </Modal>
    </Container>
  );
};

export default Register;
