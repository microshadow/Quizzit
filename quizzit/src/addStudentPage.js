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


export default class AddStudentPage extends Component {
    constructor(props) {
        super(props);

        this.addStudent = this.addStudent.bind(this)
    }

    addStudent() {
        const student = this.refs.studentUsername.value;
        var studentID = "";
        const courseID = this.props.match.params.course_id;
        var course;

        axios.get(`/api/students/getByUsername/${student}`).then((response) => {

            studentID = response.data._id;
            axios.get(`/api/courses/getCourseByID/${courseID}`).then((response) => {
                const request = {
                    user: studentID,
                    course: courseID
                }
    
                console.log("CALLING enroll endpoint")
                console.log(request)
                axios.post(`/api/enroll`, request).then((response) => {
                    const status = response.status;
                    console.log("within enrollument successblock");
                    if (status === 200) {
                        console.log("Course successfully added");
                        
                        alert("Student successfully added");
                    } else {
                        alert("Student Could not be Added");
                    }
                })
            })
    
        }).catch(function (error) {
            // handle error
            alert("student not found.");
            console.log(error);
          })

    }

    render() {
        console.log("Entered RENDER STATEMENT FOR ADD STUDENT PAGE")
        return (
            <div className="mx-auto" style={divStyle} align="center">
                <form>
                <h1 style={headerStyle}>Enter information below:</h1>
                <input style={inputStyle} className="form-control" type="text"
                        placeholder="Student Username" ref="studentUsername"></input>
                <br/>
                <button className="btn btn-primary" style={buttonStyle}
                        onClick={this.addStudent}>Add </button>
                </form>
            </div>
        )
    }
}