import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Img from '../components/netlify-image'
import Layout from '../components/layouts/default'
import TagList from '../components/blog/tag-list'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import { siteUrl } from '../../site-config'
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
					frontmatter: {
						title,
						tags,
						date,
						image,
						imageDesc,
					},
					html,
					excerpt,
				},
				comments: commentsList,
			},
		} = this.props

		let comments = []
		if(commentsList){
			comments = commentsList.edges.map(({ node: {
				html,
				frontmatter: {
					md5,
					name,
					date,
				},
			} }) => ({
				html,
				md5,
				name,
				date,
			}))
		}

		const next = (id === nextId) ? false : this.props.data.next
		const previous = (id === previousId) ? false : this.props.data.previous

		return(
			<Layout title={title} description={excerpt}>
				{!!image && (
					<Helmet>
						<meta
							property='og:image'
							content={`${siteUrl}${image}?nf_resize=fit&w=900`}
						/>
					</Helmet>
				)}
				<h1>{title}</h1>
				<time dateTime={date}>{formatDate(date)}</time>
				<TagList tags={tags} />
				{!!image && (
					<Img
						src={image}
						ratio={[900, 600]}
						alt={imageDesc}
					/>
				)}
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<div>
					{next && (
						<div css={styles.next}>
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
				<div css={styles.comments}>
					<Comments comments={comments} />
				</div>
				<div css={styles.commentForm}>
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
				imageDesc
				date
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
				fileAbsolutePath: { regex: "/src/markdown/comments/" },
				frontmatter: {
					slug: { eq: $slug },
					published: { eq: true }
				}
			},
			sort: { order: ASC, fields: [frontmatter___date] }
		){
			edges{
				node{
					html
					frontmatter{
						md5
						name: title
						date
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
	}
`
