import React, { Component } from 'react';
import axios from 'axios';
import { getAuthorizedUser } from './globals.js';

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
    }

    createCourse() {
        const course = this.refs.courseCode.value;
        const user = getAuthorizedUser();
        const instructor = user._id;
        if (!course) {
            alert("Please enter a Valid Course Code")
        } else {
            const courseDetails = {course,instructor};
            axios.post('/api/courses/', courseDetails).then((response) => {
                const status = response.status;

                if (status === 201) {
                    console.log("Course successfully added");
                    alert("Course successfully added");
                } else {
                    alert("Course Could not be created");
                }

            })
        }
    }

    render() {
        return (
            <div className="mx-auto" style={divStyle} align="center">
                <form>
                <h1 style={headerStyle}>Enter Course Details Below:</h1>
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
