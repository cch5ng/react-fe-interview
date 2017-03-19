import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

//check for indexedDB
if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
} //else {
	//window.alert('yay indexedDB');
//}

const dummyQuestions = [
	{ id: 1,
		name: 'list 1',
		questions: [
			{

			}
		]
	},
	{ id: 2,
		name: 'list 2',
		questions: [
			{

			}
		]
	}
];

//create indexedDB
var request = window.indexedDB.open("FavoriteQuestions", 2);

//err handle
request.onerror = function(ev) {

}

request.onupgradeneeded = function(ev) {
	var db = ev.target.result;
	var objectStore = db.createObjectStore("lists", {keyPath: "id"});

	objectStore.transaction.oncomplete = function(ev) {
		var listObjectStore = db.transaction("lists", "readwrite").objectStore("lists");
		dummyQuestions.forEach((list) => {
			listObjectStore.add(list);
		});
	}

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
