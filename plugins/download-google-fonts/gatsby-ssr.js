const React = require(`react`)
const globby = require(`globby`).sync

exports.onRenderBody = ({ setHeadComponents }) => {
	const files = globby(`./public/google-fonts/**/*.woff2`)
	setHeadComponents(files.map((file, key) => (
		<link
			key={`googleFont${key}`}
			rel='preload'
			as='font'
			type='font/woff2'
			crossOrigin='anonymous'
			href={file.replace(`./public`, ``)}
		/>
	)))
}