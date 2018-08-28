import React from "react"
import renderer from "react-test-renderer"

import Header from "./header"

describe(`Header`, () =>
	it(`renders correctly`, () => {
		const container = renderer.create(<Header />)
		const tree = container.toJSON()
		expect(tree).toMatchSnapshot()
	})
)