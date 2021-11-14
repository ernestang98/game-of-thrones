import Enzyme, {mount, shallow} from "enzyme";
import AssignmentAdd from "../AssignmentAdd";
import toJson from "enzyme-to-json";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });


describe("Add Question to Assignment Screen", () => {
    it("render success", () => {
        const wrapper = mount(<AssignmentAdd />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("button rendered correctly", () => {
        const wrapper = shallow(<AssignmentAdd />);
        const buttonElement  = wrapper.find('#addBtn');
        expect(buttonElement.text()).toEqual('Save and Add Another Question');
    });
});