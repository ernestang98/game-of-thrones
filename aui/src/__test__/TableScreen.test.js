import React from 'react';
import {mount, shallow} from 'enzyme';
import TableScreen from "../TableScreen";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe("Table of question screen", () => {
    it("render success", () => {
        const wrapper = shallow(<TableScreen />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });


});

