import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import h5bp_interview from './utilities/h5bp_interview.json';

class App extends Component {
  constructor(props) {
    super(props);

    var maxQuestionsObj = {};
    h5bp_interview.questions.forEach(function(questionType) {
      maxQuestionsObj[questionType.id] = questionType.question_list.length;
    });
    maxQuestionsObj.display = 'all';
    this.state = maxQuestionsObj;
    //console.log('this.state.generalQuestions: ' + this.state.generalQuestions);

    this.handleChange = this.handleChange.bind(this);
    this.handleRandomButton = this.handleRandomButton.bind(this);
    this.handleAllButton = this.handleAllButton.bind(this);
  }

  handleChange(e) {
    console.log('e.target.id: ' + e.target.id);
    var inputState = {};
    inputState[e.target.id] = e.target.value;
    this.setState(inputState);
  }

  render() {
    var questionsInputList = h5bp_interview.questions.map((questionSet, idx) => {
      var id = questionSet.id;
      var max = h5bp_interview.questions[idx].question_list.length;
      return (
        <div className="div-question">
          <label className="label-question">Number of {questionSet.category}</label>
          <input type="number"
            id={questionSet.id} className="input-question"
            min="0"
            max={max}
            step="1"
            value={this.state[questionSet.id]}
            placeholder={max}
            onChange={this.handleChange}
          />
        </div>
      )
    });

    var questionsList = h5bp_interview.questions.map(function(questionSet) {
      return (
        <div className="p-left">
          <h4>{questionSet.category}</h4>
          <ul>
            {questionSet.question_list.map(function(question) {
              return <li>{question}</li>
            })}
          </ul>
          </div>
        ) 
    });

    return (
      <div className="App container-fluid">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <h3>Random Interview Questions</h3>
          <form className="p-left">
            {questionsInputList}
          </form>
        </div>
        <p className="">
          <Button onChange={this.handleRandomButton}>Get Random Questions</Button>
          <Button onChange={this.handleAllButton}>All Questions</Button>
        </p>
        {questionsList}
      </div>
    );
  }
}

export default App;
