import React from 'react'
import { css } from 'emotion'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from 'components/layouts/default'
import createGrid from 'styles/mixins/grid'

export default class GridPage extends React.Component{
	render(){
		const { siteTitle, siteDescription } = this.props.data.site.frontmatter
		return(
			<Layout>
				<Helmet>
					<title>{`Grid Example | ${siteTitle}`}</title>
					<meta name='description' content={siteDescription} />
				</Helmet>
				<h1>Grid Example</h1>
				<div className={styles}>
					{function(){
						const els = []
						for(let i = 0; i < 31; i++){
							els.push(<div key={`grid${i}`}>{i + 1}</div>)
						}
						return els
					}()}
				</div>
			</Layout>
		)
	}
}

const styles = css`
	${createGrid({
		margin: 5,
		height: 200,
		columns: {
			0: 1,
			300: 2,
			600: 3,
			900: 4,
		},
	})}
	> *{
		background: #ccc;
		border: 1px solid #000;
	}
`

export const query = graphql`
	query GridPage {
		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
				siteDescription
			}
		}
	}
`
