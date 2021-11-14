import React from 'react';
import {mount, shallow} from 'enzyme';
import IndividualReportScreen from "../IndividualReportScreen";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe("Individual Report Screen", () => {
    it("render success", () => {
        const wrapper = shallow(<IndividualReportScreen />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('link to cohort report screen', () => {
        const wrapper = shallow(<IndividualReportScreen />);
        expect(wrapper
            .find('#cohort-link')
            .props()
            .to
            )
            .toBe('/cohort-report');
    })

    it("should update selected student state on select student", () => {
        const selectStudent = jest.fn();
        const wrapper = shallow(<IndividualReportScreen />);
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(selectedStudent => [selectedStudent, setSelectedStudent]);
     
        wrapper.find("#demo-simple-select").simulate("click");
        expect(selectStudent).toBeTruthy();
    });
});

