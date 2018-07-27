import React, { Fragment } from 'react'
import Form from 'react-netlify-form'
import ReCaptcha from 'react-recaptcha'
import { css } from 'emotion'
import Button from '../components/button'
import Meta from '../components/meta'

export default class DefaultTemplate extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.markdownRemark
		return(
			<Fragment>
				<Meta
					title={frontmatter.title}
					description={excerpt}
				/>
				<section className={styles}>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<div className='form'>
						<Form>
							{({ loading, error, success }) => (
								<Fragment>
									{loading && `Loading...`}
									{error && `Error.`}
									{success && `Success.`}
									{!loading && !success && (
										<Fragment>
											<label>
												Name:
												<input type='text' name='Name' required />
											</label>
											<label>
												Message:
												<textarea name='Message' required />
											</label>
											<ReCaptcha sitekey='6Lcg9A4UAAAAAJt4z7SDzNIr-5bRQkZJa-q6d-LS' />
											<Button>Submit</Button>
										</Fragment>
									)}
								</Fragment>
							)}
						</Form>
					</div>
				</section>
			</Fragment>
		)
	}
}

const styles = css({
	label: {
		display: `block`,
	},
})

export const query = graphql`
	query ContactTemplate($slug: String!) {
		markdownRemark(fields: {
			slug: { eq: $slug }
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
