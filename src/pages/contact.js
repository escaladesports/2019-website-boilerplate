import React, { Fragment } from 'react'
import Form from 'react-netlify-form'
import { css } from 'emotion'
import buttonMixin from '../styles/mixins/button'
import Layout from '../components/layouts/default'
import Meta from '../components/meta'

export default class DefaultTemplate extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.markdownRemark
		return(
			<Layout>
				<Meta
					title={frontmatter.title}
					description={excerpt}
				/>
				<div className={styles}>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<div className='form'>
						<Form
							name='Contact'
							recaptcha={{
								size: `invisible`,
								sitekey: process.env.GATSBY_SITE_RECAPTCHA_KEY,
							}}
						>
							{({ loading, error, recaptchaError, success, recaptcha }) => (
								<Fragment>
									{loading &&
										<div>Loading...</div>
									}
									{error &&
										<div>Your information was not sent. Please try again later.</div>
									}
									{recaptchaError &&
										<div>Recaptcha did not match. Please make sure the box is checked.</div>
									}
									{success &&
										<div>Thank you for contacting us!</div>
									}
									{!loading && !success &&
										<Fragment>
											<div>
												<input type='text' name='Name' required />
											</div>
											<div>
												<textarea name='Message' required />
											</div>
											<div>
												<button className={buttonMixin}>Submit</button>
											</div>
										</Fragment>
									}
									{recaptcha}
								</Fragment>
							)}
						</Form>
					</div>
				</div>
			</Layout>
		)
	}
}

const styles = css({
	label: {
		display: `block`,
	},
	'.grecaptcha-badge': {
		display: `none !important`,
	},
})

export const query = graphql`
	query ContactTemplate {
		markdownRemark(fileAbsolutePath: {
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
