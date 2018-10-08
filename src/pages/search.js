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
		const { index, store } = this.props.data.lunrSearchIndex
		this.index = lunr.Index.load(JSON.parse(index))
		this.store = JSON.parse(store)
	}
	search(e){
		if(this.index){
			const { value } = e.target
			if(!value){
				this.setState({ results: [] })
				return
			}
			const results = this.index.search(value)
				.map(({ ref }) => {
					return this.store[ref]
				})
			this.setState({ results })
		}
	}
	render(){
		const {
			siteTitle,
			siteDescription,
		} = this.props.data.site.frontmatter
		const { results } = this.state
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
				{!results.length && (
					<div>No results found.</div>
				)}
				{!!results.length && (
					<ul>
						{results.map(({ title, excerpt, path }, index) => (
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
				)}
			</Layout>
		)
	}
}


export const query = graphql`
	query SearchPage {

		lunrSearchIndex{
			index
			store
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
