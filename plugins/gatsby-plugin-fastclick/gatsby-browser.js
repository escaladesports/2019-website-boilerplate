import fastclick from 'react-fastclick'

exports.onInitialClientRender = () => {
	console.log('Fastclick init')
	fastclick()
}