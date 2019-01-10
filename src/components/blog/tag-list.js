import React from 'react'
import Link from 'gatsby-link'
import { css } from '@emotion/core'

export default class TagList extends React.Component {
	render() {
		return (
			<ul css={styles.list}>
				<li>Tags:</li>
				{this.props.tags && this.props.tags.map((tag, index) => (
					<li key={`tag${index}`}>
						<Link to={`/blog/tags/${tag}`}>
							{tag}
						</Link>
					</li>
				))}
			</ul>
		)
	}
}

const styles = {
	list: css`
		list-style-type: none;
		margin: 0;
		padding: 0;
		li{
			display: inline-block;
			margin-right: 10px;
			:last-of-type{
				margin-right: 0;
			}
		}
	`,
}