//Child.test.js

import React from 'react';
import {shallow} from 'enzyme';
import { MemoryRouter } from 'react-router';
import Child from './Child';

test('Child renders', () => {
  const props = {
    params: {
      url: 'defaultUrl'
    }
  };

  const child = shallow(
  	<MemoryRouter initialEntries={[ '/child/defaultUrl' ]}>
	    <Child {...props} />
    </MemoryRouter>
  );

  expect(child).toBeDefined;
});