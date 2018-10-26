import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { primaryColor } from './colors'

export default createMuiTheme({
	palette: {
		primary: { main: primaryColor },
	},
})
