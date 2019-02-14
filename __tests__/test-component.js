import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TestComponent from '../src/components/test-component'

describe(`TestComponent`, () => {
	it(`renders correctly`, () => {
		const { container } = render(<TestComponent />)
		expect(container).toHaveTextContent(`TEST`)
	})
})