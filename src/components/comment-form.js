import React from 'react'
import { css } from 'emotion'
import { object, string } from 'yup'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Gravatar from 'react-gravatar'
import { primaryColor } from '../styles/colors'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'

const theme = createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})

const avatarSize = 100

export default class CommentForm extends React.Component{

	render(){
		return (
			<Form
				action='/.netlify/functions/comment'
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

				error={
					<Error>Server error! Your comment was not sent.</Error>
				}
				success={
					<Success>Thank you for your comment! It will be visible once approved.</Success>
				}
				loading={
					<Loading />
				}
				form={({
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
				}) => (
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
			/>

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