import React from 'react'
import Helmet from 'react-helmet'
import meta from '../meta'

export default class extends React.Component {
	render(){
		let title = []
		if(this.props.title){
			if (typeof this.props.title === 'object') {
				title.push(...this.props.title)
			}
			else{
				title.push(this.props.title)
			}
		}
		if(meta.title){
			title.push(meta.title)
		}

		let description = this.props.description || meta.description

		return (
			<Helmet>
				{title.length &&
					<title>{title.join(' | ')}</title>
				}
				{description &&
					<meta name='description' content={description} />
				}
			</Helmet>
		)
	}
}
