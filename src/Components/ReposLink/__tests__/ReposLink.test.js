import React from 'react';
import { shallow } from 'enzyme';
import ReposLink from '../ReposLink';

const wrapper = shallow(<ReposLink />);

describe('ReposLink component', () => {
  it('should render the ReposLink correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});