import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'
import { search, SearchResults } from '../../plugins/search'

export default class SearchPage extends React.Component{
	render(){
		const {
			siteTitle,
			siteDescription,
		} = this.props.data.site.siteMetadata
		return(
			<Layout>
				<Helmet>
					<title>{`Search | ${siteTitle}`}</title>
					<meta name='description' content={siteDescription} />
				</Helmet>
				<h1>Search</h1>
				<input
					type='text'
					onChange={e => search(e.target.value)}
				/>
				<SearchResults>
					{({ results, hasResults, loading }) => (
						<Fragment>
							{loading && (
								<div>Loading...</div>
							)}
							{!hasResults && !loading && (
								<div>No results found.</div>
							)}
							{hasResults && (
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
						</Fragment>
					)}
				</SearchResults>
			</Layout>
		)
	}
}



export const query = graphql`
	query SearchPage {
		site{
			siteMetadata{
				siteTitle: title
				siteDescription: description
			}
		}
	}
`
