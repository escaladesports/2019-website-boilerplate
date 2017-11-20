import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import Zygote from 'components/utils/product/zygote'
import stylesheet from './_global.css'

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		return { html, head, errorHtml, chunks, styles }
	}
	render() {
		return (
			<html>
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				</Head>
				<body>
					<Main />
					<script src='https://cdn.polyfill.io/v2/polyfill.js' />
					<NextScript />
					<Zygote />
				</body>
			</html>
		)
	}
}