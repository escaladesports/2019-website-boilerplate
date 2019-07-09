import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { css } from '@emotion/core'
import waitForElement from 'wait-for-element'
import fetch from 'isomorphic-fetch'
import {
	GATSBY_NETLIFY_SITE_ID,
	GATSBY_BUILD_WEBHOOK,
} from '../../../.env.js'

function Footer() {
	const [status, setStatus] = useState(`Loading...`)
	const [avgTime, setAvgTime] = useState(`...`)
	const [forceLoad, setForceLoad] = useState(false)

	let timeout

	async function update() {
		console.log(`Updating build status...`)
		const req = await fetch(`https://api.netlify.com/api/v1/sites/${GATSBY_NETLIFY_SITE_ID}/deploys`)
		const res = await req.json()

		console.log(`Received from API:`, res)

		let avgTime = 0
		let avgTotal = 0
		let latestState

		res.forEach(({ deploy_time, context, state }) => {
			if (context === `production`) {
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
			else if (
				latestState === `enqueued` ||
				latestState === `building` ||
				latestState === `uploading`
			) {
				status = `syncing data...`
			}
			else{
				status = latestState
			}
		}

		setAvgTime(avgTime)
		setStatus(status)
		timeout = setTimeout(update, 10 * 1000)
	}

	async function forceSync(e){
		e.preventDefault()
		setForceLoad(true)
		try{
			await fetch(GATSBY_BUILD_WEBHOOK, { method: `POST` })
			await update()
		}
		catch(err){
			console.error(err)
		}
		setForceLoad(false)
	}

	useEffect(() => {
		update()
		return () => {
			global.clearTimeout(timeout)
		}
	}, [])

	return (
		<footer css={styles.footer}>
			<div>Sync status: {status}</div>
			<div>Average sync time: {avgTime} minutes</div>
			{GATSBY_BUILD_WEBHOOK && (
				<div>
					{!forceLoad && (
						<a href='#' onClick={forceSync}>Force Sync</a>
					)}
					{forceLoad && (
						<span>Forcing sync...</span>
					)}
				</div>
			)}
		</footer>
	)
}

export default async function injectFooter() {
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
		> div{
			display: inline-block;
			:after{
				display: inline-block;
				content: "|";
				margin: 0 12px;
			}
			:last-of-type{
				:after{
					display: none;
				}
			}
		}
		a{
			color: #fff;
			font-weight: normal;
			font-size: 1em;
			text-decoration: underline;
			:hover{
				text-decoration: none;
			}
		}
	`,
}