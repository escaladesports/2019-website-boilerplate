import React from 'react'
import { Subscribe } from 'statable'
import searchState from './state'

export default class SearchResults extends React.Component{
	render(){
		return (
			<Subscribe to={searchState}>
				{({ results, query, loading }) => this.props.children({
					results,
					hasResults: results.length > 0,
					query,
					loading,
				})}
			</Subscribe>
		)
	}
}