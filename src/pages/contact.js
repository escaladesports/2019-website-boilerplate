import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Layout from '../components/layouts/default'
import Form from '../components/form'
import buttonMixin from '../styles/mixins/button'
import Name from '../components/inputs/name'
import Email from '../components/inputs/email'
import Textarea from '../components/inputs/textarea'
import Phone from '../components/inputs/phone'
import Zip from '../components/inputs/zip'
import Checkbox from '../components/inputs/checkbox'
import Select from '../components/inputs/select'

export default class ContactPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	canSubmit() {
		const required = [
			`email`,
			`name`,
		]
		for (let i = required.length; i--;) {
			if (!this.state[required[i]]) {
				return false
			}
		}
		return true
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
						<Form
							success={(
								<div>Thank you for contacting us!</div>
							)}
							onSuccess={() => console.log(this.state)}
							recaptcha={false}
							form={
								<>
									<Name parent={this} />
									<Email parent={this} />
									<Phone parent={this} required={false} />
									<Zip parent={this} required={false} />
									<Select
										parent={this}
										label='Subject'
										name='subject'
										required={false}
									>
										<option>General</option>
										<option>Customer Service</option>
										<option>Warranty Claim</option>
									</Select>
									<Textarea parent={this} required={false} />
									<Checkbox parent={this} label='Toggle' name='toggle' />
									<button
										disabled={!this.canSubmit()}
										className={buttonMixin}
									>
										Submit
									</button>
								</>
							}
						/>
					</div>
				</div>
			</Layout>
		)
	}
}

const styles = css`
	label{
		display: block;
	}
	.grecaptcha-badge{
		display: none !important;
	}
`

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
