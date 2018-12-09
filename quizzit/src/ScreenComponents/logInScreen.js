import React, { Component } from 'react';

class LogInScreen extends Component {
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
                     <button onClick={this.logIn}>Log In</button>
                </form> 
            </div>
        );
    }
}

export default LogInScreen;