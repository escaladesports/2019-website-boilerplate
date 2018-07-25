import React from 'react'
import Colors from './colors'
import Fonts from './fonts'

import H1 from '../h1'
import H2 from '../h2'
import H3 from '../h3'
import Button from '../button'

class Styleguide extends React.Component {
	render(){
		return(
			<main>
				<section>
					<h1>Colors:</h1>
					<Colors />
				</section>
				<section>
					<h1>Fonts:</h1>
					<Fonts />
				</section>
				<section>
					<h1>Headers:</h1>
					<H1>Header 1</H1>
					<H2>Header 2</H2>
					<H3>Header 3</H3>
				</section>
				<section>
					<h1>Button:</h1>
					<Button>I'm a Button</Button>
				</section>
				<style jsx>{`
					main{
						max-width: 900px;
						margin: auto;
						padding: 30px;
					}
					section{
						margin: 80px 0;
					}
					h1{
						text-transform: uppercase;
						font-size: 1.2em;
						color: #bbb;
						font-weight: normal;
						margin-left: -15px;
					}
				`}</style>
			</main>
		)
	}
}

export default Styleguide