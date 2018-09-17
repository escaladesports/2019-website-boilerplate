import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'
import { getPaginationModel } from 'ultimate-pagination'

export default class Footer extends React.Component{
	static defaultProps = {
		numberfirst: false,
	}
	getLink(n){
		const { numberFirst, linkPrefix } = this.props
		if (!numberFirst && n === 1){
			return linkPrefix
		}
		return `${linkPrefix}/${n}`
	}
	render() {
		const {
			page,
			totalPages,
		} = this.props
		const paginationModel = getPaginationModel({
			currentPage: page,
			totalPages,
			boundaryPagesRange: 2,
			siblingPagesRange: 2,
			hidePreviousAndNextPageLinks: true,
			hideFirstAndLastPageLinks: true,
		})
		const previous = page > 1 ? page - 1 : false
		const next = page < totalPages ? page + 1 : false
		return (
			<ul className={styles.list}>
				{previous && (
					<li><Link to={this.getLink(previous)}>Previous</Link></li>
				)}
				{paginationModel.map(({ type, isActive, value }, key) => (
					<li key={`page${key}`}>
						{type === `PAGE` && isActive && value}
						{type === `PAGE` && !isActive && (
							<Link to={this.getLink(value)}>{value}</Link>
						)}
						{type !== `PAGE` && (
							<span>...</span>
						)}
					</li>
				))}
				{next && (
					<li><Link to={this.getLink(next)}>Next</Link></li>
				)}
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