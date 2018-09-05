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
				console.log(`In view`)
				this.setState({ inView: true })
			}
			else {
				console.log(`Not in view`)
				this.setState({ inView: false })
			}
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
		if (global.IntersectionObserver) {
			this.observer.unobserve(this.el)
		}
	}
	render() {
		const {
			tag,
			children,
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