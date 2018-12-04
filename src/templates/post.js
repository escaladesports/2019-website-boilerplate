import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layouts/default'
import TagList from '../components/blog/tag-list'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import formatDate from '../functions/format-date'

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
					title,
					tags,
					date,
					coverImage,
					body: {
						childMarkdownRemark: {
							html,
							excerpt,
						},
					},
				},
				allContentfulComment: {
					edges: comments,
				},
			},
		} = this.props

		const next = (id === nextId) ? false : this.props.data.next
		const previous = (id === previousId) ? false : this.props.data.previous

		return(
			<Layout title={title} description={excerpt}>
				{!!coverImage && (
					<Helmet>
						<meta property='og:image' content={coverImage.src} />
					</Helmet>
				)}
				<h1>{title}</h1>
				<time dateTime={date}>{formatDate(date)}</time>
				<TagList tags={tags} />
				{!!coverImage && (
					<Img fluid={coverImage.fluid} alt={title} />
				)}
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<div>
					{next && (
						<div className={styles.next}>
							<Link to={`/post/${next.slug}`}>
								Next Post: {next.title}
							</Link>
						</div>
					)}
					{previous && (
						<div>
							<Link to={`/post/${previous.slug}`}>
								Previous Post: {previous.title}
							</Link>
						</div>
					)}
				</div>
				<div className={styles.comments}>
					<Comments comments={comments || []} />
				</div>
				<div className={styles.commentForm}>
					<h3>Leave a comment:</h3>
					<CommentForm slug={slug} />
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
	comments: css`
		margin: 60px 0 30px 0;
	`,
	commentForm: css`
		margin-bottom: 30px;
	`,
}

export const query = graphql`
	query PostTemplate($id: String!, $previousId: String!, $nextId: String!) {

		post: contentfulPost(
			id: { eq: $id }
		){
			title
			tags{
				name
				slug
			}
			coverImage{
				fluid(maxWidth: 900, quality: 90){
					...GatsbyContentfulFluid
				}
			}
			date
			body{
				childMarkdownRemark{
					html
					excerpt(pruneLength: 175)
				}
			}
		}

		previous: contentfulPost(
			id: { eq: $previousId }
		){
			title
			slug
		}

		next: contentfulPost(
			id: { eq: $nextId }
		){
			title
			slug
		}

		allContentfulComment(
			filter: {
				page: {
					id: { eq: $id }
				}
			}
			sort: { order: DESC, fields: [date] }
		){
			edges{
				node{
					comment{
						childMarkdownRemark{
							html
						}
					}
					md5
					name
					date
				}
			}
		}

	}
`
