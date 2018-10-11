import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
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
				posts,
				site: {
					siteMetadata: {
						siteTitle,
					},
				},
			},
		} = this.props
		const postsList = posts.edges.map(edge => edge.node)
		const description = posts.length ? `${posts[0].excerpt.substr(0, 150)}...` : null

		return(
			<Layout title={`Posts Tagged with ${tag}`} siteTitle={siteTitle} description={description}>
				<Helmet>
					<title>{`Posts Tagged with ${tag} | ${siteTitle}`}</title>
				</Helmet>
				<h2>Tag: {tag}</h2>
				<PostList
					posts={postsList}
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
		posts: allMarkdownRemark(
			filter: {
				frontmatter: {
					tags: { in: [$tag] }
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

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
