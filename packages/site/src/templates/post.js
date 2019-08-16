import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'
import { css } from '@emotion/core'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layouts/default'
import TagList from '../components/blog/tag-list'
import CommentForm from '../components/comment-form'
import Comments from '../components/comments'
import formatDate from '../utils/format-date'
import sanityToExcerpt from '../utils/sanity-to-excerpt'
import serializers from '../utils/sanity-serializers'

export default function PostTemplate({
	pageContext: {
		id,
		nextId,
		previousId,
		slug,
	},
	data: {
		sanityPost: {
			_rawBody: {
				en: body,
			},
			title,
			tags,
			date,
			image: {
				asset: {
					fluid: image,
				},
				caption,
			},
		},
		comments: commentsList,
		next,
		previous,
	},
}){

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

	const nextPost = (id === nextId) ? false : next
	const previousPost = (id === previousId) ? false : previous

	return(
		<Layout title={title} description={sanityToExcerpt(body)}>
			{!!image && (
				<Helmet>
					<meta
						property='og:image'
						content={image.src}
					/>
				</Helmet>
			)}
			<h1>{title}</h1>
			<time dateTime={date}>{formatDate(date)}</time>
			<TagList tags={tags} />
			{!!image && (
				<Img fluid={image} alt={caption} />
			)}
			<BlockContent blocks={body} serializers={serializers} />
			<div>
				{nextPost && (
					<div css={styles.next}>
						<Link to={nextPost.slug.current}>
							Next Post: {nextPost.title}
						</Link>
					</div>
				)}
				{previousPost && (
					<div>
						<Link to={previousPost.slug.current}>
							Previous Post: {previousPost.title}
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
		sanityPost(
			id: { eq: $id }
		){
			_rawBody
			title
			tags
			image{
				asset{
					fluid(maxWidth: 900) {
						...GatsbySanityImageFluid
					}
				}
				caption
			}
			date
		}
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
