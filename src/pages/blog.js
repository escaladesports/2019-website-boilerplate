import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'

export default class BlogPage extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges.map(
			({ node }) => {
				const { excerpt, frontmatter } = node
				return {
					excerpt,
					...frontmatter,
				}
			}
		)
		return (
			<Layout>
				<Meta title='Blog' />
				{posts.map(({ title, path, tags, date, formattedDate, excerpt }, index) => (
					<div key={`blog${index}`}>
						<h2>
							<Link to={`/blog/${path}`}>
								{title}
							</Link>
						</h2>
						<time dateTime={date}>{formattedDate}</time>
						<ul>
							{tags.map((tag, index) => (
								<li key={`tag${index}`}>
									<Link to={`/blog/tag/${tag}`}>
										{tag}
									</Link>
								</li>
							))}
						</ul>
						<p>{excerpt}</p>
						<div>
							<Link to={`/blog/${path}`}>
								Read More
							</Link>
						</div>
					</div>
				))}
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