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
				allContentfulPost,
			},
		} = this.props
		const posts = allContentfulPost.edges.map(edges => edges.node)
		const description = posts.length ? posts[0].body.childMarkdownRemark.excerpt : null

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

		allContentfulPost(
			skip: $skip,
			limit: $limit,
			sort: { order: DESC, fields: [date] }
		){
			edges{
				node{
					title
					tags{
						name
						slug
					}
					date
					fields{
						path
					}
					body{
						childMarkdownRemark{
							excerpt(pruneLength: 175)
						}
					}
				}
			}
		}
	}
`