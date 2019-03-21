import React from 'react'
import { css } from '@emotion/core'
import Carousel from '@brainhubeu/react-carousel'
import Right from '@material-ui/icons/ChevronRight'
import Left from '@material-ui/icons/ChevronLeft'
import '@brainhubeu/react-carousel/lib/style.css'
import Placeholder from './placeholder'

export default class CarouselComp extends React.Component {
	static defaultProps = {
		ratio: [1000, 400],
	}
	constructor(props){
		super(props)
		this.state = {
			onSlide: 0,
		}
		this.nextSlide = this.nextSlide.bind(this)
		this.previousSlide = this.previousSlide.bind(this)
	}
	nextSlide(){
		let onSlide = this.state.onSlide + 1
		this.setState({ onSlide })
	}
	previousSlide() {
		let onSlide = this.state.onSlide - 1
		this.setState({ onSlide })
	}
	goToSlide(n){
		const slideTotal = this.getSlides().length
		const moduloItem = this.calculateButtonValue() % slideTotal
		const onSlide = this.state.onSlide - (moduloItem - n)
		this.setState({ onSlide })
	}
	calculateButtonValue(){
		const slideTotal = this.getSlides().length
		const { onSlide } = this.state
		return onSlide >= 0
			? onSlide
			: onSlide + slideTotal * Math.ceil(Math.abs(onSlide / slideTotal))
	}
	getSlides(){
		const { children } = this.props
		return Array.isArray(children) ? children : [children]
	}
	render() {
		const { ratio } = this.props
		const slides = this.getSlides()
		const slideTotal = slides.length
		return (
			<Placeholder ratio={ratio}>
				<Carousel
					infinite
					value={this.state.onSlide}
					onChange={onSlide => this.setState({ onSlide })}
					slides={slides}
					ref={el => this.carousel = el}
				/>
				{slideTotal > 1 && <>
					<button
						onClick={this.previousSlide}
						css={[styles.button, styles.left]}
					>
						<span>left</span>
						<Left css={styles.icon} />
					</button>
					<button
						onClick={this.nextSlide}
						css={[styles.button, styles.right]}
					>
						<span>right</span>
						<Right css={styles.icon} />
					</button>
					<div css={styles.bottomControls}>
						{(() => {
							const buttons = []
							let onSlide = this.calculateButtonValue()
							while (onSlide > slideTotal - 1) {
								onSlide -= slideTotal
							}
							for (let i = 0; i < slideTotal; i++) {
								buttons.push(
									<button
										type='button'
										css={[
											styles.button,
											styles.bottomButton,
											onSlide === i &&
											styles.bottomButtonActive,
										]}
										onClick={() => this.goToSlide(i)}
										key={`slideControl${i}`}
									>
										<span>Slide {i}</span>
									</button>
								)
							}
							return buttons
						})()}
					</div>
				</>}
			</Placeholder>
		)
	}
}


const circleSize = 14
const arrowSize = 40

const styles = {
	bottomControls: css`
		margin-bottom: 10px;
		display: none;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		@media(min-width: 800px){
			display: block;
		}
	`,
	button: css`
		appearance: none;
		border: 0;
		background: transparent;
		outline: none;
		cursor: pointer;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
		span{
			position: absolute;
			color: transparent;
			left: -1000px;
		}
		:hover{
			opacity: .5;
		}
	`,
	left: css`
		left: 0;
	`,
	right: css`
		right: 0;
	`,
	bottomButton: css`
		padding: 6px 5px;
		position: relative;
		overflow: hidden;
		span: {
			position: absolute;
		}
		:before{
			display: block;
			content: "";
			background: #999;
			width: ${circleSize}px;
			height: ${circleSize}px;
			border-radius: 100%;
		}
	`,
	bottomButtonActive: css`
		cursor: default;
		:before{
			background-color: #333;
		}
		:hover{
			opacity: 1;
		}
	`,
	icon: css`
		width: ${arrowSize}px !important;
		height: ${arrowSize}px !important;
		fill: #333 !important;
	`,
}