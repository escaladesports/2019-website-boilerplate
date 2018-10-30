import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import { object, string } from 'yup'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import NoSSR from 'react-no-ssr'
import { ErrorMessage } from 'formik'
import { primaryColor } from '../styles/colors'
import Layout from '../components/layouts/default'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'

const theme = createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})

const initialValues = {
	email: ``,
	name: ``,
	message: ``,
}
const validationSchema = object().shape({
	email: string()
		.email()
		.required(`required`),
	name: string()
		.required(`required`),
	message: string()
		.required(`required`),
})

export default class ContactPage extends React.Component {
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
						<NoSSR>
							<Form
								// action='/.netlify/functions/contact'
								recaptcha={false}
								initialValues={initialValues}
								validationSchema={validationSchema}
								error={
									<Error>Server error! Your message was not received.</Error>
								}
								success={
									<Success>Thank you for your message! A representative will reach out to you as soon as possible.</Success>
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
									<MuiThemeProvider theme={theme}>
										<div className={styles.inputBlock}>
											<TextField
												name='email'
												label='Email'
												fullWidth
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												error={errors.email && touched.email}
											/>
											<ErrorMessage
												name='email'
												component='div'
												className={styles.errorMsg}
											/>
										</div>

										<div className={styles.inputBlock}>
											<TextField
												name='name'
												label='Name'
												fullWidth
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												error={errors.name && touched.name}
											/>
											<ErrorMessage
												name='name'
												component='div'
												className={styles.errorMsg}
											/>
										</div>

										<div className={styles.inputBlock}>
											<TextField
												name='message'
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
											<ErrorMessage
												name='message'
												component='div'
												className={styles.errorMsg}
											/>
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
									</MuiThemeProvider>
								)}
							/>
						</NoSSR>

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
