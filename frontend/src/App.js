/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @App.js - main core class for user authentication and initiating the actual todo.app
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginHeader from "./components/LoginHeader";
import Login from "./components/Login";
import Todo from "./components/Todo";

class App extends Component {
  // state variables
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      username: "",
      password: "",
      usernameRegister: "",
      passwordRegister: "",
      dbUsername: "",
      userId: 0,
      googleId: 0,
      strategy: "",
    };
    // context binding
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  /** capture input changes*/
  handleChange(e) {
    e.preventDefault();

    let id = e.target.id;
    if (id === "username") {
      this.setState({ username: e.target.value });
    }
    if (id === "password") {
      this.setState({ password: e.target.value });
    }
    if (id === "usernameRegister") {
      this.setState({ usernameRegister: e.target.value });
    }
    if (id === "passwordRegister") {
      this.setState({ passwordRegister: e.target.value });
    }
  }

  /** register a new user */
  async handleRegister(e) {
    const { usernameRegister, passwordRegister } = this.state;
    if (usernameRegister === "" && passwordRegister === "") {
      alert("Please complete credentials!");
    } else {
      await fetch(`/register/${usernameRegister}/${passwordRegister}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            alert(JSON.stringify(data.message));
          }
          if (data.status === "FAIL") {
            alert(JSON.stringify(data.message));
            this.clearAll();
          }
        })
        .catch((error) => {
          console.log("Error:" + error);
        });
    }
  }

  /** allow an existing user to login */
  handleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === "" && password === "") {
      alert("Please complete credentials!");
    } else {
      const loginUrl = "/login";
      const fetchType = "POST";
      const bodyData = {
        username: username,
        password: password,
      };
      this.performFetch(loginUrl, fetchType, bodyData)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            window.location.href = "http://localhost:3000/home";
          }
          if (data.status === "FAIL") {
            alert(JSON.stringify(data.message));
            this.clearAll();
          }
        })
        .catch((error) => console.log("Error:", error));
    }
  }

  /** fetch data from DB via node fetch */
  performFetch(fetchUrl, fetchType, bodyData) {
    return fetch(fetchUrl, {
      method: fetchType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
  }

  /** google oAuth capture handler */
  responseGoogle(e) {
    var googleLoginWindow = window.open(
      //"http://localhost:5000/login/google",
      "http://mytodobyali.herokuapp.com/login/google",
      "Connect to Google", // "_self"
      "toolbar=0,status=0,width=548,height=400,top=300,left=600"
    );
    setInterval(function () {
      if (googleLoginWindow.closed) {
        //window.open("http://localhost:3000/home", "_self");
        window.open("http://mytodobyali.herokuapp.com/home", "_self");
        //window.opener.document.location.href = "http://localhost:3000/home";
      }
    }, 1000);
  }

  /** allow a user to logout */
  handleLogout(e) {
    fetch("/logout")
      .then((res) => res.json())
      .then((data) => {
        if (data.logout === "successful") {
          if (window.confirm("Are you sure you wish to logout?")) {
            if (this.state.strategy === "passport_local") {
              window.location.href = "http://localhost:3000";
            }
            if (this.state.strategy === "passport_google") {
              let urlLogoutRedirect =
                "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/";

              var logoutWindow = window.open(
                urlLogoutRedirect,
                "Disconnect from Google",
                "toolbar=0,status=0,width=548,height=400,top=300,left=600"
              );
              setTimeout(function () {
                if (logoutWindow) logoutWindow.close();
                window.location = "http://localhost:3000";
              }, 3000);
            }
            this.clearAll();
          }
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }

  /** verify a google strategy user */
  async getGoogleCredentials() {
    await fetch("/auth/login/google")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated === true && data.googleID !== null) {
          this.setState({
            isLogged: true,
            dbUsername: data.username,
            userId: data.userID,
            googleId: data.googleID,
            strategy: data.strategy,
          });
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }

  /** verify a local strategy user */
  async getLocalCredentials() {
    await fetch("/auth/login/local")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated === true && data.googleID === null) {
          this.setState({
            isLogged: true,
            dbUsername: data.username,
            userId: data.userID,
            strategy: data.strategy,
          });
        }
      })
      .catch((error) => console.log("Error:" + error));
  }

  componentWillMount() {}

  componentDidMount() {
    this.getLocalCredentials();
    this.getGoogleCredentials();
  }

  /** reset initial settings */
  clearAll(e) {
    this.setState({
      isLogged: false,
      username: "",
      password: "",
      usernameRegister: "",
      passwordRegister: "",
      dbUsername: "",
      userId: 0,
      googleId: 0,
      strategy: "",
    });
  }

  render() {
    const { isLogged, userId, dbUsername, username, password } = this.state;

    var GetHome = "";
    if (isLogged === true) {
      GetHome = (
        <>
          <Header dbUsername={dbUsername} handleLogout={this.handleLogout} />
          <Todo userId={userId} strategy={this.state.strategy} />
        </>
      );
    }

    return (
      <div className="App">
        <Router>
          <Route
            exact
            path={`/`}
            render={(props) => (
              <>
                <LoginHeader />
                <Login
                  username={username}
                  password={password}
                  usernameRegister={this.state.usernameRegister}
                  passwordRegister={this.state.passwordRegister}
                  handleChange={this.handleChange}
                  handleRegister={this.handleRegister}
                  handleLogin={this.handleLogin}
                  responseGoogle={this.responseGoogle}
                  clearAll={this.clearAll}
                />
              </>
            )}
          />
          <Route
            exact={true}
            path={`/home`}
            render={(props) => <>{GetHome} </>}
          />
        </Router>
      </div>
    );
  }
}

export default App;
