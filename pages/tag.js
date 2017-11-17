import React from 'react'
import Layout from 'components/_layout'
import moment from 'moment'
import getTag from 'utils/posts/get-tag'
import TagLinks from 'components/posts/tag-links'

export default class extends React.Component {
	static async getInitialProps(req) {
		const posts = getTag(req.query.id)
		console.log(posts)
		return {
			posts: posts
		}
	}
	render(){
		return(
			<Layout>
				<div>
					{this.props.posts.map((post, key) => {
						return <article key={key}>
							<h2>{post.title}</h2>
							<small>{moment(post.date).format('MMMM Do YYYY')}</small>
							<p>{post.excerpt}</p>
							<TagLinks tags={post.tags} />
						</article>
					})}
				</div>
			</Layout>
		)
	}
}