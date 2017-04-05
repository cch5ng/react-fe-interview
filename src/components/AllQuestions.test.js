//AllQuestions.test.js

import React from 'react';
import {shallow} from 'enzyme';
import AllQuestions from './AllQuestions';

test('AllQuestions renders', () => {
  const allQuestions = shallow(
    <AllQuestions />
  );

  expect(allQuestions).toBeDefined;
});