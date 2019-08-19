import { FaSitemap } from 'react-icons/fa'

export default {
	name: `category`,
	title: `Category`,
	type: `document`,
	icon: FaSitemap,
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
				maxLength: 96,
			},
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
	],
}
