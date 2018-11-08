import React, { Component } from 'react';

const divStyle = {
    width: '500px',
    marginTop: '100px',
}

const headerStyle = {
    marginBottom: '20px'
}

const buttonDivStyle = {
    width: '220px'
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
        this.logIn = this.logIn.bind(this);
    }

    logIn() {
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="mx-auto" style={divStyle} align="center">
               <form>
                     <h1 style={headerStyle}>Enter your details below:</h1>
                     <input style={inputStyle} className="form-control" type="text" placeholder="Username" name="uname"></input><br/>
                     <input style={inputStyle} className="form-control" type="password" placeholder="Password" name="pword"></input><br/>
                     <input style={inputStyle} className="form-control" type="password" placeholder="Confirm Password" name="confirmpword"></input><br/>
                     <select className="form-control" style={inputStyle}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                     </select><br/>
                     <button className="btn btn-primary" style={buttonStyle} onClick={this.logIn}>Sign Up</button>
                </form> 
            </div>
        );
    }
}

export default SignUpScreen;