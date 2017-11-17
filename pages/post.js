'use strict'
import React from 'react'
import Head from 'next/head'
import Layout from 'components/_layout'
import moment from 'moment'
import TagLinks from 'components/posts/tag-links'
import getPost from 'utils/posts/get-post'

export default class extends React.Component {
	static async getInitialProps(req) {
		return getPost(req.query.id)
	}
	render(){
		return(
			<Layout title={ this.props.title }>
				<article>
					<h2>
						{this.props.title}
					</h2>
					<small>{moment(this.props.date).format('MMMM Do YYYY')}</small>
					<div className='content' dangerouslySetInnerHTML={{ __html: this.props.contents }} />
					<TagLinks tags={this.props.tags} />
				</article>
				<style jsx>{`
					small{
						font-family: 'IM Fell Double Pica SC', serif;
						display: block;
						font-size: .9em;
					}
					h2{
						margin-top: 0;
						margin-bottom: 2px;
					}
					.content{
						margin: 20px 0;
					}
				`}</style>
			</Layout>
		)
	}
}