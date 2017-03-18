import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'node-uuid';
import '../App.css';
import h5bp_interview from '../utilities/h5bp_interview.json';
import { getRandomIndexList } from '../utilities';

class RandomQuestions extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
    this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getMaxCountObj = this.getMaxCountObj.bind(this);

    var maxQuestionsObj = this.getMaxCountObj();
    maxQuestionsObj.display = 'all';
    this.state = maxQuestionsObj;
  }

  render() {
    var questionsInputList = h5bp_interview.questions.map((questionSet, idx) => {
      var max = h5bp_interview.questions[idx].question_list.length;
      let key = `input-${idx}`;
      return (
        <div key={key} className="div-question">
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

    return (
      <div>
        <div>
          <h3>Random Interview Questions</h3>
          <form className="p-left">
            {questionsInputList}
          </form>
        </div>
        <p className="center">
          
          <Button className="button" onClick={this.handleClearButton}>Clear</Button>
        </p>
        {this.renderRandomQuestions()}
      </div>
    );
  }

  // EVENT HANDLERS
  /**
   * @param {event}
   * @return {}
   * Event handler for input field update (number change)
   */
  handleChange(e) {
    var inputState = {};

    inputState[e.target.id] = e.target.value;
    this.setState(inputState);
  }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (Clear)
   * resets all of the input values
   * to the total number of questions per category
   */
  handleClearButton() {
    var maxQuestionsObj = this.getMaxCountObj();

    this.setState(maxQuestionsObj);
  }

  // RENDER
  /**
   * @param {}
   * @return {string} HTML
   * Iterates over the list of list of questions and renders
   * the question category
   */
  renderRandomQuestions() {
    //console.log('renderRandomQuestions');
    var randomIdxList;
    var questionsList = h5bp_interview.questions.map((questionSet, idx) => {
      randomIdxList = getRandomIndexList(questionSet.id, this.state[questionSet.id]);
      var randomQuestions = this.renderQuestions(idx, randomIdxList);
      return (
        <div key={uuid.v1()}>
          <h4>{questionSet.category}</h4>
          <ul>
            {randomQuestions}
          </ul>
        </div>
      )
    });

    return questionsList;
  }

  /**
   * @param {int} index for particular category of questions in h5bp_interview.json
   * @param {[int]} list of index values
   * @return {string} HTML list of random questions by index values
   *
   */
  renderQuestions(idxCategory, idxList) {
    var list;
    if (idxList) {
      list = idxList.map((idx) => {
        return (
          <li key={uuid.v1()}>{h5bp_interview.questions[idxCategory].question_list[idx]}</li>
        )
      })
    }

    return list;
  }

  // HELPER
  /**
   * @param {}
   * @return {}
   *
   */
  getMaxCountObj() {
    var maxQuestionsObj = {};

    h5bp_interview.questions.forEach(function(questionType) {
      maxQuestionsObj[questionType.id] = questionType.question_list.length;
    });
    return maxQuestionsObj;
  }
}

export default RandomQuestions;
