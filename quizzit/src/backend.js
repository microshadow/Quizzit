import axios from 'axios';
import { getAuthorizedUser, trashAuthToken } from './globals.js';

export default class Backend {
    constructor(url = "") {
        this.url = url;
      }

    // Create Quiz API -- Jonathan
    // POST: 
    create_quiz = (title, course_id, description = "") => {
        const config = {
            title: title,
            weight: 1,
            description: description
          };
    
        axios.post(`/api/quizzes/${course_id}`, config)
            .then((response) => {
        const newState = {
            quiz: response.data,
            currentKey: "question"
        };
        alert("Quiz was successfully created!!")
        return newState;
        });
    } 

    create_question = (quiz_id, question_title, choices_array, correct_choice) => {
        axios.post(this.url, {
            quiz_id, 
            question_title, 
            choices_array, 
            correct_choice
          })
        .then(function (response) {
            // handle success
            // returns quiz object 
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    // use express-ws to notify students in realtime 
    start_quiz = (quiz_id) => {
        axios.post(this.url, {
            quiz_id, 
          })
        .then(function (response) {
            // handle success
            // quiz object
            // students can see the quiz after that 
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
        
    end_quiz = (quiz_id) => {
        axios.post(this.url, {
            quiz_id, 
          })
        .then(function (response) {
            // handle success
            // quiz object 
            // quiz will become unavailable for students
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });     
    } 
    
    // Do Quiz API -- Jonathan
    // POST: 
    answer_question = (quiz_id, question_id, answer_choice) => {
        // => returns if correct 
    }

    // GET
    next_question = (quiz_id, question_id) => {
        // => returns next question object
        axios.get(this.url+`?quiz_id=${quiz_id}&question_id=${question_id}`)
        .then(function (response) {
            // handle success
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    // Course API
    // POST: 
    create_course = (title) => {
        // returns course object
        const course = title;
        const user = getAuthorizedUser();
        const instructor = user._id;
        if (!course) {
            alert("Please enter a Valid Course Code")
        } else {
            const courseDetails = {course,instructor};
            axios.post(this.url + '/api/courses/', courseDetails).then((response) => {
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

    get_course_data = () => {
        axios.get(this.url)
        .then(function (response) {
            // handle success
            // returns quiz object 
            console.log(response);
            return { response };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return [];
        });
    }

    set_course_data = (data) => {
        axios.post(this.url, data)
        .then(function (response) {
            // handle success
            // returns quiz object 
            console.log(response);
            return { response };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return [];
        });
    }

    
    add_student = (course_id, username) => {
        // => course object 
    }
        
    remove_student = (course_id, username) => {
        // => course object 
    }

    // DELETE: 
    remove_course = (course_id) => {
        // => success code
    }

    // Auth API using Express and Passport.js -- Alex
    login = (username, password) => {
        // => returns JWT token, and user_type 
    }
    
    register = (username, password, user_type) => {
        // => returns JWT token, and user_type 
    }

    logout = () => {
        trashAuthToken();
    }

    // Dashboard/Data API 
    // when you click open dashboard button or when you login or click refresh button -- Alex
    // GET: 
    get_notification = (user_id) => {
        // returns notifications 
    } 

    get_quiz_results = (quiz_id, user_id) => {
        // => returns all completed questions 
    } 
    
    get_quiz_class_results = (quiz_id) => {
        // => returns all completed questions 
    }

    get_quiz = (quiz_id) => {
        // => returns quiz object
    } 
  
}
