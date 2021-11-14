import React from 'react';
import {mount, shallow} from 'enzyme';
import CohortReportScreen from "../CohortReportScreen";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe("Cohort Report Screen", () => {
    it("render success", () => {
        const wrapper = shallow(<CohortReportScreen />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('link to cohort report screen', () => {
        const wrapper = shallow(<CohortReportScreen />);
        expect(wrapper
            .find('#indiv-link')
            .props()
            .to
            )
            .toBe('/indiv-report');
    })

    // it("should update selected student state on select student", () => {
    //     const selectStudent = jest.fn();
    //     const wrapper = shallow(<CohortReportScreen />);
    //     const handleClick = jest.spyOn(React, "useState");
    //     handleClick.mockImplementation(selectedStudent => [selectedStudent, setSelectedStudent]);
     
    //     wrapper.find("#demo-simple-select").simulate("click");
    //     expect(selectStudent).toBeTruthy();
    // });
});

