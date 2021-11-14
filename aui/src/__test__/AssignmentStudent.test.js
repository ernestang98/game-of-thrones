import Enzyme, {mount, shallow} from "enzyme";
import AssignmentStudent from "../AssignmentStudent";
import toJson from "enzyme-to-json";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });


describe("Create Assignment Screen", () => {
    it("render success", () => {
        const wrapper = mount(<AssignmentStudent />);
        expect(toJson(wrapper)).toMatchSnapshot();
        //console.log(wrapper.debug());
    });

    it("assign button rendered correctly", () => {
        const wrapper = shallow(<AssignmentStudent />);
        const buttonElement  = wrapper.find('#ButtonComponent');
        expect(buttonElement.text()).toEqual('Assign');
    });

    it("render textfield to input assignment name", () => {
        const wrapper = shallow(<AssignmentStudent />);
        const buttonElement  = wrapper.find('#assignmentInput');
        expect(buttonElement.props().label).toEqual('Assignment Name');

    });

    it("render textfield to input assignment description", () => {
        const wrapper = shallow(<AssignmentStudent />);
        const buttonElement  = wrapper.find('#descInput');
        expect(buttonElement.props().label).toEqual('Assignment Description');

    });

    it("updates state after selecting student", () => {
        const value = jest.fn();
        const wrapper = shallow(<AssignmentStudent />);
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(value => [value, setValue]);

        wrapper.find("#radio-select").simulate("click");
        expect(value).toBeTruthy();
    });

    it("updates state after selecting teacher", () => {
        const value = jest.fn();
        const wrapper = shallow(<AssignmentStudent />);
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(value => [value, setValue]);

        wrapper.find("#teacher-select").simulate("click");
        expect(value).toBeTruthy();
    });
});