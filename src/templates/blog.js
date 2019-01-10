import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'
import PostList from '../components/blog/post-list'

export default class BlogPage extends React.Component {
	render() {
		const {
			pageContext: {
				page,
				totalPages,
			},
			data: {
				allMarkdownRemark,
			},
		} = this.props
		const posts = allMarkdownRemark.edges.map(edges => edges.node)
		const description = posts.length ? `${posts[0].excerpt.substr(0, 150)}...` : null

		return (
			<Layout title='Blog' description={description}>
				<PostList
					posts={posts}
					page={page}
					totalPages={totalPages}
					linkPrefix='/blog'
				/>
			</Layout>
		)
	}
}

export const query = graphql`
	query BlogPage($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/blog/"
				}
				fields: {
					published: { eq: true }
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
						title
						tags,
						date,
					}
					fields{
						path
					}
				}
			}
		}
	}
`