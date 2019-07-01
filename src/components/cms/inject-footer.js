import React from 'react'
import { render } from 'react-dom'
import { css } from '@emotion/core'
import waitForElement from 'wait-for-element'
import fetch from 'isomorphic-fetch'
import { GATSBY_NETLIFY_SITE_ID } from '../../../.env.js'

class Footer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			status: `Loading...`,
			avgTime: `\u00A0`,
		}
		this.update = this.update.bind(this)
	}
	async update(){
		console.log(`Updating build status...`)
		const req = await fetch(`https://api.netlify.com/api/v1/sites/${GATSBY_NETLIFY_SITE_ID}/deploys`)
		const res = await req.json()

		console.log(`Received from API:`, res)

		let avgTime = 0
		let avgTotal = 0
		let latestState

		res.forEach(({ deploy_time, context, state }) => {
			if(context === `production`){
				if (!latestState) latestState = state
				if (state === `ready`) {
					avgTime += deploy_time
					avgTotal++
				}
			}
		})

		avgTime = avgTime / avgTotal
		avgTime = avgTime / 60
		avgTime = avgTime.toFixed(2)

		let status = `unknown`
		if (latestState) {
			if (latestState === `ready`) {
				status = `up to date`
			}
			if(latestState === `building` || latestState === `uploading`){
				status = `syncing data...`
			}
		}

		this.setState({
			loading: false,
			avgTime: avgTime ? `Average sync time: ${avgTime} minutes` : ``,
			status,
		})
		this.timeout = setTimeout(this.update, 10 * 1000)
	}
	componentDidMount(){
		this.update()
	}
	componentWillUnmount(){
		global.clearTimeout(this.timeout)
	}
	render(){
		console.log(`render`)
		const { status, avgTime } = this.state
		return (
			<footer css={styles.footer}>
				<div>Sync status: {status}</div>
				<div>{avgTime}</div>
			</footer>
		)
	}
}

export default async function injectFooter(){
	await waitForElement(`#nc-root header`, 60 * 60 * 1000)
	const container = document.createElement(`div`)
	document.body.appendChild(container)
	render(
		<Footer />,
		container
	)

}

const styles = {
	footer: css`
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgb(121, 130, 145);
		color: #fff;
		padding: 10px;
		font-size: .8em;
		text-align: center;
	`,
}