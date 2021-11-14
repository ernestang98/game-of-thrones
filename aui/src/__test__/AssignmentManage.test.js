import React from 'react';
import {mount, shallow} from 'enzyme';
import AssignmentManage from "../AssignmentManage";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';
import IndividualReportScreen from "../IndividualReportScreen";

Enzyme.configure({ adapter: new Adapter() });

describe("Manage Assignment Screen", () => {
    it("render success", () => {
        const wrapper = mount(<AssignmentManage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("'edit question' button rendered correctly", () => {
        const wrapper = shallow(<AssignmentManage />);
        const buttonElement  = wrapper.find('#modifyBtn');
        expect(buttonElement.text()).toEqual('Edit Questions');
    });

    it("'edit question' button is disabled initially", () => {
        const wrapper = shallow(<AssignmentManage />);
        const buttonElement  = wrapper.find('#modifyBtn');
        expect(buttonElement.props().disabled).toBe(true);
    });

});