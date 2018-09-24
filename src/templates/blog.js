import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'
import PostList from '../components/blog/post-list'

export default class BlogPage extends React.Component {
	render() {
		const posts = this.props.data.page.edges.map(edges => edges.node)
		const description = posts.length ? `${posts[0].excerpt.substr(0, 150)}...` : null
		const { page, totalPages } = this.props.pageContext

		return (
			<Layout>
				<Helmet>
					<title>{`Blog | ${this.props.data.site.frontmatter.siteTitle}`}</title>
					<meta name='description' content={description} />
				</Helmet>
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
		page: allMarkdownRemark(
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
						formattedDate: date(formatString: "MMMM DD, YYYY")
					}
					fields{
						path
					}
				}
			}
		}

		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
			}
		}
	}
`