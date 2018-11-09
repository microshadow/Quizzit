import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

import './answerpage.css'
var globals = require('./globals');

export class AnswerPage extends React.Component {
    constructor(props){
        super(props);
        /*here we would get the data from the database*/
        /*or we pass it as props from a higher order component that gets the data for us*/
        this.state = {
            quizzes: globals.quiz_data,
            selectedIndex: -1, 
            selectedQuiz: 0, 
            selectedCheckbox: -1,
            score: 0,
            progress: 0,
            answers: [],
        }
    }
    
    startQuiz(){
        this.setState({selectedIndex: 0, progress: 0, score: 0, answers: []});
    }

    changeActiveQuiz(event){
        let quizId = event.target.value;
        this.setState({selectedQuiz: quizId})
    }

    handleSelect(event){
        //need to set selectedCheckbox index to an integer value
        this.setState({selectedCheckbox: event.target.value*1})
    }

    checkAnswer(event){
        const answer = this.state.selectedCheckbox;
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        const activeQuiz = this.state.quizzes[selectedQuiz];
        const activeQuestion = activeQuiz.questions[activeQuestionIndex];
        /*check if answer is correct*/
        const expectedAnswer = activeQuestion.correct_index;
        let new_score = this.state.score;
        const isCorrect = expectedAnswer === answer;
        /*Check that one choice is selected*/
        if(answer === -1){
            alert("Please choose an answer!");
            return false;
        }
        if(isCorrect){
            new_score = new_score+1;
        }
        else{
            let correct_answer = activeQuestion.choices[expectedAnswer];
            alert("The correct answer was '"+correct_answer+"'.");
        }
        const new_progress = this.state.progress+1;
        const isFinished = this.state.selectedIndex+1 == activeQuiz.questions.length;
        const new_index = isFinished ? -2 : this.state.selectedIndex+1;
        this.setState({
            score: new_score, 
            progress: new_progress,
            selectedIndex: new_index,
            selectedCheckbox: -1,
        })
        /*do server request here to save results in the database*/
        /*either after each reply or after isFinished is true*/
        this.state.answers.push(isCorrect);
        if(isFinished){
            const result = {
                userId: "0", /*adjust this from auth*/
                total_score: this.state.score, /*verify this number on the server*/
                answers: this.state.answers,
            }
            let results_array = globals.score_data;
            results_array.push(result);
            globals.score_data.data = results_array;
            console.log(globals.score_data);
        }
    }

    render(){
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        const activeQuiz = this.state.quizzes[selectedQuiz];
        const activeQuestion = activeQuiz.questions[activeQuestionIndex];
        return( 
            <div className="createquiz_container">
                <Tabs defaultActiveKey="quiz" id="uncontrolled-tab-example">
                    <Tab eventKey="quiz" title="Do Quiz" >
                        <div id="newquiz_container">
                            <Form.Group as={Row} controlId="formGridState">
                                <Form.Label column sm={2}>
                                    Quiz
                                </Form.Label>
                                <Form.Control as="select" sm={5} bsPrefix="select_quiz" value={selectedQuiz} onChange={(event, index) => {this.changeActiveQuiz(event);}}>
                                    {this.state.quizzes.map((quiz, index) => {
                                        return (
                                            <option value={index} key={index}>{quiz.title}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                                <Form.Label column sm={2}>
                                </Form.Label>
                                <Form.Label column xs={2} >
                                    Score: {this.state.score}
                                </Form.Label>
                                <Form.Label column xs={2} >
                                    Progress: {this.state.progress}/{activeQuiz.questions.length}
                                </Form.Label>
                            </Form.Group>
                            {(this.state.selectedIndex === -1) ? 
                                <Button bsStyle="primary" onClick={()=>this.startQuiz()}>Start Quiz</Button>
                            :
                            (this.state.selectedIndex === -2) ? 
                                <div>
                                    <p>You got {this.state.score} out of {activeQuiz.questions.length} questions right. Congrats!</p>
                                    <Button bsStyle="primary" onClick={()=>this.startQuiz()}>Restart Quiz</Button>
                                </div>
                            :
                            <Jumbotron>
                                <h2>Q{this.state.progress+1}: {activeQuestion.question}</h2>
                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Form.Label as="legend" column sm={2}>
                                            Choose the answer
                                        </Form.Label>
                                        <Col sm={10}>
                                            {
                                                ["A","B","C","D"].map((letter, index) => {
                                                    return (
                                                        <Form.Check
                                                            key={index}
                                                            value={index}
                                                            type="radio"
                                                            label={activeQuestion.choices[index]}
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
                                <p>
                                    <Button bsStyle="primary" onClick={(event)=>{this.checkAnswer(event)}}>Submit answer</Button>
                                </p>
                            </Jumbotron>}
                        </div>
                    </Tab>
                    <Tab eventKey="statistics" title="My Statistics" >
                        <div id="showquizzes_container">
                        </div>
                    </Tab>
                </Tabs>
             </div>
        )
    }

}