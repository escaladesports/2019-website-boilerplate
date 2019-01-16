import { loadScript } from 'netlify-cms-lib-util'

const defaultOptions = {
	use_secure_url: true,
	use_transformations: true,
	output_filename_only: false,
}
/**
 * This configuration hash cannot be overriden, as the values here are required
 * for the integration to work properly.
 */
const enforcedConfig = {
	button_class: undefined,
	inline_container: undefined,
	insert_transformation: false,
	z_index: `99999`,
}

const defaultConfig = {
	multiple: false,
}

function getAssetUrl(asset, { use_secure_url, use_transformations, output_filename_only }) {
	/**
	 * Allow output of the file name only, in which case the rest of the url (including)
	 * transformations) can be handled by the static site generator.
	 */
	if (output_filename_only) {
		return `${asset.public_id}.${asset.format}`
	}

	/**
	 * Get url from `derived` property if it exists. This property contains the
	 * transformed version of image if transformations have been applied.
	 */
	const urlObject = asset.derived && use_transformations ? asset.derived[0] : asset

	/**
	 * Retrieve the `https` variant of the image url if the `useSecureUrl` option
	 * is set to `true` (this is the default setting).
	 */
	const urlKey = use_secure_url ? `secure_url` : `url`

	return urlObject[urlKey]
}

async function init({ options = {}, handleInsert } = {}) {
	/**
	 * Configuration is specific to Cloudinary, while options are specific to this
	 * integration.
	 */
	const { config: providedConfig = {}, ...integrationOptions } = options
	const resolvedOptions = { ...defaultOptions, ...integrationOptions }
	const cloudinaryConfig = { ...defaultConfig, ...providedConfig, ...enforcedConfig }

	await loadScript(`https://widget.cloudinary.com/v2.0/global/all.js`)

	const insertHandler = data => {
		const assets = data.assets.map(asset => getAssetUrl(asset, resolvedOptions))
		handleInsert(cloudinaryConfig.multiple ? assets : assets[0])
	}

	const mediaLibrary = window.cloudinary.createUploadWidget(cloudinaryConfig, { insertHandler })

	return {
		show: ({ config: instanceConfig = {}, allowMultiple } = {}) => {
			/**
			 * Ensure multiple selection is not available if the field is configured
			 * to disallow it.
			 */
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