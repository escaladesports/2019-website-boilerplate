import React from 'react'

let api
if (process.env.ZYGOTE_API) {
	api = process.env.ZYGOTE_API
}
else if (process.env.NODE_ENV === 'production') {
	api = 'https://yh5fc30fhh.execute-api.us-east-1.amazonaws.com/production/handler'
}
else {
	api = 'https://hzrxrm0s9b.execute-api.us-east-1.amazonaws.com/staging/handler'
}

const initScript = `
	if (window.zygote) {
		zygote.findButtons()
		zygote.findQty()
		zygote.findIcons()
		if (!zygote.api) {
			zygote.api = "${api}"
			zygote.properties = {
				site: "${process.env.ECOMMERCE_API_SITE || 'all'}"
			}
		}
	}
`

export default class extends React.Component {
	render(){
		return (
			<div>
				{process.env.ENABLE_ECOMMERCE &&
					[
						<link type='text/css' rel='stylesheet' href='https://zygote.netlify.com/zygote-v1.css' />,
						<script src='https://zygote.netlify.com/zygote-v1.js' />,
						<script dangerouslySetInnerHTML={{ __html: initScript }} />
					]
				}
			</div>
		)
	}
}
