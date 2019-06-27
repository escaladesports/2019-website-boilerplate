import React from 'react'
import { Subscribe } from 'statable'
import { object, string } from 'yup'
import Layout from '../components/layouts/default'
import Field from '../components/field'
import Button from '../components/button'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'
import PasswordChange from '../components/accounts/password-change'
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
					({ user, meta, loadingUser, loadingMeta }) => <>

						{loadingUser && (
							<Loading />
						)}
						{!loadingUser && (
							<div>Hi, {meta.name || user.nickname || user.name || `friend`}!</div>
						)}

						<div>
							<h2>Info</h2>
							{loadingMeta && (
								<Loading />
							)}
							{!loadingMeta && <>
								<Form
									onSubmit={async res => {
										await setMetadata(res)
									}}
									recaptcha={false}
									initialValues={{
										email: meta.email || user.email || ``,
										name: meta.name || user.nickname || user.name || ``,
									}}
									validationSchema={object().shape({
										email: string()
											.email()
											.required(`required`),
										name: string()
											.required(`required`),
									})}
									loading={
										<Loading />
									}
									error={
										<Error>Server error! Your information was not saved.</Error>
									}
									success={
										<Success>Thank you for your comment! It will be visible once approved.</Success>
									}
									form={props => <>
										<Field
											label='Email'
											name='email'
											type='email'
											{...props}
										/>
										<Field
											label='Name'
											name='name'
											{...props}
										/>
										<Button
											type='submit'
											disabled={props.isSubmitting}
										>
											Submit
										</Button>
									</>}
								/>
								<br />
								<PasswordChange />
							</>}
						</div>
					</>
				}</Subscribe>
			</Layout>
		)
	}
}