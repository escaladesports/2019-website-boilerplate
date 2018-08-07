import React from 'react'
import { css } from 'emotion'
import Layout from '../components/layout'
import buttonStyles from '../styles/mixins/button'
import Modal from '../components/modal'

export default class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render() {
		const { html } = this.props.data.markdownRemark
		return (
			<Layout>
				<div className={divStyles} dangerouslySetInnerHTML={{ __html: html }} />
				<button
					onClick={() => this.setState({ open: true })}

					className={buttonStyles}
				>
					Test
				</button>
				<Modal
					open={this.state.open}
					onClose={() => this.setState({ open: false })}
				>
					<div style={{height: `150vh`}}>Modal content</div>
				</Modal>
			</Layout>
		)
	}
}

const divStyles = css({
	transition: `transform 1s`,
})

export const query = graphql`
	query HomePage {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
		}
	}
`