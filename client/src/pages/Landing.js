import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import API from "../api";

import "./Landing.css";
import logo from "../imgs/kuche-white.png";

class Landing extends Component {
  state = {
    username: "",
    password: "",
    registerOpen: false,
    registerUsername: "",
    registerDisplayName: "",
    registerPassword: "",
    goToApp: false
  };

  handleInputChange = event => {
    let {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    if (this.state.registerOpen) {
      this.setState({
        registerOpen: false
      });
    } else {
      this.setState({goToApp: true});
      this.props.enterApp(this.state.username, this.state.password);
    }
  };

  handleRegister = () => {
    if (this.state.registerOpen) {
      let rUsername = this.state.registerUsername;
      let rDisplayName = this.state.registerDisplayName;
      let rPassword = this.state.registerPassword;
      if (rUsername.length > 0 &&
          rDisplayName.length > 0 &&
          rPassword.length >= 8) {
            API.registerUser(this.state)
            .then(token => {
              if (token === "token") {
                this.setState({goToApp: true});
                this.props.enterApp(rUsername, rPassword);
              }
            })
          }
    } else {
      this.setState({
        registerOpen: true
      });
    }
  };

  render() {
    if (this.state.goToApp) {
      return (<Redirect to="/kitchen" />);
    }
    let logInBtn = <LoginButton text="Log In" onClick={this.handleLogin} />;
    let registerBtn = <LoginButton text="Register" onClick={this.handleRegister} />;
    return (
      <div className="Landing">
        <header className="Landing-Header">
          <img src={logo} className="Landing-Logo" alt="Kuche Logo" />
        </header>
        <div className="pageapp-login">
          {
            !this.state.registerOpen ? (
              // Log In Form
              <div>
                <LoginInput
                  name="username" placeholder="Username"
                  icon="envelope" type="text"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <LoginInput
                  name="password" placeholder="Password"
                  icon="lock" type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                {logInBtn}
                {registerBtn}
              </div>
            ) : (
              // Register Form
              <div>
                {logInBtn}
                <LoginInput
                  name="registerUsername" placeholder="Username"
                  icon="envelope" type="text"
                  value={this.state.registerUsername}
                  onChange={this.handleInputChange}
                />
                <LoginInput
                  name="registerDisplayName" placeholder="Display Name"
                  icon="user" type="text"
                  value={this.state.registerDisplayName}
                  onChange={this.handleInputChange}
                />
                <LoginInput
                  name="registerPassword" placeholder="Password"
                  icon="lock" type="password"
                  value={this.state.registerPassword}
                  onChange={this.handleInputChange}
                />
                {registerBtn}
              </div>
            )
          }
        </div>
      </div>
    );
  };
};

const LoginInput = ({name, icon, type, value, placeholder, onChange}) => (
  <div className="pageapp-login-input">
    <i className={"login-icon fa fa-" + icon} />
    <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
  </div>
);

const LoginButton = ({text, onClick}) => (
  <div className="pageapp-login-links">
    <a href="javascript:undefined" className="landing-login-button" onClick={onClick}>{text}</a>
    <div className="clear" />
  </div>
);

export default Landing;