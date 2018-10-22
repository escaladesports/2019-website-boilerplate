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
		breakpoints: [
			[0, 3],
			[400, 5],
			[700, 7],
			[1200, 9],
		],
	}
	constructor(props){
		super(props)
		this.state = {
			onSlide: 0,
			thumbnailsPerPage: props.breakpoints[0][1],
		}
		this.nextSlide = this.nextSlide.bind(this)
		this.previousSlide = this.previousSlide.bind(this)
		this.calculateBreakpoint = this.calculateBreakpoint.bind(this)
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
	calculateBreakpoint(){
		const w = window.innerWidth
		let thumbnailsPerPage
		this.props.breakpoints.forEach(([breakpoint, n]) => {
			if(w >= breakpoint){
				thumbnailsPerPage = n
			}
		})
		this.setState({ thumbnailsPerPage })
	}
	componentDidMount(){
		this.calculateBreakpoint()
		window.addEventListener(`resize`, this.calculateBreakpoint)
	}
	componentWillUnmount(){
		window.removeEventListener(`resize`, this.calculateBreakpoint)
	}
	render() {
		const { ratio, slides } = this.props
		const { onSlide, thumbnailsPerPage } = this.state
		const slideTotal = slides.length
		const slideValue = this.calculateButtonValue() % slideTotal
		const thumbnailsMax = slideTotal - thumbnailsPerPage
		let thumbnailsPage = slideValue - Math.floor(thumbnailsPerPage / 2)
		if (thumbnailsPage < 0){
			thumbnailsPage = 0
		}
		else if (thumbnailsPage > thumbnailsMax){
			thumbnailsPage = thumbnailsMax
		}
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
					value={thumbnailsPage}
					slidesPerPage={thumbnailsPerPage}
					slides={slides.map((slide, index) => (
						<Placeholder
							role='button'
							key={`thumbnail${index}`}
							ratio={ratio}
							className={cx(
								styles.thumbnail,
								index === slideValue && styles.activeThumbnail
							)}
						>
							<button
								className={styles.button}
								onClick={() => this.goToSlide(index)}
							>
								{slide}
							</button>
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
		:focus, :hover{
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