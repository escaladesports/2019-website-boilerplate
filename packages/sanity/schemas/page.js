import { FaFile } from 'react-icons/fa'

export default {
	name: `page`,
	title: `Page`,
	type: `document`,
	icon: FaFile,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
		},
		{
			name: `body`,
			title: `Body`,
			type: `blockContent`,
		},
	],

	preview: {
		select: {
			title: `title`,
		},
	},
}
