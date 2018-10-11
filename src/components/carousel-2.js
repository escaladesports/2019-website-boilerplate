import React from 'react'
import { css, cx } from 'emotion'
import Carousel from '@brainhubeu/react-carousel'
import Right from '@material-ui/icons/ChevronRight'
import Left from '@material-ui/icons/ChevronLeft'
import '@brainhubeu/react-carousel/lib/style.css'
import Placeholder from './placeholder'

const slides = [
	<img key='slide1' src={`http://placehold.it/1000x400/ccc/999/&text=slide1`} />,
	<img key='slide2' src={`http://placehold.it/1000x400/ccc/999/&text=slide2`} />,
	<img key='slide3' src={`http://placehold.it/1000x400/ccc/999/&text=slide3`} />,
]
const slideTotal = slides.length

export default class CarouselComp extends React.Component {
	static defaultProps = {
		width: 1000,
		height: 400,
	}
	constructor(props){
		super(props)
		this.state = {
			onSlide: 0,
		}
		this.nextSlide = this.nextSlide.bind(this)
		this.previousSlide = this.previousSlide.bind(this)
	}
	componentDidMount(){
		console.log(this.carousel)
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
		const moduloItem = this.calculateButtonValue() % slideTotal
		const onSlide = this.state.onSlide - (moduloItem - n)
		this.setState({ onSlide })
	}
	calculateButtonValue(){
		const { onSlide } = this.state
		return onSlide >= 0
			? onSlide
			: onSlide + slideTotal * Math.ceil(Math.abs(onSlide / slideTotal))
	}
	render() {
		const { width, height } = this.props
		return (
			<Placeholder ratio={[width, height]}>
				<Carousel
					infinite
					value={this.state.onSlide}
					onChange={onSlide => this.setState({ onSlide })}
					slides={slides}
					className={styles.carousel}
					ref={el => this.carousel = el}
				/>
				<button
					onClick={this.previousSlide}
					className={cx(styles.button, styles.left)}
				>
					<Left className={styles.icon} />
				</button>
				<button
					onClick={this.nextSlide}
					className={cx(styles.button, styles.right)}
				>
					<Right className={styles.icon} />
				</button>
				<div className={styles.bottomControls}>
					{(() => {
						const buttons = []
						let onSlide = this.calculateButtonValue()
						while (onSlide > slideTotal - 1){
							onSlide -= slideTotal
						}
						for (let i = 0; i < slideTotal; i++) {
							buttons.push(
								<button
									type='button'
									className={cx(
										styles.button,
										styles.bottomButton,
										onSlide === i &&
											styles.bottomButtonActive
									)}
									onClick={() => this.goToSlide(i)}
									key={`slideControl${i}`}
								/>
							)
						}
						return buttons
					})()}
				</div>
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