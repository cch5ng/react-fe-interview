import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import h5bp_interview from './utilities/h5bp_interview.json';

class App extends Component {
  render() {
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="">
          <Button>Random Questions</Button>
          <Button>All Questions</Button>
        </p>
        {questionsList}
      </div>
    );
  }
}

export default App;
