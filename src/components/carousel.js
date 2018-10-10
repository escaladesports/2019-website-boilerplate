import React from 'react'
import NukaCarousel from 'nuka-carousel'
import { css, cx } from 'emotion'
import Right from '@material-ui/icons/ChevronRight'
import Left from '@material-ui/icons/ChevronLeft'
import Placeholder from './placeholder'

export default class Carousel extends React.Component {
	componentDidMount(){
		setTimeout(() => {
			if(this.carousel){
				this.carousel.setDimensions()
			}
		}, 0)
	}
	render() {
		return (
			<Placeholder ratio={[1000, 400]}>
				<NukaCarousel
					wrapAround
					transitionMode='scroll'
					slidesToScroll={1}
					ref={el => this.carousel = el}
					renderCenterRightControls={({ nextSlide }) => (
						<button onClick={nextSlide} className={styles.button}>
							<Right className={styles.icon} />
						</button>
					)}
					renderCenterLeftControls={({ previousSlide }) => (
						<button onClick={previousSlide} className={styles.button}>
							<Left className={styles.icon} />
						</button>
					)}
					renderBottomCenterControls={({ slideCount, currentSlide, goToSlide }) => (
						<div className={styles.bottomControls}>
							{function(){
								const buttons = []
								for(let i = 0; i < slideCount; i++){
									buttons.push(
										<button
											type='button'
											className={cx(
												styles.button,
												styles.bottomButton,
												currentSlide === i &&
													styles.bottomButtonActive
											)}
											onClick={() => goToSlide(i)}
											key={`slideControl${i}`}
										/>
									)
								}
								return buttons
							}()}
						</div>
					)}
				>
					{function () {
						const slides = []
						for (let i = 1; i < 7; i++) {
							slides.push(
								<Placeholder ratio={[1000, 400]} key={`slide${i}`}>
									<div className={styles.slide}>
										<img src={`http://placehold.it/1000x400/ccc/999/&text=slide${i}`} />
									</div>
								</Placeholder>
							)
						}
						return slides
					}()}
				</NukaCarousel>
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
		:hover{
			opacity: .5;
		}
	`,
	sideButton: css`
		font-size: 4em;
	`,
	bottomButton: css`
		text-indent: -9999px;
		overflow: hidden;
		white-space: nowrap;
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
	slide: css`
		cursor: default;
	`,
}