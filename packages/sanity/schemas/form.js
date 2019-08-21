export default {
	name: `form`,
	title: `Form`,
	type: `object`,
	fields: [
		{
			name: `formType`,
			type: `string`,
			title: `Form type`,
			options: {
				list: [
					{
						title: `Contact form`,
						value: `[contact-form]`,
					},
				],
			},
		},
	],
}
