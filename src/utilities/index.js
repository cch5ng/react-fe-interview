// src/utilities.index.js
// helper functions like converting source html to json

import { html2json } from 'html2json';

export var h5bp_interview = html2json('h5bp_interview.html');

console.log(h5bp_interview.json);