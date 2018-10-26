import React from 'react'
import fetch from 'isomorphic-fetch'
import { Formik } from 'formik'
import Recaptcha from 'react-google-invisible-recaptcha'

export default class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			success: false,
			error: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
	async onSubmit(values, { resetForm, setSubmitting }) {
		this.setState({ error: false })
		const { action, onSubmit } = this.props

		if (action) {
			try {
				await fetch(action, {
					method: `post`,
					body: JSON.stringify(values),
				})
				this.setState({ success: true })
				resetForm()
			}
			catch (err) {
				console.error(err)
				this.setState({ success: false })
			}
		}
		else if(onSubmit){
			try {
				await onSubmit(values)
				this.setState({ success: true })
				resetForm()
			}
			catch (err) {
				console.error(err)
				this.setState({ success: false })
			}
		}

		setSubmitting(false)
	}
	render() {
		const {
			initialValues,
			validationSchema,
			loading,
			form,
		} = this.props
		const { error, success } = this.state

		return (
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, fns) => {
					if (!values.recaptcha) {
						this.recaptcha.execute()
					}
					else {
						this.onSubmit(values, fns)
					}
				}}
			>
				{props => {
					const {
						isSubmitting,
						handleSubmit,
						setFieldValue,
						submitForm,
					} = props
					return (
						<form onSubmit={handleSubmit}>

							{error && this.props.error}
							{success && this.props.success}
							{isSubmitting && loading}
							{!isSubmitting && !success && form(props)}

							<div style={{ display: `none` }}>
								<Recaptcha
									ref={el => this.recaptcha = el}
									sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
									onResolved={() => {
										const response = this.recaptcha.getResponse()
										console.log(`reCAPTCHA response`, response)
										setFieldValue(`recaptcha`, response)
										submitForm()
									}}
								/>
							</div>

						</form>
					)
				}}
			</Formik>
		)
	}
}