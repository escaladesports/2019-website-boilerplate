import React from 'react'
import { css } from '@emotion/core'
import { white } from '../styles/colors'

export default class Modal extends React.Component{
	render(){
		return (
			<div
				css={styles.bg}
				style={{ display: this.props.open ? `block` : `none` }}
				onClick={this.props.onClose}
			>
				<div css={styles.dialog} onClick={stopPropagation}>
					<div className='close' css={styles.close} onClick={this.props.onClose}>
						×
					</div>
					<div css={styles.content}>
						{this.props.children}
					</div>
				</div>
				{this.props.open && (
					<style dangerouslySetInnerHTML={{__html: `body{overflow:hidden}`}} />
				)}
			</div>
		)
	}
}

function stopPropagation(e){
	e.stopPropagation()
}

const modalPadding = 15
const closeSize = 30
const maxWidth = 900

const styles = {
	bg: css`
		background: rgba(0, 0, 0, .4);
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 999;
		overflow-y: auto;
	`,
	dialog: css`
		background: ${white};
		position: absolute;
		min-height: 100%;
		width: 100%;
		padding: ${modalPadding}px;
		@media(min-width: ${maxWidth}px){
			top: 30px;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: 30px;
			max-width: ${maxWidth}px;
			min-height: 0;
		}
	`,
	close: css`
		cursor: pointer;
		position: absolute;
		font-size: ${closeSize}px;
		line-height: ${closeSize}px;
		top: ${modalPadding}px;
		right: ${modalPadding}px;
	`,
	content: css`
		margin-top: ${modalPadding * 2}px;
	`,
}