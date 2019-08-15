import React from 'react'
import { useGlobal } from 'reactn'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { object, string } from 'yup'
import Field from '../components/field'
import Button from '../components/button'
import Layout from '../components/layouts/default'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'

export default function ContactPage({
	data: {
		page: {
			frontmatter: {
				title,
			},
			html,
			excerpt,
		},
	},
}){
	const [user] = useGlobal(`user`)
	const [loadingUser] = useGlobal(`loadingUser`)
	console.log(`user`, user)
	console.log(`loadingUser`, loadingUser)
	return(
		<Layout title={title} description={excerpt}>
			<div>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<div className='form'>
					{loadingUser && <Loading />}
					{!loadingUser && (
						<Form
							action='/.netlify/utils/contact'
							recaptcha={true}
							initialValues={{
								email: user.email || ``,
								name: user.name || user.nickname || ``,
								message: ``,
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
								<Field
									label='Message'
									name='message'
									component='textarea'
									{...props}
								/>

								<div css={styles.inputBlock}>
									<Button
										type='submit'
										disabled={props.isSubmitting}
									>
										Submit
									</Button>
								</div>
							</>}
						/>
					)}
				</div>
			</div>
		</Layout>
	)
}

const styles = {
	inputBlock: css`
		display: block;
		margin-top: 20px;
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