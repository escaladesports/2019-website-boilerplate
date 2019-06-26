import React from 'react'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'

export default class ZipInput extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.state = { error: false }
	}
	async handleChange(e){
		e.preventDefault()
		try {
			const res = await fetch(`https://zip-info-api.netlify.com/complete/${this.input.value}`)
			const { lat, long } = await res.json()
			this.props.zoomToLocation(lat, long)
			this.setState({ error: false })
		}
		catch(err){
			console.error(err)
			this.setState({
				error: `Please enter a valid zip code`,
			})
		}
	}
	render(){
		return (
			<div css={styles.zipContainer}>
				<form onSubmit={this.handleChange}>
					<input
						type='text'
						ref={el => this.input = el}
					/>
					<button type='submit'>Search</button>
				</form>
				{!!this.state.error && (
					<div css={styles.error}>{this.state.error}</div>
				)}
			</div>
		)
	}
}

const styles = {
	zipContainer: css`
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 400;
		text-align: right;
	`,
	error: css`
		color: #f00;
		font-size: .7em;
		font-weight: bold;
	`,
}