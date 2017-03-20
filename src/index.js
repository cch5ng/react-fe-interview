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

    var db;
    const dummyQuestions = [
      { id: 1,
        name: 'list 1',
        questions: [
          { GeneralQuestions: []},
          { HTMLQuestions: []},
          { CSSQuestions: []},
          { JSQuestions: []},
          { TestingQuestions: []},
          { PerformanceQuestions: []},
          { NetworkQuestions: []}
        ]
      }
    ];

    //create indexedDB
    var request = window.indexedDB.open("FavoriteQuestions", 1);

    //err handle
    request.onerror = function(ev) {

    }

    request.onupgradeneeded = function(ev) {
      db = ev.target.result;
      console.log('db: ' + db);
      var objectStore = db.createObjectStore("lists", {keyPath: "id"});

      objectStore.transaction.oncomplete = function(ev) {
        var listObjectStore = db.transaction("lists", "readwrite").objectStore("lists");
        dummyQuestions.forEach((list) => {
          listObjectStore.add(list);
        });
      }

    }

    //this.db = db;
    //console.log('this.db: ' + this.db);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
