import { css } from '@emotion/core'

export default function createCSSGrid({
	margin = 5,
	height = `auto`,
	columns = {},
}){
	if(typeof height === `number`) height += `px`
	const mq = []
	for(let breakpoint in columns){
		const width = `calc(100% * (1/${columns[breakpoint]}) - ${margin * 2}px)`
		if (breakpoint != 0) {
			mq.push(css`
				@media(min-width: ${breakpoint}px){
					> *{
						width: ${width};
					}
				}
			`)
		}
		else{
			mq.push(css`
				> * {
					width: ${width};
					height: ${height};
					margin: ${margin}px;
				}
			`)
		}
	}


	return [
		css`
			display: flex;
			flex-flow: row wrap;
			margin: ${-margin}px;
			> *{
				height: ${height};
				margin: ${margin}px;
			}
		`,
		...mq,
	]
}