import React from 'react'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import TagList from './tag-list'
import Pagination from '../pagination'
import formatDate from '../../functions/format-date'

export default class PostList extends React.Component {
	render() {
		const {
			page,
			totalPages,
			posts,
			linkPrefix,
		} = this.props
		return (
			<>
				<ul css={styles.list}>
					{posts.map(({ excerpt, fields, frontmatter }, index) => {
						const { title, tags, date } = frontmatter
						const { path } = fields
						return (
							<li key={`blog${index}`}>
								<h2>
									<Link to={path}>
										{title}
									</Link>
								</h2>
								<time dateTime={date}>{formatDate(date)}</time>
								<TagList tags={tags} />
								<p>{excerpt}</p>
								<div>
									<Link to={path}>
										Read More
									</Link>
								</div>
							</li>
						)
					})}
				</ul>
				{totalPages > 1 &&
					<div css={styles.pagination}>
						<Pagination
							page={page}
							totalPages={totalPages}
							linkPrefix={linkPrefix}
						/>
					</div>
				}
			</>
		)
	}
}

const styles = {
	list: css`
		list-style-type: none;
		margin: 0;
		padding: 0;
		> li{
			margin-bottom: 60px;
			:last-of-type{
				margin-bottom: 0;
			}
		}
	`,
	pagination: css`
		margin-top: 30px;
	`,
}