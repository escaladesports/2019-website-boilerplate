import { css } from 'emotion'

const fieldStyles = css`
	width: 100%;
	display: block;
	outline: none;
	border: 1px solid #ccc;
	font-size: .8em;
	background-color: transparent;
	padding: 8px;
	:focus{
		border-color: #000;
	}
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus{
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	}
`

export default fieldStyles