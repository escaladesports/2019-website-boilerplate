import React from 'react'
import { css } from '@emotion/core'
import InView from './in-view'
import Placeholder from './placeholder'

const resizeEvents = []
let eventListener = false

export default class NetlifyImage extends React.Component{
	static defaultProps = {
		resize: `fit`,
	}
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
		this.resize()
	}
	componentWillUnmount(){
		resizeEvents.splice(resizeEvents.indexOf(this.resize), 1)
	}
	resize() {
		const {
			clientWidth: w,
			clientHeight: h,
		} = this.container
		if (w > this.state.w) {
			this.setState({ w, h })
		}
	}
	render(){
		const {
			ratio,
			resize,
			width,
			height,
			src,
			...props
		} = this.props
		const { w, h } = this.state
		return (
			<InView once>
				{inView => (
					<div
						style={{ width }}
						css={styles.container}
						ref={el => this.container = el}
					>
						<Placeholder ratio={ratio || [width, height]}>
							{!!w && inView && (
								<img
									src={`${src}?nf_resize=${resize}&w=${w}&h=${h}`}
									{...props}
								/>
							)}
						</Placeholder>
					</div>
				)}
			</InView>
		)
	}
}

const styles = {
	container: css`
		max-width: 100%;
	`,
}