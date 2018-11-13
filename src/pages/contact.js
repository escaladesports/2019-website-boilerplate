import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import { object, string } from 'yup'
import Field from '../components/inputs/field'
import Layout from '../components/layouts/default'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'

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
		} = this.props.data

		return(
			<Layout title={title} description={excerpt}>
				<div className={styles}>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<div className='form'>
						<Form
							action='/.netlify/functions/contact'
							// recaptcha={false}
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
							form={props => <>
								<Field
									label='Email:'
									name='email'
									type='email'
									{...props}
								/>
								<Field
									label='Name:'
									name='name'
									{...props}
								/>
								<Field
									label='Message:'
									name='message'
									component='textarea'
									{...props}
								/>

								<div className={styles.inputBlock}>
									<button
										type='submit'
										disabled={props.isSubmitting}
									>
										Submit
									</button>
								</div>
							</>}
						/>

					</div>
				</div>
			</Layout>
		)
	}
}

const styles = {
	inputBlock: css`
		display: block;
		margin-top: 20px;
	`,
	input: css`
		display: block;
		width: 100%;
		outline: none;
		border: 0;
		font-size: 1em;
		padding: 5px 0;
		border-bottom: 1px solid #333;
	`,
	error: css`
		color: #f00;
		input{
			color: #f00;
			border-color: #f00;
		}
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
	}
`
