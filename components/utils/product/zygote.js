import React from 'react'
import Head from 'next/head'
import env from 'json/env.json'

export default class extends React.Component {
	render(){
		return (
			<div>
				{env.ENABLE_ECOMMERCE &&
					<div>
						<link type='text/css' rel='stylesheet' href='https://zygote.netlify.com/zygote-v1.css' />
						<script src='https://zygote.netlify.com/zygote-v1.js' defer />
					</div>
				}
			</div>
		)
	}
}
