import { loadScript } from 'netlify-cms-lib-util'

async function init({ options = {}, handleInsert } = {}) {

	await loadScript(`https://widget.cloudinary.com/v2.0/global/all.js`)

	const { createUploadWidget } = window.cloudinary
	const { config } = options

	function insertHandler(err, result) {
		if (err) {
			console.error(err)
		}
		else if (result.event === `success`) {
			handleInsert(result.info.secure_url)
		}
	}

	const mediaLibrary = createUploadWidget(config, insertHandler)

	return {
		show: ({ config: instanceConfig = {}, allowMultiple } = {}) => {
			if (allowMultiple === false) {
				instanceConfig.multiple = false
			}
			return mediaLibrary.open()
		},
		hide: () => mediaLibrary.close(),
		enableStandalone: () => true,
	}
}

const cloudinaryMediaLibrary = {
	name: `cloudinary-v2`,
	init,
}

export default cloudinaryMediaLibrary