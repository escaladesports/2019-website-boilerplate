import React from 'react'
import { css } from '@emotion/core'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import Layout from '../components/layouts/default'

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

export default class MapPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.updateLocationsList = this.updateLocationsList.bind(this)
	}
	async componentDidMount(){
		if (!this.state.Map) {
			const L = await import(`leaflet`)

			// Point icons to images in module
			delete L.Icon.Default.prototype._getIconUrl
			L.Icon.Default.mergeOptions({
				iconRetinaUrl,
				iconUrl,
				shadowUrl,
			})
			const {
				Map,
				TileLayer,
				Marker,
				Popup,
			} = await import(`react-leaflet`)

			const {
				default: MarkerClusterGroup,
			} = await import(`react-leaflet-markercluster`)

			this.setState({
				Map,
				TileLayer,
				Marker,
				Popup,
				MarkerClusterGroup,
			})
		}
	}
	updateLocationsList(){
		console.log(`updateLocationsList`)
	}
	render(){
		const {
			state: {
				Map,
				TileLayer,
				Marker,
				Popup,
				MarkerClusterGroup,
			},
			props: {
				data: {
					allMarkdownRemark: { edges },
				},
			},
		} = this

		const locations = edges.map(edge => {
			return edge.node.frontmatter
		})

		return(
			<Layout title='Map'>
				<h1>Map</h1>
				{!!Map && (
					<Map
						center={[37.993217, -95]}
						zoom={4}
						maxZoom={30}
						css={styles.map}
						onMoveend={arg => console.log(arg)}
						ref={this.updateLocationsList}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<MarkerClusterGroup>
							{locations.map((l, key) => (
								<Marker key={`location${key}`} position={[l.lat, l.lng]}>
									<Popup>
										<div><b>{l.title}</b></div>
										<div>{l.address}</div>
										<div>{`${l.city}, ${l.state} ${l.zip}`}</div>
									</Popup>
								</Marker>
							))}
						</MarkerClusterGroup>
					</Map>
				)}
			</Layout>
		)
	}
}

const styles = {
	map: css`
		height: 400px;
	`,
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
