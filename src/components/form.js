import React from 'react'
import fetch from 'isomorphic-fetch'
import { Formik, Form } from 'formik'
import Recaptcha from 'react-google-invisible-recaptcha'

export default class CustomForm extends React.Component {
	static defaultProps = {
		recaptcha: true,
	}
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

		try {
			if (action) {
				const res = await fetch(action, {
					method: `post`,
					body: JSON.stringify(values),
				})
				if(res.status === 200){
					this.setState({ success: true })
					resetForm()
				}
				else {
					this.setState({
						success: false,
						error: true,
					})
				}
			}
			else if (onSubmit) {
				await onSubmit(values)
				this.setState({ success: true })
				resetForm()
			}
			else{
				console.log(`Form data not submitting anywhere:`, values)
				this.setState({ success: true })
				resetForm()
			}
		}
		catch (err) {
			console.error(err)
			this.setState({
				success: false,
				error: true,
			})
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
					if (this.props.recaptcha && !values.recaptcha) {
						fns.setSubmitting(false)
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
						setFieldValue,
						submitForm,
					} = props
					return (
						<Form>
							{error && this.props.error}
							{success && this.props.success}
							{isSubmitting && loading}
							{!isSubmitting && !success && form(props)}

							{this.props.recaptcha && (
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
										onError={err => {
											console.error(err)
											setFieldValue(`recaptcha`, false)
										}}
										onExpired={() => {
											setFieldValue(`recaptcha`, false)
										}}
									/>
								</div>
							)}
						</Form>


					)
				}}
			</Formik>
		)
	}
}