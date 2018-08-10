import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Example from '../dist'

afterEach(cleanup)

test(`Example content should render`, () => {
	const { container } = render(<Example />)
	expect(container).toHaveTextContent(/Example Component/)
})