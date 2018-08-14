import React from 'react'
import { cx, css } from 'emotion'
import Layout from '../components/layouts/default'
import Meta from '../components/meta'
import grid from '../styles/mixins/grid'

export default class GridPage extends React.Component{
	render(){

		return(
			<Layout>
				<Meta title='Grid Example' />
				<h1>Grid Example</h1>
				<div className={cx(gridStyles, gridColor)}>
					{function(){
						const els = []
						for(let i = 0; i < 31; i++){
							els.push(<div key={`grid${i}`}>{i + 1}</div>)
						}
						return els
					}()}
				</div>
			</Layout>
		)
	}
}

console.log(grid({
	gutter: 5,
	height: 200,
	columns: {
		0: 1,
		300: 2,
		600: 3,
		900: 4,
	},
}))

const gridStyles = grid({
	gutter: 5,
	height: 200,
	columns: {
		0: 1,
		300: 2,
		600: 3,
		900: 4,
	},
})

const gridColor = css({
	'> *': {
		background: `#ccc`,
		border: `1px solid #000`,
	},
})