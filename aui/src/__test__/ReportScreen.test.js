import React from 'react';
import {mount, shallow} from 'enzyme';
import ReportScreen from "../ReportScreen";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect"
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe("Report Main Screen", () => {
    it("render success", () => {
        const wrapper = shallow(<ReportScreen />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('link to individual report screen', () => {
        const wrapper = shallow(<ReportScreen />);
        expect(wrapper
            .find('#indiv-link')
            .props()
            .to
            )
            .toBe('/indiv-report');
    })

    it('includes link to individual report screen', () => {
        const wrapper = shallow(<ReportScreen />);
        expect(wrapper
            .find('#cohort-link')
            .props()
            .to
            )
            .toBe('/cohort-report');
    })
});

