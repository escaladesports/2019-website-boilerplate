import React from 'react'
import { css } from '@emotion/core'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import Layout from '../components/layouts/default'

// Point icons to images in module
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
})

export default class MapPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	async componentDidMount(){
		if (!this.state.Map) {
			const {
				Map,
				TileLayer,
				Marker,
				Popup,
			} = await import(`react-leaflet`)
			this.setState({ Map, TileLayer, Marker, Popup })
		}
	}
	render(){
		const { Map, TileLayer, Marker, Popup } = this.state
		const position = [51.505, -0.09]
		return(
			<Layout title='Map'>
				<h1>Map</h1>
				{!!Map && (
					<Map
						center={position}
						zoom={13}
						css={styles.map}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
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