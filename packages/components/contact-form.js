import React from 'react'
import { css } from '@emotion/core'
import { object, string } from 'yup'
import { useAuth } from 'utils/auth'
import Field from './field'
import Button from './button'
import Form from './form'
import Error from './error-message'
import Success from './success-message'
import Loading from './loading'

export default function ContactForm(){
	const { user, loadingUser } = useAuth()
	return (
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
	)
}

const styles = {
	inputBlock: css`
		display: block;
		margin-top: 20px;
	`,
}