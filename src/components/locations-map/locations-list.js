import React from 'react'
import { css } from '@emotion/core'

export default class LocationsList extends React.Component{
	render(){
		return (
			<div css={styles.locationSection}>
				{this.props.locations.map((l, key) => (
					<div
						key={`loc-${key}`}
						css={styles.location}
						onClick={() => this.props.zoomToLocation(l.lat, l.lng)}
					>
						<b>{l.title}</b><br />
						{l.address}<br />
						{`${l.city}, ${l.state} ${l.zip}`}
					</div>
				))}
			</div>
		)
	}
}

const styles = {
	locationSection: css`
		padding: 20px 0;
		@media(min-width: 900px){
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			width: 100%;
		}
	`,
	location: css`
		padding: 20px 0;
		cursor: pointer;
		@media(min-width: 900px){
			display: flex;
			flex-direction: column;
			flex-basis: 100%;
			flex: 1;
		}
	`,
}