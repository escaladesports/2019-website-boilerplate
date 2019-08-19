import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from '../components/netlify-image'
import Button from '../components/button'
import Layout from '../components/layouts/default'
import Modal from '../components/modal'
import Carousel from '../components/carousel'


export default function HomePage({
	data: {
		page: {
			html,
			frontmatter: {
				headerImage,
				headerImageDesc,
			} = {},
		} = {},
	} = {},
}){
	const [open, setOpen] = useState(false)

	return (
		<Layout>
			<div dangerouslySetInnerHTML={{ __html: html }} />

			<Carousel ratio={[1000, 400]}>
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide1' alt='Slide 1' />
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide2' alt='Slide 2' />
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide3' alt='Slide 3' />
			</Carousel>

			<br />

			<Img
				src={headerImage}
				width={404}
				height={405}
				alt={headerImageDesc}
			/>

			<br />

			<Button
				onClick={() => setOpen(true)}
			>
				Open Modal
			</Button>


			<Modal
				open={open}
				onClose={() => setOpen(false)}
			>
				<div>Modal content</div>
			</Modal>
		</Layout>
	)
}

export const query = graphql`
	query HomePage {
		page: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
			frontmatter{
				headerImage
				headerImageDesc
			}
		}
	}
`