import React, { Fragment } from 'react'
import Form from 'react-netlify-form'
import ReCaptcha from 'react-recaptcha'
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
						<Form name='Contact'>
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
											<ReCaptcha sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY} />
											<button className={buttonMixin}>Submit</button>
										</Fragment>
									)}
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
