import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import TagList from 'components/blog/tag-list'

export default class PostTemplate extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.post
		const {
			title,
			tags,
			date,
			formattedDate,
		} = frontmatter

		const { id, nextId, previousId } = this.props.pageContext
		let next = false
		let previous = false
		if(id !== nextId){
			next = this.props.data.next
		}
		if(id !== previousId){
			previous = this.props.data.previous
		}

		return(
			<Layout>
				<Meta
					title={title}
					description={excerpt}
				/>
				<h1>{title}</h1>
				<time dateTime={date}>{formattedDate}</time>
				<TagList tags={tags} />
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<div>
					{next && (
						<div className={styles.next}>
							<Link to={`/blog/${next.frontmatter.path}`}>
								Next Post: {next.frontmatter.title}
							</Link>
						</div>
					)}
					{previous && (
						<div>
							<Link to={`/blog/${previous.frontmatter.path}`}>
								Previous Post: {previous.frontmatter.title}
							</Link>
						</div>
					)}
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
				tags,
				date,
				formattedDate: date(formatString: "MMMM DD, YYYY")
			}
		}

		previous: markdownRemark(
			id: { eq: $previousId }
		){
			frontmatter{
				title
				path
			}
		}

		next: markdownRemark(
			id: { eq: $nextId }
		){
			frontmatter{
				title
				path
			}
		}
	}
`
