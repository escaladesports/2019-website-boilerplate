import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import lunr from 'lunr'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'

export default class SearchPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			results: [],
		}
		this.search = this.search.bind(this)
	}
	componentDidMount(){
		this.index = lunr.Index.load(JSON.parse(this.props.data.lunrSearchIndex.index))
		this.items = {}
		this.props.data.allMarkdownRemark.edges.forEach(({
			node: {
				id,
				fields: {
					path,
				},
				frontmatter: {
					title,
				},
				excerpt,
			},
		}) => {
			this.items[id] = {
				path,
				title,
				excerpt,
			}
		})
	}
	search(e){
		if(this.index){
			const { value } = e.target
			const obj = this.index.search(value)
			const results = []
			obj.forEach(({ ref }) => {
				if(this.items[ref]){
					results.push(this.items[ref])
				}
			})
			this.setState({ results })
		}
	}
	render(){
		const {
			siteTitle,
			siteDescription,
		} = this.props.data.site.frontmatter
		return(
			<Layout>
				<Helmet>
					<title>{`Search | ${siteTitle}`}</title>
					<meta name='description' content={siteDescription} />
				</Helmet>
				<h1>Search</h1>
				<input
					type='text'
					onChange={this.search}
				/>
				<ul>
					{this.state.results.map(({ title, excerpt, path }, index) => (
						<li key={`search-result-${index}`}>
							<div>
								<Link to={path}>{title}</Link>
							</div>
							<div>
								{excerpt} <Link to={path}>Read more</Link>
							</div>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}


export const query = graphql`
	query SearchPage {

		lunrSearchIndex{
			index
		}

		allMarkdownRemark(
			filter: {
				frontmatter: {
					published: {eq: true}
				}
			}
		){
			edges{
				node{
					id
					fields{
						path
					}
					frontmatter{
						title
					}
					excerpt
				}
			}
		}

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
