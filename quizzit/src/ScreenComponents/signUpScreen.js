import React, { Component } from 'react';
import axios from 'axios';

import { registerAuthToken } from './globals.js';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.registerStudentUser = this.registerStudentUser.bind(this);
  }

  registerStudentUser() {
    const username = this.refs.username.value;
    const firstname = this.refs.firstname.value;
    const lastname = this.refs.lastname.value;
    const password = this.refs.password.value;
    const confirm  = this.refs.confirmpassword.value;

    if (password !== confirm) {
      alert("Password and confirm password do not match!");
    } else {
      const userBody = {
        username, firstname, lastname, password,
        usertype: "S"
      };

      axios.post('/register', userBody).then((response) => {
        const status = response.status;

        if (status === 201) {
          const token = response.body.token;
          const user  = response.body.user;

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
      <div className="Login">
        <form>
          <input type="text" placeholder="Username" ref="username"></input><br/>
          <input type="text" placeholder="First Name" ref="firstname"></input><br/>
          <input type="text" placeholder="Last Name" ref="lastname"></input><br/>
          <input type="password" placeholder="Password" ref="password"></input><br/>
          <input type="password" placeholder="Confirm Password" ref="confirmpassword"></input>
          <br/>
          <button onClick={this.registerStudentUser}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpScreen;
