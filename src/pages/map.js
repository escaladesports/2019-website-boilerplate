import React from 'react'
import { css } from '@emotion/core'
import Layout from '../components/layouts/default'
// import 'leaflet/dist/leaflet.css'

export default class MapPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	async componentDidMount(){
		if (!this.state.Map) {
			const { Map, TileLayer } = await import(`react-leaflet`)
			this.setState({ Map, TileLayer })
		}
	}
	render(){
		const { Map, TileLayer } = this.state
		return(
			<Layout title='Map'>
				<h1>Map</h1>
				{!!Map && (
					<Map
						center={[51.505, -0.09]}
						zoom={1}
						css={styles.map}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
					</Map>
				)}
			</Layout>
		)
	}
}

const styles = {
	map: css`
		height: 600px;
	`,
}