import React from 'react'
import InView from './in-view'
import Placeholder from './placeholder'

export default class LazyLoad extends React.Component{
	render(){
		const {
			children,
			...props
		} = this.props
		return (
			<InView once>
				{inView => (
					<Placeholder {...props}>
						{inView && children}
					</Placeholder>
				)}
			</InView>
		)
	}
}