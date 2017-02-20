import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import h5bp_interview from './utilities/h5bp_interview.json';
import { getRandomIndexList } from './utilities';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRandomButton = this.handleRandomButton.bind(this);
    this.handleAllButton = this.handleAllButton.bind(this);
    this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getMaxCountObj = this.getMaxCountObj.bind(this);

    var maxQuestionsObj = this.getMaxCountObj();
    maxQuestionsObj.display = 'all';
    this.state = maxQuestionsObj;
  }

  // EVENT HANDLERS
  handleChange(e) {
    var inputState = {};
    inputState[e.target.id] = e.target.value;
    this.setState(inputState);
  }

  handleRandomButton() {
    this.setState({
      display: 'random'
    });
  }

  handleAllButton() {
    var maxQuestionsObj = this.getMaxCountObj();
    maxQuestionsObj.display = 'all';

    this.setState(maxQuestionsObj);
  }

  // RENDER
  renderRandomQuestions() {
    //console.log('renderRandomQuestions');
    var randomIdxList;
    var questionsList = h5bp_interview.questions.map((questionSet, idx) => {
      randomIdxList = getRandomIndexList(questionSet.id, this.state[questionSet.id]);
      var randomQuestions = this.renderQuestions(idx, randomIdxList);
      //console.log('randomIdxList: ' + randomIdxList);
      return (
        <div>
          <h4>{questionSet.category}</h4>
          <ul>
            {randomQuestions}
          </ul>
        </div>
      )
    });

    return questionsList;
  }

  renderQuestions(idxCategory, idxList) {
    var list;
    //console.log('idxList: ' + idxList);
    if (idxList) {
      list = idxList.map((idx) => {
        return (
          <li>{h5bp_interview.questions[idxCategory].question_list[idx]}</li>
        )
      })
    }

    return list;
  }

  // HELPER
  getMaxCountObj() {
    var maxQuestionsObj = {};

    h5bp_interview.questions.forEach(function(questionType) {
      maxQuestionsObj[questionType.id] = questionType.question_list.length;
    });
    return maxQuestionsObj;
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

    var randomQuestionsList =  this.renderRandomQuestions();

    return (
      <div>
        <div className="App-header center">
          <h2>Front End Interview Questions</h2>
        </div>
        <main className="container-fluid">
          <div>
            <h3>Random Interview Questions</h3>
            <form className="p-left">
              {questionsInputList}
            </form>
          </div>
          <p className="center">
            <Button className="button" onClick={this.handleRandomButton}>Get Random Questions</Button>
            <Button className="button" onClick={this.handleAllButton}>All Questions</Button>
          </p>
          {this.state.display === 'all' ? questionsList : randomQuestionsList}
        </main>
      </div>
    );
  }
}

export default App;
