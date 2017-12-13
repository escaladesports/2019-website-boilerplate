import React from 'react'
import { Index } from 'elasticlunr'
import Link from 'gatsby-link'

export const query = graphql`
	query SearchIndexExampleQuery {
		siteSearchIndex {
			index
		}
	}
`

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			results: [],
		}
		this.getOrCreateIndex = this.getOrCreateIndex.bind(this)
		this.search = this.search.bind(this)
	}
	getOrCreateIndex() {
		return this.index
			? this.index
			// Create an elastic lunr index and hydrate with graphql query results
			: Index.load(this.props.data.siteSearchIndex.index)
	}
	search(e){
		const query = e.target.value
		this.index = this.getOrCreateIndex()
		let results = this.index.search(query)
			// Map over each ID and return the full document
			.map(res => {
				return this.index.documentStore.docs[res.ref]
			})
		this.setState({
			query,
			// Query the index with search string to get an [] of IDs
			results: results
		})
	}
	render() {
		return (
			<div>
				<input type="text" value={this.state.query} onChange={this.search} />
				<ul>
					{this.state.results.map((page, key) => (
						<li key={`searchResult${key}`}>
							<Link to={page.id}>{page.title}</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}