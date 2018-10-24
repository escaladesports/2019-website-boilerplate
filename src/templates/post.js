import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import { Cloudinary } from 'cloudinary-core'
import Img from '../components/cloudinary-image'
import Lazy from '../components/lazy-load'
import Layout from '../components/layouts/default'
import TagList from '../components/blog/tag-list'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import { cloudinaryName } from '../../site-config'

const cl = new Cloudinary({
	cloud_name: cloudinaryName,
	secure: true,
})

export default class PostTemplate extends React.Component{
	render(){

		const {
			pageContext: {
				id,
				nextId,
				previousId,
				slug,
			},
			data: {
				post: {
					frontmatter: {
						title,
						tags,
						date,
						formattedDate,
						image,
					},
					html,
					excerpt,
				},
				comments: {
					edges: commentsList,
				},
				site: {
					siteMetadata: {
						siteTitle,
					},
				},
			},
		} = this.props

		const comments = commentsList.map(({ node: {
			html,
			frontmatter: {
				email,
				name,
				date,
			},
		}}) => ({
			html,
			email,
			name,
			date,
			formattedDate,
		}))

		const next = (id === nextId) ? false : this.props.data.next
		const previous = (id === previousId) ? false : this.props.data.previous

		return(
			<Layout title={title} siteTitle={siteTitle} description={excerpt}>
				{!!image && (
					<Helmet>
						<meta property='og:image' content={cl.url(image, {
							width: 900,
							crop: `scale`,
						})} />
					</Helmet>
				)}
				<h1>{title}</h1>
				<time dateTime={date}>{formattedDate}</time>
				<TagList tags={tags} />
				{!!image && (
					<Lazy ratio={[515, 343]}>
						<Img id={image} alt={title} />
					</Lazy>
				)}
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<div>
					{next && (
						<div className={styles.next}>
							<Link to={next.fields.path}>
								Next Post: {next.frontmatter.title}
							</Link>
						</div>
					)}
					{previous && (
						<div>
							<Link to={previous.fields.path}>
								Previous Post: {previous.frontmatter.title}
							</Link>
						</div>
					)}
				</div>
				<div className={styles.commentForm}>
					<h3>Leave a comment:</h3>
					<CommentForm slug={slug} />
				</div>
				<div className={styles.comments}>
					<Comments comments={comments} />
				</div>
			</Layout>
		)
	}
}

const styles = {
	next: css`
		@media(min-width: 600px){
			float: right;
		}
	`,
	commentForm: css`
		margin-top: 30px;
	`,
}

export const query = graphql`
	query PostTemplate($id: String!, $previousId: String!, $nextId: String!, $slug: String!) {

		post: markdownRemark(
			id: { eq: $id }
		){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
				tags
				image
				date
				formattedDate: date(formatString: "MMMM DD, YYYY")
			}
		}

		previous: markdownRemark(
			id: { eq: $previousId }
		){
			frontmatter{
				title
			}
			fields{
				path
			}
		}

		comments: allMarkdownRemark(
			filter: {
				fileAbsolutePath: { regex: "/markdown/comments/" },
				frontmatter: {
					slug: { eq: $slug },
					published: { eq: true }
				}
			}
		){
			edges{
				node{
					html
					frontmatter{
						email
						name
						date
						formattedDate: date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}

		next: markdownRemark(
			id: { eq: $nextId }
		){
			frontmatter{
				title
			}
			fields{
				path
			}
		}

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
