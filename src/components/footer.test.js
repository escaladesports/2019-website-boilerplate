import React from "react"
import renderer from "react-test-renderer"

import Footer from "./footer"

describe(`Footer`, () =>
	it(`renders correctly`, () => {
		const container = renderer.create(<Footer />)
		const tree = container.toJSON()
		expect(tree).toMatchSnapshot()
	})
)