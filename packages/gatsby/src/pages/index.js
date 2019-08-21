import React, { useState } from 'react'
// import { graphql } from 'gatsby'
import Button from '../components/button'
import Layout from '../components/layouts/default'
import Modal from '../components/modal'
import Carousel from '../components/carousel'


export default function HomePage(){
	const [open, setOpen] = useState(false)

	return (
		<Layout>
			<h1>Home Page</h1>
			<p>This is the homepage</p>

			<Carousel ratio={[1000, 400]}>
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide1' alt='Slide 1' />
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide2' alt='Slide 2' />
				<img src='https://placehold.it/1000x400/ccc/999/&text=slide3' alt='Slide 3' />
			</Carousel>

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
