import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'node-uuid';
import localforage from 'localforage';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import {  } from 'react-bootstrap';
import '../App.css';
import h5bp_interview from '../utilities/h5bp_interview.json';
import { CATEGORIES } from '../utilities/constants';

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

    //test
    //window.location.reload();
    if (this.state.viewState === 'read') {
      localforage.getItem(this.listId).then(function(value) {
          // This code runs once the value has been loaded
          // from the offline store.
          console.log(value);
          that.setState({
            name: value.name,
            questions: value.questions
            // questions is [{'category': [question_string1, question_string2]}]
          });

      }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
      });
    }
    if (this.state.viewState === 'edit') {
      console.log('do something for edit view')
    }
  }

  render() {
    var that = this;
    var category;
    var questions = [];
    if (this.state.questions) {
      var questionsList = this.state.questions.map(function(questionObj, idx) {
        for (let key in questionObj) {
          category = key;
          //console.log('category: ' + category);
          questions = questionObj[key];
          //console.log('questions.length: ' + questions.length);
        }

        if (questions.length) {
          return (
            <div key={category} className="p-left">
              <h4>{category}</h4>
                <ul>
                {questions.map(function(question, idx2) {
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
      });
    }

//this.state.questions && 
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
    console.log('got to handleViewMenu');
    console.log('e.target.id: ' + e.target.id);
    switch(e.target.id) {
      case 'edit-link':
        this.setState({
          viewState: 'edit'
        })
        console.log('got to edit-link')
        break;
      case 'delete-link':
        console.log('got to delete-link')
        break;
      case 'read-link':
        this.setState({
          viewState: 'read'
        })
        console.log('got to read-link')
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

    //console.log('shortCategory: ' + shortCategory);
    //console.log('question: ' + question);

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
    console.log('clicked Save');
    const listNameInput = document.getElementById('list-name-inp');
    var listObj = {};
    let questionsAr = [];
    let db;
    const key = uuid.v1();

    console.log('listNameInput.value: ' + listNameInput.value)

    CATEGORIES.forEach((categ) => {
      let categObj = {};
      categObj[categ] = this.state[categ];
      questionsAr.push(categObj);
    })

    listObj.name = listNameInput.value;
    listObj.questions = questionsAr;

    localforage.setItem(key, listObj).then(function(value) {
      console.log('set new list');
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });


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





    // //console.log('renderRandomQuestions');
    // var randomIdxList;
    // var questionsList = h5bp_interview.questions.map((questionSet, idx) => {
    //   //randomIdxList = getRandomIndexList(questionSet.id, this.state[questionSet.id]);
    //   var editQuestions = this.renderQuestions(idx);
    //   //console.log('randomIdxList: ' + randomIdxList);
    //   return (
    //     <div>
    //       <h4>{questionSet.category}</h4>
    //       <ul>
    //         {editQuestions}
    //       </ul>
    //     </div>
    //   )
    // });

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
    console.log('idxCategory: ' + idxCategory);
    //console.log('idxList: ' + idxList);
    //if (idxList) {
      // list = idxList.map((idx) => {
      //   return (
      //     <li key={uuid.v1()}>{h5bp_interview.questions[idxCategory].question_list[idx]}</li>
      //   )
      // })
    //}

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

    for (let i = 0; i < this.state.questions.length; i++) {
      //console.log('Object.keys(this.state.questions[i]): ' + Object.keys(this.state.questions[i]));
      //console.log('category: ' + category);
      let categTrimMiddle = category.split(' ').join('');
      if (Object.keys(this.state.questions[i]).indexOf(categTrimMiddle) > -1) {
        if (this.state.questions[i][categTrimMiddle].indexOf(question) > -1) {
          return true;
        } else {
          return checked;
        }
        break;
      }
    }
    return checked;
  }

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

export default Child;
