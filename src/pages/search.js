import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'
import { search } from '../../plugins/search'

export default class SearchPage extends React.Component{
	constructor(props){
		super(props)
		this.id = 0
		this.state = {
			loading: false,
			results: [],
			term: ``,
		}
	}
	componentDidMount(){
		// Check URL for search term
		const path = document.location.pathname.split(`/`)
		if(path.length === 3){
			let term = path.pop()
			term = term.replace(/\+/g, `%20`)
			term = decodeURIComponent(term)
			this.search(term)
		}
	}
	async search(term){
		this.setState({ term })

		// Change URL
		if (window.history && window.history.replaceState) {
			let path = encodeURIComponent(term)
			path = path.replace(/%20/g, `+`)
			window.history.replaceState({}, ``, `/search/${path}`)
		}

		this.id++
		const curId = this.id
		this.setState({ loading: true })
		const results = await search(term)
		if (curId === this.id) {
			this.setState({
				loading: false,
				results,
			})
		}
	}
	render(){
		const {
			loading,
			results,
			term,
		} = this.state
		return(
			<Layout title='Search'>
				<h1>Search</h1>
				<input
					type='text'
					onChange={e => this.search(e.target.value)}
				/>
				{loading && (
					<h3>Searching for "{term}"...</h3>
				)}
				{term && !results.length && !loading && (
					<h3>No results found for "{term}".</h3>
				)}
				{!!results.length && <>
					<h3>Results for "{term}":</h3>
					<ul>
						{results.map(({ title, excerpt, path }, index) => (
							<li key={`searchResult${index}`}>
								<div>
									<Link to={path}>{title}</Link>
								</div>
								<div>
									{excerpt} <Link to={path}>Read more</Link>
								</div>
							</li>
						))}
					</ul>
				</>}
			</Layout>
		)
	}
}