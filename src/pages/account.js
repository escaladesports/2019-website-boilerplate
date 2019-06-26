import React from 'react'
import { Subscribe } from 'statable'
import Layout from '../components/layouts/default'
import { login, isAuthenticated, setMetadata } from '../utils/auth'
import authState from '../state/auth'

export default class AccountPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			metaValue: ``,
		}
	}
	componentDidMount(){
		// Redirect to login
		if (!isAuthenticated()){
			login()
		}
	}
	render() {
		return (
			<Layout title='Your Account'>
				<h1>Your Account</h1>
				<Subscribe to={authState}>{
					({ user, meta, loadingMeta }) => <>

						{!user && (
							<div>Loading...</div>
						)}
						{user && (
							<div>Hi, {user.name ? user.name : `friend`}!</div>
						)}

						<div>
							<h2>Metadata</h2>
							{loadingMeta && (
								<div>Loading...</div>
							)}
							{!loadingMeta && <>
								<div>
									<label>
										<span>Zip Code: </span>
										<input
											type='text'
											defaultValue={meta.zipCode}
											ref={el => this.zipInput = el}
										/>
									</label>
								</div>
								<div>
									<button
										onClick={e => {
											e.preventDefault()
											setMetadata({
												zipCode: this.zipInput.value,
											})
										}}
									>
										Change
									</button>
								</div>
							</>}
						</div>
					</>
				}</Subscribe>
			</Layout>
		)
	}
}