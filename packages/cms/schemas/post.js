export default {
	name: `post`,
	title: `Post`,
	type: `document`,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
		},
		{
			name: `date`,
			title: `Date`,
			type: `datetime`,
			calendarTodayLabel: `Today`,
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
			name: `tags`,
			title: `Tags`,
			type: `array`,
			of: [{type: `string`}],
		},
		{
			name: `body`,
			title: `Body`,
			type: `localeBlockContent`,
		},
	],

	preview: {
		select: {
			title: `title`,
		},
	},
}
