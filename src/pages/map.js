import React from 'react'
import { css } from '@emotion/core'
import { Map } from 'react-leaflet'
import Layout from '../components/layouts/default'
import 'leaflet/dist/leaflet.css'

export default class MapPage extends React.Component{
	render(){
		return(
			<Layout title='Map'>
				<h1>Map</h1>
				<Map
					center={[51.505, -0.09]}
					zoom={13} css={styles.map}
				/>
			</Layout>
		)
	}
}

const styles = {
	map: css`
		height: 600px;
	`,
}