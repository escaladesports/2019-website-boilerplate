import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Item } from 'react-html-email'

export default class EmailLayout extends React.Component {
	static defaultProps = {
		lang: `en`,
		width: 600,
		align: `center`,
		vAlign: `top`,
		bgColor: `#fff`,
	}
	render() {
		const {
			lang,
			title,
			bgColor,
			align,
			vAlign,
			width,
			cellPadding,
			cellSpacing,
			style,
			children,
		} = this.props
		return (
			<Fragment>
				<Helmet>
					<html lang={lang} xmlns='http://www.w3.org/1999/xhtml' />
					<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
					<title>{title}</title>
					<body
						bgColor='#fff'
						width='100%'
						style={{
							width: `100%`,
							margin: 0,
							padding: 0,
							WebkitTextSizeAdjust: `100%`,
							MsTextSizeAdjust: `100%`,
						}}
					/>
				</Helmet>
				<Box width="100%" height="100%" bgcolor={bgColor}>
					<Item align={align} valign={vAlign}>
						<Box
							width={width}
							align="center"
							cellPadding={cellPadding}
							cellSpacing={cellSpacing}
							style={style}
						>
							{children}
						</Box>
					</Item>
				</Box>
			</Fragment>
		)
	}
}