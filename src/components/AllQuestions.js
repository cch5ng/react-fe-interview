import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'node-uuid';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import {  } from 'react-bootstrap';
import '../App.css';
import h5bp_interview from '../utilities/h5bp_interview.json';
//import { getRandomIndexList } from '../utilities';

class AllQuestions extends Component {
  constructor(props) {
    super(props);

    //this.handleChange = this.handleChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    //this.handleAllButton = this.handleAllButton.bind(this);
    //this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    //this.renderQuestions = this.renderQuestions.bind(this);
    //this.getMaxCountObj = this.getMaxCountObj.bind(this);

    // var maxQuestionsObj = this.getMaxCountObj();
    // maxQuestionsObj.display = 'all';
    // this.state = maxQuestionsObj;
  }

  componentDidMount() {
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
  }

  render() {
    var questionsList = h5bp_interview.questions.map(function(questionSet, idx) {
      return (
        <div key={questionSet.category} className="p-left">
          <h4>{questionSet.category}</h4>
          <FormGroup>
            {questionSet.question_list.map(function(question, idx2) {
              return <Checkbox key={questionSet.category+idx2}>{question}</Checkbox>
            })}
          </FormGroup>
        </div>
        ) 
    });

    return (
      <div>
        <h3>All Questions</h3>
        <form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>List Name</ControlLabel>
            <FormControl type="text" size="75" />
          </FormGroup>

          <Button className="button" onClick={this.handleSaveButton}>Save</Button>

          {questionsList}

          <Button className="button" onClick={this.handleSaveButton}>Save</Button>
        </form>
      </div>
    );
  }

  // EVENT HANDLERS
  /**
   * @param {event}
   * @return {}
   * Event handler for input field update (number change)
   */
  // handleChange(e) {
  //   var inputState = {};
  //   inputState[e.target.id] = e.target.value;
  //   this.setState(inputState);
  // }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (Get Random Questions)
   */
  handleSaveButton(e) {
    console.log('clicked Save');
    // this.setState({
    //   display: 'random'
    // });
  }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (All Questions)
   * also works like a Clear button where all of the input values
   * are reset to the total number of questions per category
   */
  // handleAllButton() {
  //   var maxQuestionsObj = this.getMaxCountObj();
  //   maxQuestionsObj.display = 'all';

  //   this.setState(maxQuestionsObj);
  // }

  // RENDER
  /**
   * @param {}
   * @return {string} HTML
   * Iterates over the list of list of questions and renders
   * the question category
   */
  // renderRandomQuestions() {
  //   //console.log('renderRandomQuestions');
  //   var randomIdxList;
  //   var questionsList = h5bp_interview.questions.map((questionSet, idx) => {
  //     randomIdxList = getRandomIndexList(questionSet.id, this.state[questionSet.id]);
  //     var randomQuestions = this.renderQuestions(idx, randomIdxList);
  //     //console.log('randomIdxList: ' + randomIdxList);
  //     return (
  //       <div>
  //         <h4>{questionSet.category}</h4>
  //         <ul>
  //           {randomQuestions}
  //         </ul>
  //       </div>
  //     )
  //   });

  //   return questionsList;
  // }

  /**
   * @param {int} index for particular category of questions in h5bp_interview.json
   * @param {[int]} list of index values
   * @return {string} HTML list of random questions by index values
   *
   */
  // renderQuestions(idxCategory, idxList) {
  //   var list;
  //   //console.log('idxList: ' + idxList);
  //   if (idxList) {
  //     list = idxList.map((idx) => {
  //       return (
  //         <li key={uuid.v1()}>{h5bp_interview.questions[idxCategory].question_list[idx]}</li>
  //       )
  //     })
  //   }

  //   return list;
  // }

  // HELPER
  /**
   * @param {}
   * @return {}
   *
   */
  // getMaxCountObj() {
  //   var maxQuestionsObj = {};

  //   h5bp_interview.questions.forEach(function(questionType) {
  //     maxQuestionsObj[questionType.id] = questionType.question_list.length;
  //   });
  //   return maxQuestionsObj;
  // }
}

export default AllQuestions;
