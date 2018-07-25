import React, { Fragment } from 'react'

class Colors extends React.Component {
	render(){
		return(
			<section>
				<h1 />
				<h1 />
				<style jsx>{`
					@import 'src/css';
					h1{
						text-transform: capitalize;
						&:nth-of-type(1){
							&:before{
								font-family: var(--fontFamilyPrimary);
								content: var(--fontFamilyPrimary);
							}
						}
						&:nth-of-type(2){
							&:before{
								font-family: var(--fontFamilySecondary);
								content: var(--fontFamilySecondary);
							}
						}
					}
				`}</style>
			</section>
		)
	}
}

export default Colors