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

const buttonStyle = {
    width: '100px'
}

const inputStyle = {
    width: '200px'
}

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { loginSuccessful: false };
    this.registerStudentAccount = this.registerStudentAccount.bind(this);
  }

  registerStudentAccount() {
    const username = this.refs.username.value;
    const firstname = this.refs.firstname.value;
    const lastname = this.refs.lastname.value;
    const password = this.refs.password.value;
    const confirm  = this.refs.confirmpassword.value;

    if (password !== confirm) {
      console.log("Mismatch");
      alert("Password and confirm password do not match!");
    } else {
      const userBody = {
        username, firstname, lastname, password,
        usertype: "S"
      };

      axios.post('/register', userBody).then((response) => {
        const status = response.status;

        if (status === 201) {
          const token = response.data.token;
          const user  = response.data.user;

          registerAuthToken(token, user);
          this.props.history.push("/dashboard");
        } else {
          alert(`Failed to log in with status ${status}`);
        }
      });
    }
  }

  render() {
    return (
      <div className="mx-auto" style={divStyle} align="center">
        <form>
          <h1 style={headerStyle}>Enter your details below:</h1>
          <input style={inputStyle} className="form-control" type="text"
                 placeholder="Username" ref="username"></input>
          <br/>
          <input style={inputStyle} className="form-control" type="text"
                 placeholder="First Name" ref="firstname"></input>
          <br/>
          <input style={inputStyle} className="form-control" type="text"
                 placeholder="Last Name" ref="lastname"></input>
          <br/>
          <input style={inputStyle} className="form-control" type="password"
                 placeholder="Password" ref="password"></input>
          <br/>
          <input style={inputStyle} className="form-control" type="password"
                 placeholder="Confirm Password" ref="confirmpassword"></input>
          <br/>
          <button className="btn btn-primary" style={buttonStyle}
                  onClick={this.registerStudentAccount}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpScreen;
