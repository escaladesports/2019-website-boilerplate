import React from 'react'
import { css } from '@emotion/core'
import InView from './in-view'
import Placeholder from './placeholder'

const resizeEvents = []
let eventListener = false

export default class ResponsiveImage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			w: 0,
			h: 0,
		}
		this.resize = this.resize.bind(this)
	}
	componentDidMount(){
		if(!eventListener){
			eventListener = true
			window.addEventListener(`resize`, () => {
				for(let i = resizeEvents.length; i--;){
					resizeEvents[i]()
				}
			})
		}
		resizeEvents.push(this.resize)
		setTimeout(this.resize, 1)
	}
	componentWillUnmount(){
		resizeEvents.splice(resizeEvents.indexOf(this.resize), 1)
	}
	resize() {
		const {
			clientWidth: w,
			clientHeight: h,
		} = this.container
		console.log(this.container, w)
		if (w > this.state.w) {
			this.setState({ w, h })
		}
	}
	render(){
		const {
			ratio,
			width,
			height,
			children,
		} = this.props
		const { w, h } = this.state
		return (
			<InView once>
				{inView => {
					return (
						<div
							style={{ width }}
							css={styles.container}
							ref={el => this.container = el}
						>
							<Placeholder ratio={ratio || [width, height]}>
								{!!w && inView && children(w, h)}
							</Placeholder>
						</div>
					)
				}}
			</InView>
		)
	}
}

const styles = {
	container: css`
		max-width: 100%;
	`,
}