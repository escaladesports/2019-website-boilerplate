import React from 'react'
import { css } from '@emotion/core'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import Layout from '../components/layouts/default'

export default class MapPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
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

			const { default: MarkerClusterGroup } = await import(`react-leaflet-markercluster`)

			this.setState({ Map, TileLayer, Marker, Popup, MarkerClusterGroup })
		}
	}
	render(){
		const { Map, TileLayer, Marker, Popup, MarkerClusterGroup } = this.state
		const position = [51.505, -0.09]
		return(
			<Layout title='Map'>
				<h1>Map</h1>
				{!!Map && (
					<Map
						center={position}
						zoom={13}
						maxZoom={30}
						css={styles.map}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<MarkerClusterGroup>
							<Marker position={position}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
							<Marker position={[51.505, -0.08]}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
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