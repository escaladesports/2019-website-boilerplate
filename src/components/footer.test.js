import React from "react"
import { shallow } from 'enzyme'

import Footer from "./footer"

describe(`Footer`, () =>
	it(`renders correctly`, () => {
		expect(shallow(<Footer />).text()).toEqual(`Privacy PolicyCMS`)		
	})
)