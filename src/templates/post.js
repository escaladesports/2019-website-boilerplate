import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
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
		const { siteTitle } = this.props.data.site.frontmatter

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
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
					<meta name='description' content={excerpt} />
				</Helmet>
				<h1>{title}</h1>
				<time dateTime={date}>{formattedDate}</time>
				<TagList tags={tags} />
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

		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
			}
		}
	}
`
