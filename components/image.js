import React from 'react'
import settings from 'components/_settings'
import Loader from 'components/loader'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = { loading: '' }
		this.hideLoader = this.hideLoader.bind(this)
		this.showLoader = this.showLoader.bind(this)
		this.startTimeout = this.startTimeout.bind(this)
	}
	componentWillReceiveProps() {
		this.startTimeout()
	}
	componentDidMount() {
		if (this.img.complete) {
			this.hideLoader()
		}
		else {
			this.startTimeout()
		}
	}
	startTimeout() {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(this.showLoader, 100)
	}
	showLoader() {
		if (!this.img.complete) {
			this.setState({ loading: 'loading' })
		}
	}
	hideLoader() {
		clearTimeout(this.timeout)
		this.setState({ loading: '' })
	}
	render(){
		return (
			<div className='root' style={{
				maxWidth: this.props.width,
				maxHeight: this.props.height
			}}>
				<div className={`holder ${this.state.loading}`} style={{
					paddingBottom: `${(this.props.height / this.props.width) * 100}%`
				}}>
					<img
						src={this.props.src}
						srcSet={this.props.srcSet}
						ref={img => this.img = img}
						onLoad={this.hideLoader}
						onError={this.hideLoader}
						alt={this.props.alt}
					/>
					{this.state.loading &&
						<div className='loader'>
							<Loader />
						</div>
					}
				</div>
				<style jsx>{`
					.holder{
						position: relative;
					}
					.loading{
						img{
							display: none;
						}
					}
					img{
						width: 100%;
						max-width: 100%;
						top: 0;
						left: 0;
					}
					.loader, img{
						position: absolute;
					}
					.loader{
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				`}</style>
			</div>
		)
	}
}
