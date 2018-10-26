import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Recaptcha from 'react-google-invisible-recaptcha'
import { primaryColor } from '../styles/colors'
import Layout from '../components/layouts/default'

const theme = createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})

export default class ContactPage extends React.Component {
	onSubmit(values){
		console.log(values)
	}
	render(){
		const {
			page: {
				frontmatter: {
					title,
				},
				html,
				excerpt,
			},
			site: {
				siteMetadata: {
					siteTitle,
				},
			},
		} = this.props.data

		return(
			<Layout title={title} siteTitle={siteTitle} description={excerpt}>
				<div className={styles}>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<div className='form'>
						<Formik
							initialValues={{
								email: ``,
								name: ``,
								message: ``,
								recaptcha: ``,
							}}
							validationSchema={object().shape({
								email: string()
									.email()
									.required(`required`),
								name: string()
									.required(`required`),
								message: string()
									.required(`required`),
							})}
							onSubmit={(values, { resetForm }) => {
								if (!values.recaptcha) {
									this.recaptcha.execute()
								}
								else{
									resetForm()
									this.onSubmit(values)
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
								return (
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
													id='message'
													label='Message'
													fullWidth
													value={values.message}
													onChange={handleChange}
													onBlur={handleBlur}
													error={errors.message && touched.message}
													multiline={true}
													rows={1}
													rowsMax={4}
												/>
												{errors.message && touched.message && (
													<div className={styles.errorMsg}>
														{errors.message}
													</div>
												)}
											</div>

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

											<div className={styles.recaptcha}>
												<Recaptcha
													ref={el => this.recaptcha = el}
													sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
													onResolved={() => {
														const response = this.recaptcha.getResponse()
														setFieldValue(`recaptcha`, response)
														submitForm()
													}}
												/>
											</div>
										</form>
									</MuiThemeProvider>
								)
							}}
						</Formik>
					</div>
				</div>
			</Layout>
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
	recaptcha: css`
		display: none;
	`,
}

export const query = graphql`
	query ContactTemplate {
		page: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/contact.md/"
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
