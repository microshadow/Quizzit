import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAuthorizedUser } from './globals.js';

const divStyle = {
    width: '400px',
    marginTop: '200px',
}

const button1Style = {
    marginRight: '20px',
    width: '100px'
}

const button2Style = {
    width: '100px'
}

const headerStyle = {
    marginBottom: '20px',
}

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.goToLogIn = this.goToLogIn.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
    }

    goToLogIn() {
        this.props.history.push("/logIn");
    }

    goToSignUp() {
        this.props.history.push("/signUp");
    }

    render() {
        const user = getAuthorizedUser();
        if(user){
            console.log(this.props);
            return (
                <Redirect
                    to={{
                    pathname: "/dashboard",
                    state: { from: this.props.location }
                    }}
                />
            );
        }
        return (
            <div className="mx-auto" align="center" style={divStyle}>
                <h1 style={headerStyle} >Welcome to Quizzit</h1>
                <button className="btn btn-primary" style={button1Style} onClick={this.goToLogIn}>Log In</button>
                <button className="btn btn-primary" style={button2Style} onClick={this.goToSignUp}>Sign Up</button>
            </div>
        );
    }
}

export default WelcomeScreen;
