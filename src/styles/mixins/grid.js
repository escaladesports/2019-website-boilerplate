import { css } from 'emotion'

export default function createCSSGrid({
	gutter = 5,
	height = `auto`,
	columns = {},
}){
	const mq = {}
	for(let breakpoint in columns){
		const width = `calc(100% * (1/${columns[breakpoint]}) - ${gutter * 2}px)`
		if (breakpoint != 0) {
			mq[`@media(min-width:${breakpoint}px)`] = { width }
		}
		else{
			mq.width = width
		}
	}

	return css({
		display: `flex`,
		flexFlow: `row wrap`,
		margin: -gutter,
		'> *': {
			height,
			margin: gutter,
			...mq,
		},
	})
}