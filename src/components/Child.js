import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'node-uuid';
import localforage from 'localforage';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import {  } from 'react-bootstrap';
import '../App.css';
import h5bp_interview from '../utilities/h5bp_interview.json';
import { CATEGORIES } from '../utilities/constants';
import { getCategoriesList, shortCategory } from '../utilities';

class Child extends Component {
  constructor(props) {
    super(props);

    this.listId = this.props.match.url.split('/')[2];

    this.state = {
      viewState: 'read', //read | write
      GeneralQuestions: [],
      HTMLQuestions: [],
      CSSQuestions: [],
      JSQuestions: [],
      TestingQuestions: [],
      PerformanceQuestions: [],
      NetworkQuestions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    //this.handleAllButton = this.handleAllButton.bind(this);
    this.renderEditQuestions = this.renderEditQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    //this.getMaxCountObj = this.getMaxCountObj.bind(this);
    // this.concatCategory = this.concatCategory.bind(this);
    // this.removeArrayItem = this.removeArrayItem.bind(this);
    this.handleViewMenu = this.handleViewMenu.bind(this);
    this.isChecked = this.isChecked.bind(this);

    // var maxQuestionsObj = this.getMaxCountObj();
    // maxQuestionsObj.display = 'all';
    // this.state = maxQuestionsObj;
  }

  componentWillMount() {
    let that = this;

    localforage.getItem(that.listId).then(function(value) {
      let stateObj = {};
      stateObj.key = that.listId;
      stateObj.name = value.name;
      stateObj.questions = value.questions;
      for (let i = 0; i < value.questions.length; i++) {
        let categ = Object.keys(value.questions[i])[0];
        stateObj[categ] = value.questions[i][categ] || [];
      }

      that.setState(stateObj);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
  }

  render() {
    var that = this;
    var category;
    let categoriesList = getCategoriesList();

    var questionsList = categoriesList.map((categ) => {
      if (this.state[shortCategory(categ)].length) {
        return (
          <div key={categ} className="p-left">
            <h4>{categ}</h4>
              <ul>
              {this.state[shortCategory(categ)].map(function(question, idx2) {
                return (
                  <li key={uuid.v1()}>{question}</li>
                )
              })}
              </ul>
          </div>
        )
      } else {
          return null
      }
    })

    return (
      <div>
        <h3>{this.state.name} List</h3>
          <div>
            {this.state.viewState === 'read' ? <div className="right" onClick={this.handleViewMenu}><span id="edit-link">Edit</span> | <span id="delete-link">Delete</span></div> : <div className="right" onClick={this.handleViewMenu}><span id="read-link">Read</span> | <span id="delete-link">Delete</span></div>}
            {this.state.viewState === 'edit' ? <Button className="button" onClick={this.handleSaveButton}>Save List</Button> : null}
            {this.state.viewState === 'read' ? questionsList : this.renderEditQuestions()}
            {this.state.viewState === 'edit' ? <Button className="button" onClick={this.handleSaveButton}>Save List</Button> : null}
          </div>
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
  handleViewMenu(e) {
    switch(e.target.id) {
      case 'edit-link':
        this.setState({
          viewState: 'edit'
        })
        break;
      case 'delete-link':
        break;
      case 'read-link':
        this.setState({
          viewState: 'read'
        })
        break;
      default:
        break;
    }
  }



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

    if (e.target.checked) {
      //add question to array
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
  }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (Get Random Questions)
   */
  handleSaveButton(e) {
    var listObj = {};
    let questionsAr = [];
    let db;
    const key = this.state.key;

    CATEGORIES.forEach((categ) => {
      let categObj = {};
      categObj[categ] = this.state[categ];
      questionsAr.push(categObj);
    })

    listObj.name = this.state.name;
    listObj.questions = questionsAr;

    localforage.setItem(key, listObj).then(function(value) {
    }).catch(function(err) {
      // This code runs if there were any errors
    });

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
  renderEditQuestions() {
    let that = this;

    var questionsList = h5bp_interview.questions.map(function(questionSet, idx) {
      return (
        <div key={questionSet.category} className="p-left">
          <h4>{questionSet.category}</h4>
          <div className="form-group">
            {questionSet.question_list.map(function(question, idx2) {
              return (
                <div className="checkbox" key={questionSet.category+idx2}>
                  <label id={questionSet.category+idx2}>
                    <input type="checkbox" className={questionSet.category} value="on" onChange={that.handleChange} checked={that.isChecked(questionSet.category, question)} />
                      {question}
                  </label>
                </div>
              )
            })}
          </div>
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
  renderQuestions(idxCategory) {
    var list;
    return list;
  }

  //placeholder


  // HELPER
  /**
   * @param {}
   * @return {}
   *
   */
  isChecked(category, question) {
    let checked = false;
    let categTrimMiddle = category.split(' ').join('');

    if (this.state[categTrimMiddle].indexOf(question) > -1) {
      return true;
    }

    return checked;
  }

  /*
   * @param {string}
   * @return {string}
   * Removes space from questions category string
   */
  concatCategory(categAr) {
    let resultStr;

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

export default Child;
