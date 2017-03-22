import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'node-uuid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';
import h5bp_interview from './utilities/h5bp_interview.json';
import { getRandomIndexList } from './utilities';
import RandomQuestions from './components/RandomQuestions';
import AllQuestions from './components/AllQuestions';
import Favorites from './components/Favorites';
import Child from './components/Child';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRandomButton = this.handleRandomButton.bind(this);
    this.handleAllButton = this.handleAllButton.bind(this);
    this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getMaxCountObj = this.getMaxCountObj.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    var maxQuestionsObj = this.getMaxCountObj();
    maxQuestionsObj.display = 'all';
    maxQuestionsObj.displaySearch = false;
    this.state = maxQuestionsObj;
  }

  render() {
    var questionsInputList = h5bp_interview.questions.map((questionSet, idx) => {
      var max = h5bp_interview.questions[idx].question_list.length;
      return (
        <div key={uuid.v1()} className="div-question">
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
        <div key={uuid.v1()} className="p-left">
          <h4>{questionSet.category}</h4>
          <ul>
            {questionSet.question_list.map(function(question) {
              return <li key={uuid.v1()}>{question}</li>
            })}
          </ul>
          </div>
        ) 
    });

    return (
      <Router db={this.props.db} >
        <div>
          <Navbar className="App-header" collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Front End Interview Questions</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem><Link to="/" className="nav-a">Random</Link></NavItem>
                <NavItem><Link to="/all" className="nav-a">All Questions</Link></NavItem>
                <NavItem><Link to="/favorites" className="nav-a">Favorites</Link></NavItem>
                <NavItem><i className="fa fa-search fa-lg" onClick={this.handleSearch} aria-hidden="true"></i></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className={this.state.displaySearch ? "nav-search search-display" : "nav-search search-hide"} >
            just testing this out
          </div>
          <main className="container-fluid">
            <Route exact path="/" component={RandomQuestions}/>
            <Route path="/all" component={AllQuestions}/>
            <Route path="/favorites" component={Favorites}/>
            <Route path="/saved/:id" component={Child}/>
          </main>
        </div>
      </Router>
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
   * Event handler for button click (Get Random Questions)
   */
  handleRandomButton() {
    this.setState({
      display: 'random'
    });
  }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (All Questions)
   * also works like a Clear button where all of the input values
   * are reset to the total number of questions per category
   */
  handleAllButton() {
    var maxQuestionsObj = this.getMaxCountObj();
    maxQuestionsObj.display = 'all';

    this.setState(maxQuestionsObj);
  }

  /**
   * @param {}
   * @return {}
   * Event handler for button click (All Questions)
   * 
   * 
   */
  handleSearch() {
    console.log('clicked search');
    this.setState({
      displaySearch: !this.state.displaySearch
    })
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

  /**
   * @param {int} index for particular category of questions in h5bp_interview.json
   * @param {[int]} list of index values
   * @return {string} HTML list of random questions by index values
   *
   */
  renderQuestions(idxCategory, idxList) {
    var list;
    //console.log('idxList: ' + idxList);
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

export default App;
