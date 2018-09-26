/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "once" }]*/
import React from 'react'

export default class InView extends React.Component{
	static defaultProps = {
		offset: `0px`,
	}
	constructor(props){
		super(props)
		this.state = {
			inView: false,
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange([{ isIntersecting, boundingClientRect }]){
		const { y } = boundingClientRect
		if(y > 0){
			if(isIntersecting){
				if (this.props.once) {
					this.unobserve()
				}
				this.setState({ inView: true })
			}
			else {
				this.setState({ inView: false })
			}
		}
	}
	unobserve() {
		if (global.IntersectionObserver) {
			this.observer.unobserve(this.el)
		}
	}
	componentDidMount(){
		if (global.IntersectionObserver) {
			this.observer = new global.IntersectionObserver(this.onChange, {
				rootMargin: this.props.offset,
			})
			this.observer.observe(this.el)
		}
		else{
			this.setState({ inView: true })
		}
	}
	componentWillUnmount() {
		this.unobserve()
	}
	render() {
		const {
			tag,
			children,
			once,
			...props
		} = this.props
		const { inView } = this.state
		return React.createElement(
			tag || `div`,
			{
				ref: el => this.el = el,
				...props,
			},
			children(inView),
		)
	}
}