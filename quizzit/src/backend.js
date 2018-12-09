import axios from 'axios';

class Backend {
    constructor(url) {
        this.url = url;
      }

    // Create Quiz API -- Jonathan
    // POST: 
    static create_quiz(title, course_code, description){
        axios.post(this.url, {
            title,
            course_code,
            description,
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

    static create_question(quiz_id, question_title, choices_array, correct_choice){
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
    static start_quiz(quiz_id){
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
        
    static end_quiz(quiz_id){
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
    static answer_question(quiz_id, question_id, answer_choice){
        // => returns if correct 
    }

    // GET
    static next_question(quiz_id, question_id) {
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

    // Course API -- Jonathan
    // POST: 
    static create_course(title, teacher_id){
        // returns course object
    }  
    
    static add_student(course_id, username){
        // => course object 
    }
        
    static remove_student(course_id, username){
        // => course object 
    }

    // DELETE: 
    static remove_course(course_id) {
        // => success code
    }

    // Auth API using Express and Passport.js -- Alex
    static login(username, password){
        // => returns JWT token, and user_type 
    }
    
    static register(username, password, user_type){
        // => returns JWT token, and user_type 
    }

    static logout(JTW){
        // => returns success code
    }

    // Dashboard/Data API 
    // when you click open dashboard button or when you login or click refresh button -- Alex
    // GET: 
    static get_notification(user_id){
        // returns notifications 
    } 

    static get_quiz_results(quiz_id, user_id){
        // => returns all completed questions 
    } 
    
    static get_quiz_class_results(quiz_id){
        // => returns all completed questions 
    }

    static get_quiz(quiz_id){
        // => returns quiz object
    } 
  
}
export default Backend;