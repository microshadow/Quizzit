import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Backend from './backend.js';
import { withRouter } from "react-router";

import './createquizpage.css';
var globals = require('./globals');

class CreateQuizPageInner extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.backend = new Backend();

        const courses = this.props.courses;
        this.state = {
          quiz: {
            course: null,
            series: 0,
            title: null,
            weight: 0,
            description: null,
            active: false,
            participants: [],
            questions: [],
            classAverage: 0
          },
          currentKey: "quiz"
        }

        axios.get(`/api/quizzes/${this.props.match.params.course_id}`)
             .then((response) => {
          if (response.status < 400) {
            const newState = {
              quiz: response.data
            };
            this.setState(newState);
          }
          if (this.state.quiz.active === true) {
            this.state.currentKey = "question";
        }
    }

    addQuiz(title){
        let new_quizzes_array = this.state.quizzes;
        new_quizzes_array.push({title: title, questions: []});
        this.setState({quizzes: new_quizzes_array});
        //do server request here after "optimistic" UI update
        //we just use a global variable for this phase
        const course_id = this.props.match.params.course_id;
        this.backend.create_quiz(title, course_id, "");
        globals.quiz_data.data = new_quizzes_array;
    }

    render(){
        console.log("rerender createquizpage");
        const course_id = this.props.match.params.course_id;
        console.log(this.props.courses);
        console.log(course_id);
        const activeCourse = this.props.courses.find((course) => course._id == course_id);
        console.log(activeCourse)
        if(activeCourse == undefined){
            return (
                <div>
                    Course not found.
                </div>
            )
        }
        return( 
            <div className="createquiz_container">
                <h2>Course: {activeCourse.courseCode}</h2>
                <Tabs defaultActiveKey="question" id="uncontrolled-tab-example">
                    <Tab eventKey="quiz" title="New Quiz" >
                        <div id="newquiz_container">
                            <CreatequizForm createQuiz={this.addQuiz.bind(this)}/>
                        </div>
                    </Tab>
                    <Tab eventKey="question" title="Modify Questions" >
                        <div id="showquizzes_container">
                            <CreatequestionForm quizzes={this.state.quizzes}/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

class CreatequizForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: ""}
    }

    setTitle(newtitle){
        this.setState({title: newtitle});
    }

    render(){
        return (
            <div>
                <Form.Group as={Row} controlId="formHorizontalTitle">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={this.state.title} onChange={(event)=>this.setTitle(event.target.value)} type="text" placeholder="Title" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => 
                    {
                        this.props.createQuiz(this.state.title)
                        this.setTitle("");
                    }}>
                    Create quiz
                </Button>
            </div>
        )
    }
}

class CreatequestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: -1, 
            selectedQuiz: 0, 
            selectedCheckbox: -1,
            questionTitle: "",
            choiceValues: ["","","",""],
            quizzes: props.quizzes,
        }

        this.publishQuiz = this.publishQuiz.bind(this);
    }

    changeActiveQuestion(index){
        if(index == -1){ 
            //changing to "add question" mode, reset the "selected question" index
            // and the selected checkbox
            this.setState({
                selectedIndex: index, 
                selectedCheckbox: index,
                choiceValues: ["","","",""], 
                questionTitle: ""
            });
        }
        else{
            const activeQuiz = this.props.quizzes[this.state.selectedQuiz];
            if(activeQuiz == null) return;
            const activeIndex = activeQuiz.questions[index].correct_index;
            this.setState({selectedIndex: index, 
                selectedCheckbox: activeIndex, 
                questionTitle: activeQuiz.questions[index].question,
                choiceValues: activeQuiz.questions[index].choices});
        }
    }

    deleteQuestion(index){
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        let new_quizzes_array = this.props.quizzes;
        new_quizzes_array[selectedQuiz].questions.splice(index, 1);
        //make sure that you clear the modify field in case the deleted question is displayed there
        this.setState({selectedIndex: -1, quizzes: new_quizzes_array});
        //do server request here after "optimistic" UI update
        //we just use a global variable for this phase
        globals.quiz_data.data = new_quizzes_array;
    }

    addQuestion(event){
        event.preventDefault();

        const answerIndices = globals.nRange(this.state.choiceValues.length);
        const answerLabels  = answerIndices.map(
          (index) => `(${String.fromCharCode(index + 97)})`);

        const answers = answerIndices.map((index) => {
          return {
            display: answerLabels[index],
            text: this.state.choiceValues[index]
          };
        });

        const correctIndex = this.state.selectedCheckbox;
        const selectedQuiz = this.props.quizGen();
        const newQuestion = {
            question: {
                display: `Q${selectedQuiz.questions.length + 1}`,
                text: this.state.questionTitle,
                correct: [correctIndex],
                weight: 1
            },
            answers: answers
        };

        axios.post(`/api/quiz/${selectedQuiz._id}`, newQuestion)
             .then((response) => {
           this.setState({
               quiz: response.data,
               selectedCheckbox: 0,
               choiceValues: ["","","",""],
               questionTitle: ""
           });
           alert("Question Added to quiz Successfully")
        });
        //do server request here after "optimistic" UI update
        //we just use a global variable for this phase
        globals.quiz_data.data = new_quizzes_array;
    }

    publishQuiz(event) {
      event.preventDefault();
      const selectedQuiz = this.props.quizGen();

      axios.post(`/api/quiz/${selectedQuiz._id}/publish`)
           .then((response) => {
         this.setState({
             quiz: response.data,
             selectedCheckbox: 0,
             choiceValues: ["","","",""],
             questionTitle: ""
         });
         alert(`Quiz ${this.state.quiz.series}: ${this.state.quiz.title}
               has been Published.`)
      });
    }

    modifyQuestion(event, index) {
        event.preventDefault();
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        let new_quizzes_array = this.props.quizzes;
        const new_question = {
            question: this.state.questionTitle,
            choices: this.state.choiceValues,
            correct_index: this.state.selectedCheckbox,
            }
        new_quizzes_array[selectedQuiz].questions[activeQuestionIndex] = new_question;
        this.setState({quizzes: new_quizzes_array});
        //do server request here after "optimistic" UI update
        //we just use a global variable for this phase
        globals.quiz_data.data = new_quizzes_array;
    }

    changeActiveQuiz(event){
        this.setState({selectedQuiz: event.target.value})
    }

    handleSelect(event){
        //need to set selectedCheckbox index to an integer value
        this.setState({selectedCheckbox: event.target.value*1})
    }

    handleChangeTitle(event){
        this.setState({questionTitle: event.target.value})
    }

    handleChangeChoice(event, index){
        let choiceValues = this.state.choiceValues;
        choiceValues[index] = event.target.value;
        this.setState({choiceValues: choiceValues})
    }

    render(){
        if(this.props.quizzes.length == 0){
            return (<div></div>);
        }
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        const hasActiveQuestion = (activeQuestionIndex !== -1);

        this.state.quiz = this.props.quizGen();

        return(
        <Form>
            <Form.Group as={Row} controlId="formGridState">
                <Form.Label column sm={2}>
                    Quiz
                </Form.Label>
                <Form.Control as="select" sm={5} bsPrefix="select_quiz" value={selectedQuiz} onChange={(event, index) => {this.changeActiveQuiz(event);}}>
                    {this.props.quizzes.map((quiz, index) => {
                        return (
                            <option value={index} key={index}>{quiz.title}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalQuestions">
                <Form.Label column sm={2}>
                    <b>{(!hasActiveQuestion) ? "Add" : "Modify"} question</b>
                </Form.Label>
                {(hasActiveQuestion) ? 
                    <Form.Label column sm={6}>
                       <Form.Control onChange={(event)=>{this.handleChangeTitle(event)}} 
                            value={this.state.questionTitle} 
                            placeholder={this.props.quizzes[selectedQuiz].questions[activeQuestionIndex].question}/>
                    </Form.Label>
                :   <Form.Label column sm={4}>
                        <Form.Control onChange={(event)=>{this.handleChangeTitle(event)}} 
                            value={this.state.questionTitle} 
                            placeholder="type question"/>
                    </Form.Label>
                }
                {(hasActiveQuestion) ? 
                    <Form.Label column sm={2}>
                        <a id="changeMode_link" onClick={()=>{this.changeActiveQuestion(-1)}}>Add new question instead</a>
                    </Form.Label>
                : ""
                }

            </Form.Group>
            <Form.Row>
            {
                ["A","B","C","D"].map((letter, index) => {

                    const choices = hasActiveQuestion ? activeQuiz.questions[activeQuestionIndex].choices : [];
                    return (
                        <Form.Group key={index} as={Col} controlId="formGridZip">
                            <Form.Label>{"choice "+letter}</Form.Label>
                            <Form.Control onChange={(event)=>{this.handleChangeChoice(event, index)}}
                                value={this.state.choiceValues[index]}
                                placeholder={hasActiveQuestion ? choices[index] : "type choice"} />
                        </Form.Group>
                    )
                })
            }
            </Form.Row>
        <fieldset>
            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                    Correct answer
                </Form.Label>
                <Col sm={10}>
                    {
                        ["A","B","C","D"].map((letter, index) => {
                            return (
                                <Form.Check
                                    key={index}
                                    value={index}
                                    type="radio"
                                    label={"choice "+letter}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    checked={index === this.state.selectedCheckbox}
                                    onChange={(event) => {this.handleSelect(event);}}
                                />
                                )
                        })
                    }
                </Col>
            </Form.Group>
        </fieldset>
            <Button variant="primary" 
                type="submit" 
                onClick={hasActiveQuestion ? (event)=>this.modifyQuestion(event) : (event)=>this.addQuestion(event)}>
                {hasActiveQuestion ? "Modify" : "Add"} Question
            </Button>
            <Button className="ml-3" variant="primary" onClick={this.publishQuiz}>
              Publish Quiz
            </Button>
        </Form>
    )}
}

class QuestionsList extends React.Component{
    render(){
        if(this.props.questions.length == 0){
            return (
                <ListGroup>
                    <ListGroup.Item key={0}>No questions added</ListGroup.Item>
                </ListGroup>);
        }
        return (
            <ListGroup>
                {this.props.questions.map((question, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <span className="question_list_text">{question.question}</span>
                            <span className="question_list_button">
                                <Button variant="outline-secondary" onClick={() => {this.props.changeActiveQuestion(index)}}>Modify</Button>
                            </span>
                            <span className="question_list_button">
                                <Button variant="outline-secondary" onClick={() => {this.props.deleteQuestion(index)}}>Delete</Button>
                            </span>
                        </ListGroup.Item>
                        )
                })}
            </ListGroup>
        );
    }
}

const CreateQuizPage = withRouter(CreateQuizPageInner);
export default CreateQuizPage;

