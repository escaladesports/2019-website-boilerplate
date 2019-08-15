import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'
import Map from '../components/locations-map'

export default function MapPage(props) {
	const locations = props.data.allMarkdownRemark.edges.map(edge => {
		return edge.node.frontmatter
	})
	return (
		<Layout title='Map'>
			<h1>Map</h1>
			<Map locations={locations} />
		</Layout>
	)
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
