/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @ Header.js - contains page header and navabar, shown on login
 */
import React, { Component } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import propic from "../images/pic.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AVATAR: propic,
      //"https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    //e.preventDefault();
  }

  render(props) {
    const { dbUsername, handleLogout } = this.props;
    return (
      <div class="navHeader">
        <Navbar>
          <Navbar.Brand href="#home">
            <h6>myTODO</h6>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link to="UserProfile">
                <img
                  id="avatar"
                  src={this.state.AVATAR}
                  alt="avatar"
                  className="img-fluid rounded-circle"
                  style={{ display: this.state.avatarLink }}
                  onClick={(e) => this.handleClick(e)}
                />
              </Nav.Link>
            </Nav>
            <Navbar.Text id="navWelcomeMsg">
              <h6>Hey, {dbUsername.replace(/ .*/, "")}</h6>
            </Navbar.Text>
            <Form inline>
              <Button
                variant="outline-success"
                onClick={handleLogout}
                id="navBtnLogout"
              >
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
