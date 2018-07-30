import React, { Fragment } from 'react'
import Form from 'react-netlify-form'
import ReCaptcha from 'react-recaptcha'
import { css } from 'emotion'
import buttonMixin from '../styles/mixins/button'
import Meta from '../components/meta'

const styles = css({
	label: {
		display: `block`,
	},
})

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
											<ReCaptcha sitekey='6Le2PGcUAAAAADwr6YfbeaKK4Rch8SuzXmFx6Zqf' />
											<button className={buttonMixin}>Submit</button>
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
