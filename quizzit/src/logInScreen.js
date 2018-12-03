import React, { Component } from 'react';
import axios from 'axios';

import { registerAuthToken } from './globals.js';

const divStyle = {
  width: '500px',
  marginTop: '100px',
}

const headerStyle = {
  marginBottom: '20px'
}

const inputStyle = {
  width: '200px'
}

const buttonStyle = {
  width: '100px'
}


class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn(e) {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username && password) {
      axios.post("/login", { username, password }).then((response) => {
        const status = response.status;

        if (status === 200) {
          const token = response.data.token;
          const user  = response.data.user;

          registerAuthToken(token, user);
          this.props.history.push("/dashboard");
        }
      }).catch((error) => {
        alert("Incorrect username or password.");
      });
    } else {
      alert("Username or password not provided.");
    }
  }

  render() {
    return (
      <div className="mx-auto" style={divStyle} align="center">
        <form>
          <h2 style={headerStyle}>Enter your credentials:</h2>
          <input ref="username" type="text" style={inputStyle}
                 className="form-control" placeholder="Username"></input>
          <br/>
          <input ref="password" type="password" style={inputStyle}
                 className="form-control" placeholder="Password"></input>
          <br/>
          <button className="btn btn-primary" style={buttonStyle}
                  onClick={this.logIn}>
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default LogInScreen;
