import React from "react"
import { shallow, render } from 'enzyme'

import Modal from "./modal"

describe(`<Modal />`, () => {
	it(`renders correctly`, () => {
		expect(render(<Modal open={false} />).text()).toEqual(`×`)
	})

	it(`opens correctly`, () => {
		expect(shallow(<Modal open={true} />).props().style).toHaveProperty(`display`, `block`)
	})

	it(`closes correctly`, () => {
		const modal = shallow(<Modal open={true} />)
		modal.setProps({ open: false })
		expect(modal.props().style).toHaveProperty(`display`, `none`)
	})
})