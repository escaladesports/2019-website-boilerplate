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
		this.state = {
			visibleLocations: [],
		}
		this.updateLocationsList = this.updateLocationsList.bind(this)
	}
	async componentDidMount() {
		this.locations = this.props.data.allMarkdownRemark.edges.map(edge => {
			return edge.node.frontmatter
		})
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
				L,
			})

			this.updateLocationsList()
		}
	}
	updateLocationsList(){
		const visibleLocations = []
		const mapBounds = this.map.leafletElement.getBounds()
		this.locations.forEach(l => {
			if (mapBounds.contains([l.lat, l.lng])){
				visibleLocations.push(l)
			}
		})
		this.setState({ visibleLocations })
	}
	zoomToLocation(lat, lng){
		if(this.map){
			this.map.leafletElement.flyTo([lat, lng], 10)
		}
	}
	render(){
		const {
			Map,
			TileLayer,
			Marker,
			Popup,
			MarkerClusterGroup,
			visibleLocations,
		} = this.state

		return(
			<Layout title='Map'>
				<h1>Map</h1>
				{!!Map && (
					<Map
						center={[37.993217, -95]}
						zoom={4}
						maxZoom={30}
						css={styles.map}
						onMoveend={this.updateLocationsList}
						ref={el => this.map = el}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<MarkerClusterGroup>
							{this.locations.map((l, key) => (
								<Marker key={`map-loc-${key}`} position={[l.lat, l.lng]}>
									<Popup>
										<b>{l.title}</b><br />
										{l.address}<br />
										{`${l.city}, ${l.state} ${l.zip}`}
									</Popup>
								</Marker>
							))}
						</MarkerClusterGroup>
					</Map>
				)}
				<div css={styles.locationSection}>
					{visibleLocations.map((l, key) => (
						<div
							key={`loc-${key}`}
							css={styles.location}
							onClick={() => this.zoomToLocation(l.lat, l.lng)}
						>
							<b>{l.title}</b><br />
							{l.address}<br />
							{`${l.city}, ${l.state} ${l.zip}`}
						</div>
					))}
				</div>
			</Layout>
		)
	}
}

const styles = {
	map: css`
		height: 400px;
	`,
	locationSection: css`
		padding: 20px 0;
	`,
	location: css`
		padding: 20px 0;
		cursor: pointer;
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
