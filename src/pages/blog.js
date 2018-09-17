import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import PostList from 'components/blog/post-list'

export default class BlogPage extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges.map(edges => edges.node)
		return (
			<Layout>
				<Meta title='Blog' />
				<PostList posts={posts} />
			</Layout>
		)
	}
}

export const query = graphql`
	query BlogPage {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/blog/"
				}
			}
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