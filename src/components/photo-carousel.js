import React from 'react'
import { css, cx } from 'emotion'
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
		const slideTotal = this.props.slides.length
		const moduloItem = this.calculateButtonValue() % slideTotal
		const onSlide = this.state.onSlide - (moduloItem - n)
		this.setState({ onSlide })
	}
	calculateButtonValue(){
		const slideTotal = this.props.slides.length
		const { onSlide } = this.state
		return onSlide >= 0
			? onSlide
			: onSlide + slideTotal * Math.ceil(Math.abs(onSlide / slideTotal))
	}
	render() {
		const { ratio, slides } = this.props
		const { onSlide } = this.state
		const slideTotal = slides.length
		const slideValue = this.calculateButtonValue() % slideTotal
		const thumbnailsPerPage = 8
		return <>
			<Placeholder ratio={ratio}>
				<Carousel
					infinite
					value={onSlide}
					onChange={onSlide => this.setState({ onSlide })}
					slides={slides.map((slide, index) => (
						<Placeholder key={`slide${index}`} ratio={ratio}>
							{slide}
						</Placeholder>

					))}
					className={styles.carousel}
					ref={el => this.carousel = el}
				/>
				{slideTotal > 1 && <>
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
				</>}
			</Placeholder>
			<div className={styles.thumbnails}>
				<Carousel
					value={slideValue}
					slidesPerPage={thumbnailsPerPage}
					slides={slides.map((slide, index) => (
						<Placeholder
							key={`thumbnail${index}`}
							className={cx(styles.thumbnail, index === slideValue && styles.activeThumbnail)}
							ratio={ratio}
							onClick={() => this.goToSlide(index)}
						>
							{slide}
						</Placeholder>
					))}
				/>
			</div>
		</>
	}
}

const arrowSize = 40

const styles = {
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
	icon: css`
		width: ${arrowSize}px !important;
		height: ${arrowSize}px !important;
		fill: #333 !important;
	`,
	thumbnails: css`
		margin-top: 30px;
	`,
	thumbnail: css`
		border: 1px solid transparent;
	`,
	activeThumbnail: css`
		border-color: #333;
	`,
}