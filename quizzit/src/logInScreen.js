import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
        console.log(this.refs.username.value);
        const user = this.refs.username.value;
        var pushLink = "";
        if (user === "Admin") {
            pushLink = "/dashboardAdmin";
        } else if (user === "Educator") {
            pushLink = "/dashboardEducator";
        } else {
            pushLink = "dashboardStudent";
        }
        this.props.history.push(pushLink);
    }

    render() {
        return (
            <div className="mx-auto" style={divStyle} align="center">
               <form>
                     <h1 style={headerStyle}>Enter your details below:</h1>
                     <input ref="username" type="text" style={inputStyle} className="form-control" placeholder="Username" name="uname"></input><br/>
                     <input type="password" style={inputStyle} className="form-control" placeholder="Password" name="pword"></input><br/>
                     <button className="btn btn-primary" style={buttonStyle} onClick={this.logIn}>Log In</button>
                </form> 
            </div>
        );
    }
}

export default LogInScreen;
