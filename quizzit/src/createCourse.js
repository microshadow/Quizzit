import React, { Component } from 'react';
import Backend from './backend.js';

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


export default class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.createCourse = this.createCourse.bind(this);
        this.backend = new Backend();
    }

    createCourse() {
        const course = this.refs.courseCode.value;
        // accesses the backend through our Data Access Object
        this.backend.create_course(course);
        setTimeout(function(){
            window.location.reload();
        },100);
    }

    render() {
        return (
            <div className="mx-auto" style={divStyle} align="center">
                <form>
                <h1 style={headerStyle}>Enter course details below:</h1>
                <input style={inputStyle} className="form-control" type="text"
                        placeholder="Course Code" ref="courseCode"></input>
                <br/>
                <button className="btn btn-primary" style={buttonStyle}
                        onClick={this.createCourse}>Create</button>
                </form>
            </div>
        )
    }
}
