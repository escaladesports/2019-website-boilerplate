import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'
import PostList from '../components/blog/post-list'

export default class TagsTemplate extends React.Component{
	render(){
		const {
			pageContext: {
				tag,
				page,
				totalPages,
			},
			data: {
				allContentfulPost,
			},
		} = this.props

		const posts = allContentfulPost.edges.map(edge => edge.node)
		const description = posts.length ? posts[0].body.childMarkdownRemark.excerpt : null

		return(
			<Layout title={`Posts Tagged with ${tag}`} description={description}>
				<h2>Tag: {tag}</h2>
				<PostList
					posts={posts}
					page={page}
					totalPages={totalPages}
					linkPrefix={`/blog/tags/${tag}`}
				/>
			</Layout>
		)
	}
}

export const query = graphql`
	query TagsTemplate($tag: String!, $skip: Int!, $limit: Int!) {

		allContentfulPost(
			filter: {
				tags: {
					elemMatch: {
						slug: {
							in: [$tag]
						}
					}
				}
			}
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
