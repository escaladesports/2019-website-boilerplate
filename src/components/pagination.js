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
		return (
			<ul className={styles.list}>
				{paginationModel.map((data, key) => (
					<li key={`page${key}`}>
						{data.type === `PAGE` && data.isActive && data.value}
						{data.type === `PAGE` && !data.isActive && (
							<Link to={this.getLink(data.value)}>{data.value}</Link>
						)}
						{data.type !== `PAGE` && (
							<span>...</span>
						)}
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
	`,
}