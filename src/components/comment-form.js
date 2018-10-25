import React from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'emotion'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Gravatar from 'react-gravatar'
import Recaptcha from 'react-google-invisible-recaptcha'
import { primaryColor } from '../styles/colors'

const theme = createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})

const avatarSize = 100

export default class CommentForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			success: false,
			error: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
	async onSubmit(values, { resetForm, setSubmitting }){
		console.log(`onSubmit`)
		this.setState({ error: false })
		const res = await fetch(`/.netlify/functions/comment`, {
			method: `post`,
			body: JSON.stringify(values),
		})
		const { success, message } = await res.json()

		// TODO: Display message
		if(success === false){
			this.setState({ error: message })
		}
		else{
			this.setState({ success: true })
			resetForm()
		}

		setSubmitting(false)
	}
	render(){
		const { error, success } = this.state
		return (
			<Formik
				initialValues={{
					email: ``,
					name: ``,
					comment: ``,
					recaptcha: ``,
					slug: this.props.slug,
				}}
				validationSchema={object().shape({
					email: string()
						.email()
						.required(`required`),
					name: string()
						.required(`required`),
					comment: string()
						.required(`required`),
				})}
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
						values,
						touched,
						errors,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						submitForm,
					} = props
					return <>
						{!!error && (
							<div>{error}</div>
						)}
						{success && (
							<div>Success!</div>
						)}
						<form onSubmit={handleSubmit}>
							{!isSubmitting && !success && (
								<div className={styles.formCols}>
									<div>
										<Gravatar
											email={values.email}
											rating='pg'
											default='mp'
											size={avatarSize}
										/>
										<div className={styles.gravatarNotice}>
											Avatar provided by <a href='https://gravatar.com/'>Gravatar</a>
										</div>
									</div>
									<div>
										<MuiThemeProvider theme={theme}>
											<div className={styles.inputBlock}>
												<TextField
													id='email'
													label='Email'
													fullWidth
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													error={errors.email && touched.email}
												/>
												{errors.email && touched.email && (
													<div className={styles.errorMsg}>
														{errors.email}
													</div>
												)}
											</div>

											<div className={styles.inputBlock}>
												<TextField
													id='name'
													label='Name'
													fullWidth
													value={values.name}
													onChange={handleChange}
													onBlur={handleBlur}
													error={errors.name && touched.name}
												/>
												{errors.name && touched.name && (
													<div className={styles.errorMsg}>
														{errors.name}
													</div>
												)}
											</div>

											<div className={styles.inputBlock}>
												<TextField
													id='comment'
													label='Comment'
													fullWidth
													value={values.comment}
													onChange={handleChange}
													onBlur={handleBlur}
													error={errors.comment && touched.comment}
													multiline={true}
													rows={1}
													rowsMax={4}
												/>
												{errors.comment && touched.comment && (
													<div className={styles.errorMsg}>
														{errors.comment}
													</div>
												)}
											</div>

											<input type='hidden' name='slug' value={values.slug} />

											<div className={styles.inputBlock}>
												<Button
													type='submit'
													variant='outlined'
													color='primary'
													disabled={isSubmitting}
												>
													Submit
												</Button>
											</div>

										</MuiThemeProvider>
									</div>
								</div>
							)}
							<div className={styles.recaptcha}>
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
						{isSubmitting && (
							<div>Loading...</div>
						)}
					</>
				}}
			</Formik>
		)
	}
}

const styles = {
	inputBlock: css`
		margin-bottom: 20px;
	`,
	errorMsg: css`
		margin-top: 3px;
		font-size: .75em;
		color: #f44336;
		:first-letter{
			text-transform: uppercase;
		}
	`,
	gravatarNotice: css`
		font-size: .7em;
		margin-top: 5px;
	`,
	formCols: css`
		display: flex;
		> div{
			:first-of-type{
				width: ${avatarSize}px;
				padding-top: 16px;
				text-align: center;
			}
			:last-of-type{
				padding-left: 30px;
				width: calc(100% - ${avatarSize}px);
			}
		}
	`,
	recaptcha: css`
		display: none;
	`,
}