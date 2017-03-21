import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const defaultList = {
	name: 'default list',
	questions: [
		{GeneralQuestions: [
			'Name 3 ways to decrease page load (perceived or actual load time).',
			'Can you describe the difference between progressive enhancement and graceful degradation?',
			'What excites or interests you about coding?'
		]},
		{HTMLQuestions: [
			'How do you serve a page with content in multiple languages?'
		]},
		{CSSQuestions: [
			'How would you approach fixing browser-specific styling issues?'
		]}
	]
};

localforage.config({
    name: 'react-frontend-interview2',
    storeName: 'questionsLists'
});

localforage.setItem('defaultList', defaultList).then(function(value) {
    // This will output `1`.
    console.log('set defaultList');
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
