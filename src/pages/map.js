import React from 'react'
import Layout from '../components/layouts/default'
import Map from '../components/locations-map'

export default class MapPage extends React.Component{
	constructor(props){
		super(props)
		this.locations = props.data.allMarkdownRemark.edges.map(edge => {
			return edge.node.frontmatter
		})
	}
	render(){
		return(
			<Layout title='Map'>
				<h1>Map</h1>
				<Map locations={this.locations} />
			</Layout>
		)
	}
}

export const query = graphql`
	query MapQuery {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/locations/"
				}
			}
		){
			edges{
				node{
					frontmatter{
						title
						address
						city
						state
						zip
						lat
						lng
					}
				}
			}
		}
	}
`
