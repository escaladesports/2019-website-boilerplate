import React from 'react'
import { routerAdd, routerRemove } from 'utils/next/router-events'
import settings from 'components/_settings'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
		this.showLoader = this.showLoader.bind(this)
		this.routerStart = this.routerStart.bind(this)
		this.routerDone = this.routerDone.bind(this)
		this.clearTimeouts = this.clearTimeouts.bind(this)
	}
	componentWillMount() {
		// Progress bar
		this.clearTimeouts()
		routerAdd('onRouteChangeStart', this.routerStart)
		routerAdd('onRouteChangeComplete', this.routerDone)
		routerAdd('onRouteChangeError', this.routerDone)
	}
	componentDidMount() {
		this.clearTimeouts()
	}
	componentWillUnmount() {
		this.clearTimeouts()
		routerRemove('onRouteChangeStart', this.routerStart)
		routerRemove('onRouteChangeComplete', this.routerDone)
		routerRemove('onRouteChangeError', this.routerDone)
	}
	clearTimeouts() {
		clearTimeout(this.uiTimeout)
	}
	showLoader() {
		clearTimeout(this.uiTimeout)
		this.setState({ loading: true })
	}
	routerStart(url) {
		this.clearTimeouts()
		this.uiTimeout = setTimeout(this.showLoader.bind(this), 100)
	}
	routerDone() {
		this.clearTimeouts()
		this.setState({ loading: false })
	}
	render(){
		return (
			<div className={this.state.loading && 'loading'} style={{zIndex: 100}}>
				<span />
				<style jsx>{`
					div{
						box-sizing: border-box;
						position: fixed;
						top: 0;
						right: 0;
						left: 0;
						height: 9px;
						overflow: hidden;
						background-color: #fff;
						display: none;
					}
					.loading{
						display: block;
					}
					span{
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						width: 100%;
						background-color: #000;
						transform: translate(-100%, 0);
						animation: anim 3s linear infinite;
					}
					@keyframes anim{
						from{
							transform: translate(-100%, 0);
						}
						to{
							transform: translate(0%, 0);
						}
					}
				`}</style>
			</div>
		)
	}
}
