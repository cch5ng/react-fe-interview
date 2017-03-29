// src/utilities.index.js
import h5bp_interview from '../utilities/h5bp_interview.json';

/**
 * @param {string} listId
 * @param {int} count
 * @return {[int]} list of indexes for questions within a category
 * Given a particular question type and the count of questions to return
 * returns a list of indexes for random questions
 */
export function getRandomIndexList(listId, count) {
  var idxList = [];
  var curCount = count;
  var max = getTotalQuestions(listId);

  while (curCount > 0) {
    var randomIdx = getRandomInt(0, max);
    if (idxList.indexOf(randomIdx) === -1) {
      idxList.push(randomIdx);
      curCount -= 1;
    }
  }

  return idxList;
}

/**
 * @param {int} min index
 * @param {int} max index
 * @return {int}
 * Given a min and max, returns a random number
 * between (min : max - 1)
 * src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @param {string} listId
 * @return {int} number of questions for given category
 * Given a listId, returns the max number of questions associated
 */
function getTotalQuestions(listId) {
  var total;

  for (var i = 0; i < h5bp_interview.questions.length; i++) {
    if (h5bp_interview.questions[i].id === listId) {
      total = h5bp_interview.questions[i].question_list.length;
      break;
    }
  }

  return total;
}

/**
 * @param {} 
 * @return {[string]} array of concatenated strings for categories
 * ['GeneralQuestions', 'HTMLQuestions', ...]
 * 
 */
export function getCategoriesList() {
  let categList = [];
  const allQuestionObjList = h5bp_interview.questions;

  allQuestionObjList.forEach((obj) => {
    categList.push(obj["category"]);
  })

  return categList;
}

/**
 * @param {string} category string
 * @return {string} with space inbetween words trimmed
 * ex 'GeneralQuestions'
 */
export function shortCategory(categ) {
  let shortCateg;

  shortCateg = categ.split(' ').join('');
  return shortCateg;
}

