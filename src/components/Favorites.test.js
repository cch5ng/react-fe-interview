//Favorites.test.js

import React from 'react';
import {shallow} from 'enzyme';
import { MemoryRouter } from 'react-router';
import Favorites from './Favorites';

test('Favorites renders', () => {
  const favorites = shallow(
    <MemoryRouter initialEntries={[ '/favorites' ]}>
      <Favorites />
    </MemoryRouter>
  );

  expect(favorites).toBeDefined;
});