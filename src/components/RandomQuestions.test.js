//RandomQuestions.test.js

import React from 'react';
import {shallow} from 'enzyme';
import { MemoryRouter } from 'react-router';
import RandomQuestions from './RandomQuestions';

test('RandomQuestions renders', () => {
  const randomQuestions = shallow(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <RandomQuestions />
    </MemoryRouter>
  );

  expect(randomQuestions).toBeDefined;
});