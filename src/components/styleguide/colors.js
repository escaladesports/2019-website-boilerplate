import React, { Fragment } from 'react'

class Colors extends React.Component {
	render(){
		return(
			<section>
				<div />
				<div />
				<style jsx>{`
					@import 'src/css';
					:root{
						--size: 50px;
					}
					section{
						lost-utility: clearfix;
					}
					div{
						float: left;
						margin-right: 20px;
						font-size: .85em;
						color: #bbb;
						&:before{
							content: '';
							display: block;
							width: var(--size);
							height: var(--size);
							margin-bottom: 5px;
						}
						&:last-of-type{
							margin-right: 0;
						}
						&:nth-of-type(1){
							&:before{
								background-color: var(--colorPrimary);
							}
							&:after{
								content: 'var(--colorPrimary)';
							}
						}
						&:nth-of-type(2){
							&:before{
								background-color: var(--colorSecondary);
							}
							&:after{
								content: 'var(--colorSecondary)';
							}
						}
					}
				`}</style>
			</section>
		)
	}
}

export default Colors