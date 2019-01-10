import React from 'react'
import { css } from '@emotion/core'
import { object, string } from 'yup'
import Gravatar from 'react-gravatar'
import Field from '../components/field'
import Button from '../components/button'
import Form from '../components/form'
import Error from '../components/error-message'
import Success from '../components/success-message'
import Loading from '../components/loading'

const avatarSize = 100

export default class CommentForm extends React.Component{

	render(){
		return (
			<Form
				action='/.netlify/functions/comment-to-markdown'
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
				form={props => (
					<div css={styles.formCols}>
						<div>
							<Gravatar
								email={props.values.email}
								rating='pg'
								default='mp'
								size={avatarSize}
							/>
							<div css={styles.gravatarNotice}>
								Avatar provided by <a href='https://gravatar.com/'>Gravatar</a>
							</div>
						</div>
						<div>
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
								label='Comment'
								name='comment'
								component='textarea'
								{...props}
							/>

							<input type='hidden' name='slug' value={props.values.slug} />

							<div css={styles.inputBlock}>
								<Button
									type='submit'
									disabled={props.isSubmitting}
								>
									Submit
								</Button>
							</div>
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