import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'
import TagList from 'components/blog/tag-list'

export default class PostList extends React.Component {
	render() {
		return (
			<ul className={styles.list}>
				{this.props.posts.map(({ excerpt, frontmatter}, index) => {
					const { title, path, tags, date, formattedDate } = frontmatter
					return (
						<li key={`blog${index}`}>
							<h2>
								<Link to={`/blog/${path}`}>
									{title}
								</Link>
							</h2>
							<time dateTime={date}>{formattedDate}</time>
							<TagList tags={tags} />
							<p>{excerpt}</p>
							<div>
								<Link to={`/blog/${path}`}>
									Read More
								</Link>
							</div>
						</li>
					)
				})}
			</ul>
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
}