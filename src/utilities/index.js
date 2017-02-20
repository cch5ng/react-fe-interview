// src/utilities.index.js
import h5bp_interview from '../utilities/h5bp_interview.json';

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
