import React from 'react'
import handlebars from 'handlebars'
import terms from '../markdown/components/terms-and-conditions.md'

let template = handlebars.compile(terms)
let str = template({
	fullName: `Indian Industries, Inc.d / b / a Escalade Sports`,
	shortName: `Escalade Sports`,
	ownerName: `Escalade Sports'`,
	uppercaseName: `ESCALADE SPORTS`,
	productName: `Escalade Sports' Products and Services`,
	email: `customerservice@escaladesports.com`,
	phone: `1-800-467-1421`,
	provider: `Escalade Sports and its affiliates(collectively "Escalade Sports" and "Escalade Sports' Products and Services")`,
	date: `July 2017`,
})

export default class Index extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		window.pageExitTime = 1000
	}
	render() {
		console.log('Contact page:', this.props.status)
		return (
			<div dangerouslySetInnerHTML={{__html: str}} />
		)
	}
}
