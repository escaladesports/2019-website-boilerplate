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
				site: {
					siteMetadata: {
						siteTitle,
					},
				},
			},
		} = this.props

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
					<CommentForm />
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
	query PostTemplate($id: String!, $previousId: String!, $nextId: String!) {
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
