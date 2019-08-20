import React from 'react'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import TagList from './tag-list'
import Pagination from '../pagination'
import formatDate from '../../utils/format-date'
import sanityToExcerpt from '../../utils/sanity-to-excerpt'

export default function PostList({
	page,
	totalPages,
	posts,
	linkPrefix,
}) {
	return <>
		<ul css={styles.list}>
			{posts.map(({
				title,
				tags,
				date,
				_rawBody: {
					en: body,
				} = {},
				slug: {
					current,
				} = {},
			}, index) => {
				return (
					<li key={`blog${index}`}>
						<h2>
							<Link to={current}>
								{title}
							</Link>
						</h2>
						<time dateTime={date}>{formatDate(date)}</time>
						<TagList tags={tags} />
						<p>{sanityToExcerpt(body, 40)}...</p>
						<div>
							<Link to={current}>
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