import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import PostList from 'components/blog/post-list'

export default class TagsTemplate extends React.Component{
	render(){
		const { tag } = this.props.pageContext
		const posts = this.props.data.allMarkdownRemark.edges.map(edge => edge.node)
		console.log(posts)
		return(
			<Layout>
				<Meta
					title={`Posts Tagged with ${tag}`}
					description={posts[0].excerpt}
				/>
				<h2>Tag: {tag}</h2>
				<PostList posts={posts} />
			</Layout>
		)
	}
}

export const query = graphql`
	query TagsTemplate($tag: String!) {
		allMarkdownRemark(
			filter: {
				frontmatter: {
					tags: { in: [$tag] }
				}
			}
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
