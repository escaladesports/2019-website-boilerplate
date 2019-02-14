import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { Helmet } from 'react-helmet'
import RouteDelayed from '../../../plugins/route-delayed-animation'
import Header from '../header'
import Footer from '../footer'
import RouteDelayedAnimation from '../route-delayed-animation'
import {
	white,
	primaryColor,
} from '../../styles/colors'
import {
	primaryFont,
	secondaryFont,
} from '../../styles/fonts'
import linkMixin from '../../styles/mixins/link'
import '../../styles/global.css'

export default class Layout extends React.Component{
	render(){
		const {
			title,
			description,
		} = this.props
		return(
			<StaticQuery
				query={graphql`
					query DefaultTemplateQuery{
						site{
							siteMetadata{
								siteTitle: title
								siteDescription: description
							}
						}
					}
				`}
				render={({
					site: {
						siteMetadata: {
							siteTitle,
							siteDescription,
						},
					},
				}) => (
					<>
						<Helmet>
							<html lang='en' />
							<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
							<meta name='description' content={description || siteDescription} />
							<meta property='og:title' content={title} />
							<meta property='og:site_name' content={siteTitle} />
						</Helmet>
						<div css={styles.layout}>
							<Header />
							<div css={styles.content}>
								<main>{this.props.children}</main>
							</div>
							<Footer />
						</div>
						<RouteDelayed>
							<RouteDelayedAnimation />
						</RouteDelayed>
					</>
				)}
			/>
		)
	}
}


const styles = {
	layout: css`
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: ${secondaryFont};
		a{
			${linkMixin};
		}
		p{
			line-height: 28px;
		}
		img{
			max-width: 100%;
			position: relative;
		}
		h1, h2, h3{
			font-family: ${primaryFont};
			text-transform: uppercase;
		}
		li{
			line-height: 1.3em;
			margin-bottom: 4px;
		}
		& ::selection{
			color: ${white};
			background-color: ${primaryColor};
		}
	`,
	content: css`
		margin: 0 auto;
		padding: 0 30px;
		max-width: 960px;
		width: 100%;
		flex: 1 0 auto;
	`,
}