import React from 'react';
import { shallow } from 'enzyme';
import SingleRepo from '../SingleRepo';

const wrapper = shallow(<SingleRepo />);

describe('SingleRepo component', () => {
  it('should render the SingleRepo correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});