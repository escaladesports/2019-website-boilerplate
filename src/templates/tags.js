import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import PostList from 'components/blog/post-list'
import Pagination from 'components/pagination'

export default class TagsTemplate extends React.Component{
	render(){
		const { tag, page, totalPages } = this.props.pageContext
		const posts = this.props.data.allMarkdownRemark.edges.map(edge => edge.node)

		return(
			<Layout>
				<Meta
					title={`Posts Tagged with ${tag}`}
					description={posts[0].excerpt}
				/>
				<h2>Tag: {tag}</h2>
				<PostList posts={posts} />
				<div className={styles.pagination}>
					<Pagination
						page={page}
						totalPages={totalPages}
						linkPrefix={`/blog/tags/${tag}`}
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
	query TagsTemplate($tag: String!, $skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			filter: {
				frontmatter: {
					tags: { in: [$tag] }
				}
			}
			skip: $skip,
			limit: $limit,
			sort: { order: DESC, fields: [frontmatter___date] }
		){
			edges{
				node{
					excerpt(pruneLength: 175)
					frontmatter{
						title
						tags
					}
					fields{
						path
					}
				}
			}
		}
	}
`
