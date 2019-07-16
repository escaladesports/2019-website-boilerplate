import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { Helmet } from 'react-helmet'
import { Cart } from '@escaladesports/zygote-cart'
import * as escaApi from '@escaladesports/zygote-plugin-esca-api'
import * as standardPayment from '@escaladesports/zygote-cart/dist/plugins/zygote-plugin-standard-billing'
import Header from '../header'
import Footer from '../footer'
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
import 'typeface-open-sans'
import 'typeface-oswald'

export default function Layout({
	title,
	description,
	children,
}) {
	const {
		site: {
			siteMetadata: {
				siteTitle,
				siteDescription,
			},
		},
	} = useStaticQuery(graphql`
		query DefaultTemplateQuery{
			site{
				siteMetadata{
					siteTitle: title
					siteDescription: description
				}
			}
		}
	`)

	return <>
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
				<main>{children}</main>
			</div>
			<Footer />
		</div>
		<Cart
			styles={{
				zIndex: 9999,
				borderColor: `#28cefc`,
				primaryColor: `#28cefc`,
				overlayColor: `rgba(40,206,252,0.7)`,
			}}
			header={<h1>Project Boilerplate</h1>}
			infoWebhook='/api/inventory/load'
			splitName={true}
			plugins={[
				standardPayment,
				escaApi,
			]}
			totalModifications={[
				{
					id: `shipping`,
					description: `Shipping`,
					displayValue: `-`,
				},
				{
					id: `tax`,
					description: `Tax`,
					displayValue: `-`,
				},
			]}
		/>
	</>
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