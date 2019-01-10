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
		}
	}
	async search(term){
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
		} = this.state
		return(
			<Layout title='Search'>
				<h1>Search</h1>
				<input
					type='text'
					onChange={e => this.search(e.target.value)}
				/>
				{loading && (
					<div>Loading...</div>
				)}
				{!results.length && !loading && (
					<div>No results found.</div>
				)}
				{!!results.length && (
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
				)}
			</Layout>
		)
	}
}