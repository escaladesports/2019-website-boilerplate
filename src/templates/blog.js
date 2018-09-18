import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import PostList from 'components/blog/post-list'
import Pagination from 'components/pagination'

export default class BlogPage extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges.map(edges => edges.node)
		const description = posts.length ? `${posts[0].excerpt.substr(0, 150)}...` : null
		const { page, totalPages } = this.props.pageContext

		return (
			<Layout>
				<Meta
					title='Blog'
					description={description}
				/>
				<PostList posts={posts} />
				<div className={styles.pagination}>
					<Pagination
						page={page}
						totalPages={totalPages}
						linkPrefix='/blog'
					/>
				</div>
			</Layout>
		)
	}
}

const styles = {
	pagination: css`
		margin-top: 30px;
	`,
}

export const query = graphql`
	query BlogPage($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/blog/"
				}
			}
			skip: $skip,
			limit: $limit,
			sort: { order: DESC, fields: [frontmatter___date] }
		){
			edges{
				node{
					excerpt(pruneLength: 250)
					frontmatter{
						path
						title
						tags,
						date,
						formattedDate: date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}
	}
`