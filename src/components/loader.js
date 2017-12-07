import React from 'react'

export default class extends React.Component {
	render(){
		return (
			<div className='root'>
				<div />
				<div />
				<div />
				<style jsx>{`
					.root{
						margin: 75px auto;
						width: 70px;
						text-align: center;
						& div{
							width: 18px;
							height: 18px;
							background-color: #333;
							border-radius: 100%;
							display: inline-block;
							margin-right: 7px;
							&:nth-of-type(1){
								animation: bouncedelay 1.4s infinite ease-in-out both;
								animation-delay: -0.32s;
							}
							&:nth-of-type(2){
								animation: bouncedelay 1.4s infinite ease-in-out both;
								animation-delay: -0.16s;
							}
							&:nth-of-type(3){
								animation: bouncedelay 1.4s infinite ease-in-out both;
								margin-right: 0;
							}
						}
					}
					@keyframes bouncedelay {
						0%, 80%, 100% {
							transform: scale(0);
						} 40% {
							transform: scale(1.0);
						}
					}
				`}</style>
			</div>
		)
	}
}
