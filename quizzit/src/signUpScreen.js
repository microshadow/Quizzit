import React, { Component } from 'react';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
    }

    logIn() {
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="Login">
               <form>
                     <input type="text" placeholder="Username" name="uname"></input><br/>
                     <input type="password" placeholder="Password" name="pword"></input><br/>
                     <input type="password" placeholder="Confirm Password" name="confirmpword"></input><br/>
                     <select>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                     </select><br/>
                     <button onClick={this.logIn}>Sign Up</button>
                </form> 
            </div>
        );
    }
}

export default SignUpScreen;