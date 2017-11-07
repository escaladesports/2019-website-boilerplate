import React from 'react'
import settings from 'components/_settings'
import PageIsLoading from 'components/util/page-is-loading'

export default class extends React.Component {
	render(){
		return (
			<PageIsLoading>
				<div>
					<span />
				</div>
				<style jsx>{`
					div{
						box-sizing: border-box;
						position: fixed;
						top: 0;
						right: 0;
						left: 0;
						height: 9px;
						overflow: hidden;
						background-color: #fff;
					}
					span{
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						width: 100%;
						background-color: #000;
						transform: translate(-100%, 0);
						animation: anim 3s linear infinite;
					}
					@keyframes anim{
						from{
							transform: translate(-100%, 0);
						}
						to{
							transform: translate(0%, 0);
						}
					}
				`}</style>
			</PageIsLoading>
		)
	}
}
