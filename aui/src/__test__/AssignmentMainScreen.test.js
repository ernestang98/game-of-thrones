import React from 'react';
import {mount, shallow} from 'enzyme';
import AssignmentMain from "../AssignmentMain";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });


describe("Assignment Main Screen", () => {
    it("render success", () => {
        const wrapper = mount(<AssignmentMain />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});