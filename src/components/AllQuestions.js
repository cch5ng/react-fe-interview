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

    this.state = {
      GeneralQuestions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    //this.handleAllButton = this.handleAllButton.bind(this);
    //this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    //this.renderQuestions = this.renderQuestions.bind(this);
    //this.getMaxCountObj = this.getMaxCountObj.bind(this);
    this.concatCategory = this.concatCategory.bind(this);
    this.removeArrayItem = this.removeArrayItem.bind(this);

    // var maxQuestionsObj = this.getMaxCountObj();
    // maxQuestionsObj.display = 'all';
    // this.state = maxQuestionsObj;
  }

//
  render() {
    var that = this;
    var questionsList = h5bp_interview.questions.map(function(questionSet, idx) {
      return (
        <div key={questionSet.category} className="p-left">
          <h4>{questionSet.category}</h4>
          <div className="form-group">
            {questionSet.question_list.map(function(question, idx2) {
              return (
                <div className="checkbox" key={questionSet.category+idx2}>
                  <label id={questionSet.category+idx2}>
                    <input type="checkbox" className={questionSet.category} value="on" onChange={that.handleChange} />
                      {question}
                  </label>
                </div>
              )
            })}
          </div>
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
   * update state which tracks all currently checked questions
   */
  handleChange(e) {
    const shortCategory = this.concatCategory(e.target.classList);
    const label = e.target.parentElement;
    const question = label.innerText;
    let questionsAr = [];
    let questionsObj = {};
    let questionIdx;

    console.log('shortCategory: ' + shortCategory);
    console.log('question: ' + question);

    if (e.target.checked) {
      //add question to array
      console.log('this.state[shortCategory]: ' + this.state[shortCategory]);
      console.log('type this.state[shortCategory]: ' + typeof this.state[shortCategory]);
      questionsAr = this.state[shortCategory] ? this.state[shortCategory].slice(0) : [];
      questionsAr.push(question);
      questionsObj[shortCategory] = questionsAr;
      this.setState(questionsObj);
    } else {
      //remove question from array
      questionsAr = this.state[shortCategory] ? this.state[shortCategory].slice(0) : [];
      if (questionsAr.indexOf(question) > -1) {
        questionsAr = this.removeArrayItem(questionsAr, questionsAr.indexOf(question));
      }
      questionsObj[shortCategory] = questionsAr;
      this.setState(questionsObj);

    }

    console.log('this.state[shortCategory]: ' + this.state[shortCategory]);

    //var inputState = {};
    //inputState[e.target.id] = e.target.value;
    //this.setState(inputState);
  }

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

  /*
   * @param {string}
   * @return {string}
   * Removes space from questions category string
   */
  concatCategory(categAr) {
    let resultStr;

    // console.log('keys categStr: ' + Object.keys(categStr));
    // console.log('categStr[0]: ' + categStr[0]);
    // console.log('categStr[1]: ' + categStr[1]);
    // console.log('type categStr: ' + typeof categStr);
    resultStr = categAr[0] + categAr[1];

    return resultStr;
  }

  /*
   * @param {array}
   * @param {int}
   * @return {array}
   * Removes item at given index
   */
  removeArrayItem(ar, idx) {
    let resultAr = ar.slice(0);

    if (ar.length === 1 && idx === 0) {
      return [];
    }
    if (idx === ar.length - 1) {
      resultAr.pop();
      return resultAr;
    }
    if (ar.length > 1) {
      resultAr.splice(idx, 1);
    }

    return resultAr;
  }
}

export default AllQuestions;
