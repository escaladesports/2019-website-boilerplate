import React from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'emotion'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { primaryColor } from '../styles/colors'

const theme = createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})

export default class CommentForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			success: false,
			error: false,
		}
		this.submit = this.submit.bind(this)
	}
	async submit(values, { resetForm, setSubmitting }){
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
				onSubmit={this.submit}
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
					} = props
					return <>
						{!!error && (
							<div>{error}</div>
						)}
						{success && (
							<div>Success!</div>
						)}
						{!isSubmitting && !success && (
							<MuiThemeProvider theme={theme}>
								<form onSubmit={handleSubmit}>
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
								</form>
							</MuiThemeProvider>
						)}
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
		margin-top: 20px;
	`,
	errorMsg: css`
		margin-top: 3px;
		font-size: .75em;
		color: #f44336;
		:first-letter{
			text-transform: uppercase;
		}
	`,
}