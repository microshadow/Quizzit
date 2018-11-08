import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Dropdown from 'react-bootstrap/lib/Dropdown'

import './createquizpage.css';
import './globals.js';

export class CreateQuizPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizzes: [
                {
                    title: "Quiz 1 - historical battles",
                    questions: [
                        {
                            question: "Where was the battle of Culloden?",
                            choices: ["England", "Scottland", "Canada", "USA"],
                            correct_index: 1,
                        },
                        {
                            question: "When was the battle of the Somme?",
                            choices: ["1916", "2001", "1943", "1945"],
                            correct_index: 0,
                        },
                    ]
                },
                {
                    title: "Quiz 2 - famous people",
                    questions: [
                        {
                            question: "Who invented the induction motor?",
                            choices: ["Nikola Tesla", "Elon Musk", "Thomas Edison", "Bill Gates"],
                            correct_index: 0,
                        },
                        {
                            question: "Who was the 40th president of the US?",
                            choices: ["Donald Trump", "Barack Obama", "Ronald Reagan", "Jimmy Carter"],
                            correct_index: 2,
                        },
                    ]
                }

            ]

        }
    }

    addQuiz(title){
        console.log(title);
        let new_quizzes_array = this.state.quizzes;
        new_quizzes_array.push({title: title, questions: []});
        this.setState({quizzes: new_quizzes_array});
    }

    render(){
        return( 
            <div className="createquiz_container">
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
        console.log(newtitle);
        this.setState({title: newtitle});
    }

    render(){
        console.log("title");
        console.log(this.state.title);
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
        this.state = {selectedIndex: -1, selectedQuiz: 0}
    }

    changeActiveQuestion(index){
        this.setState({selectedIndex: index})
    }

    deleteQuestion(index){

    }

    addQuestion(event){
        event.preventDefault();
    }

    modifyQuestion(event, index){
        let form = event.target;
        console.log(form);
    }

    changeActiveQuiz(event){
        this.setState({selectedQuiz: event.target.value})
    }

    render(){
        const selectedQuiz = this.state.selectedQuiz;
        const activeQuestionIndex = this.state.selectedIndex;
        const hasActiveQuestion = (activeQuestionIndex !== -1);
        const activeQuiz = hasActiveQuestion ? this.props.quizzes[selectedQuiz] : null;
        console.log(this.state.selectedIndex);
        console.log(hasActiveQuestion);
        console.log(this.props.quizzes)
        console.log(activeQuiz);
        return(
        <Form>
            <Form.Group as={Row} controlId="formGridState">
                <Form.Label column sm={2}>
                    Quiz
                </Form.Label>
                <Form.Control as="select" sm={5} bsPrefix="select_quiz" onChange={(event, index) => {this.changeActiveQuiz(event);}}>
                    {this.props.quizzes.map((quiz, index) => {
                        return (
                            <option value={index} key={index} active={index == selectedQuiz}>{quiz.title}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalQuestions">
                <Form.Label column sm={2}>
                    Questions
                </Form.Label>
                <QuestionsList 
                    questions={this.props.quizzes[selectedQuiz].questions} 
                    changeActiveQuestion={this.changeActiveQuestion.bind(this)}
                    deleteQuestion={this.deleteQuestion.bind(this)}
                    />
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalQuestions">
                <Form.Label column sm={2}>
                    <b>{(!hasActiveQuestion) ? "Add" : "Modify"} question</b>
                </Form.Label>
                {(hasActiveQuestion) ? 
                    <Form.Label column sm={4}>
                        {this.props.quizzes[selectedQuiz].questions[activeQuestionIndex].question}
                    </Form.Label>
                : ""}
                {(hasActiveQuestion) ? 
                    <Form.Label column sm={2}>
                        <a id="changeMode_link" onClick={()=>{this.changeActiveQuestion(-1)}}>Add new question instead</a>
                    </Form.Label>
                :   <Form.Label column sm={4}>
                        <Form.Control placeholder="type question"/>
                    </Form.Label>
                }

            </Form.Group>
            <Form.Row>
            {
                ["A","B","C","D"].map((letter, index) => {

                    const choices = hasActiveQuestion ? activeQuiz.questions[activeQuestionIndex].choices : [];
                    console.log(index);
                    console.log("hasActiveQuestion");
                    console.log(hasActiveQuestion);
                    return (
                        <div>
                            <Form.Group key={index} as={Col} controlId="formGridZip">
                                <Form.Label>{"choice "+letter}</Form.Label>
                                <Form.Control placeholder={hasActiveQuestion ? choices[index] : "type choice"} />
                            </Form.Group>
                        </div>
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
                        const activeIndex = hasActiveQuestion ? (activeQuiz.questions[activeQuestionIndex].correct_index) : -1;
                        console.log(activeIndex);
                        return (
                            <Form.Check
                                key={index}
                                type="radio"
                                label={"choice "+letter}
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                checked={index == activeIndex}
                            />
                            )
                    })
                }
            </Col>
            </Form.Group>
        </fieldset>
            <Button variant="primary" type="submit" onClick={(event)=>this.addQuestion(event)}>
                {hasActiveQuestion ? "Modify" : "Add"} question
            </Button>
        </Form>
    )}
}

class QuestionsList extends React.Component{
    render(){
        console.log(this.props.questions);
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