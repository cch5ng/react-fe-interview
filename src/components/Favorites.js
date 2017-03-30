import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'node-uuid';
import localforage from 'localforage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import {  } from 'react-bootstrap';
import '../App.css';
import h5bp_interview from '../utilities/h5bp_interview.json';
import { CATEGORIES } from '../utilities/constants';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      GeneralQuestions: [],
      HTMLQuestions: [],
      CSSQuestions: [],
      JSQuestions: [],
      TestingQuestions: [],
      PerformanceQuestions: [],
      NetworkQuestions: [],
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSaveButton = this.handleSaveButton.bind(this);
    //this.handleAllButton = this.handleAllButton.bind(this);
    //this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    //this.renderQuestions = this.renderQuestions.bind(this);
    //this.getMaxCountObj = this.getMaxCountObj.bind(this);
    // this.concatCategory = this.concatCategory.bind(this);
    // this.removeArrayItem = this.removeArrayItem.bind(this);
    // this.renderSavedLists = this.renderSavedLists.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
  }

  componentWillMount() {
    let that = this;
    var savedLists = [];
    var renderSavedLists = [];

    // The same code, but using ES6 Promises.
    localforage.iterate(function(value, key, iterationNumber) {

        savedLists.push([key, value]);
    }).then(function() {
        renderSavedLists = savedLists.map((list) => {
          let link = "/saved/" + list[0];
          let name = list[1].name;
          return (
            <li><Link to={link} className="a-fave">{name}</Link><i className="fa fa-minus-circle" id={list[0]} onClick={that.handleRemoveList} aria-hidden="true"></i></li>
          )
        })

        that.setState({
          renderSavedLists: renderSavedLists
        })

    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

  }

  render() {
    return (
      <div>
        <h3>Favorites</h3>
        <ul>
          {this.state.renderSavedLists}
        </ul>
      </div>
    );
  }

  // EVENT HANDLERS
  /**
   * @param {}
   * @return {}
   *
   *
   */
  handleRemoveList(e) {
    const keyRemove = e.target.id;
    let that = this;

    localforage.removeItem(keyRemove).then(function() {
        var savedLists = [];
        var renderSavedLists = [];

        localforage.iterate(function(value, key, iterationNumber) {
            savedLists.push([key, value]);
        }).then(function() {
            renderSavedLists = savedLists.map((list) => {
              let link = "/saved/" + list[0];
              let name = list[1].name;
              return (
                <li><Link to={link} className="a-fave">{name}</Link><i className="fa fa-minus-circle" id={list[0]} onClick={that.handleRemoveList} aria-hidden="true"></i></li>
              )
            })

            that.setState({
              renderSavedLists: renderSavedLists
            })

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

  }

  /**
   * @param {event}
   * @return {}
   * Event handler for input field update (number change)
   * update state which tracks all currently checked questions
   */
  // handleChange(e) {
  //   const shortCategory = this.concatCategory(e.target.classList);
  //   const label = e.target.parentElement;
  //   const question = label.innerText;
  //   let questionsAr = [];
  //   let questionsObj = {};
  //   let questionIdx;

  //   //console.log('shortCategory: ' + shortCategory);
  //   //console.log('question: ' + question);

  //   if (e.target.checked) {
  //     //add question to array
  //     questionsAr = this.state[shortCategory] ? this.state[shortCategory].slice(0) : [];
  //     questionsAr.push(question);
  //     questionsObj[shortCategory] = questionsAr;
  //     this.setState(questionsObj);
  //   } else {
  //     //remove question from array
  //     questionsAr = this.state[shortCategory] ? this.state[shortCategory].slice(0) : [];
  //     if (questionsAr.indexOf(question) > -1) {
  //       questionsAr = this.removeArrayItem(questionsAr, questionsAr.indexOf(question));
  //     }
  //     questionsObj[shortCategory] = questionsAr;
  //     this.setState(questionsObj);

  //   }

  //   //console.log('this.state[shortCategory]: ' + this.state[shortCategory]);

  //   //var inputState = {};
  //   //inputState[e.target.id] = e.target.value;
  //   //this.setState(inputState);
  // }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (Get Random Questions)
   */
  // handleSaveButton(e) {
  //   console.log('clicked Save');
  //   const listNameInput = document.getElementById('list-name-inp');
  //   var listObj = {};
  //   let questionsAr = [];
  //   let db;
  //   const key = uuid.v1();

  //   console.log('listNameInput.value: ' + listNameInput.value)

  //   CATEGORIES.forEach((categ) => {
  //     let categObj = {};
  //     categObj[categ] = this.state[categ];
  //     questionsAr.push(categObj);
  //   })

  //   listObj.name = listNameInput.value;
  //   listObj.questions = questionsAr;

  //   localforage.setItem(key, listObj).then(function(value) {
  //     console.log('set new list');
  //   }).catch(function(err) {
  //     // This code runs if there were any errors
  //     console.log(err);
  //   });


  //   // this.setState({
  //   //   display: 'random'
  //   // });
  // }

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
  renderSavedLists() {
    var savedLists = [];
    var renderSavedLists = [];

    // The same code, but using ES6 Promises.
    localforage.iterate(function(value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.

        savedLists.push([key, value]);
    }).then(function() {
        renderSavedLists = savedLists.map((list) => {
          let link = "/" + list[0];
          let name = list[1].name;
          return (
            <li><Link to={link}>{name}</Link></li>
          )
        })
        console.log('Iteration has completed');
      return renderSavedLists;
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

  }

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

export default Favorites;
