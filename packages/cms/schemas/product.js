export default {
	name: `product`,
	title: `Product`,
	type: `document`,
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
			title: `Default variant`,
			name: `defaultProductVariant`,
			type: `productVariant`,
		},
		{
			title: `Variants`,
			name: `variants`,
			type: `array`,
			of: [
				{
					title: `Variant`,
					type: `productVariant`,
				},
			],
		},
		{
			name: `categories`,
			title: `Categories`,
			type: `array`,
			of: [
				{
					name: `category`,
					type: `reference`,
					to: {type: `category`},
				},
			],
		},
		{
			name: `body`,
			title: `Body`,
			type: `localeBlockContent`,
		},
		{
			title: `Order`,
			name: `order`,
			type: `number`,
		},
	],

	preview: {
		select: {
			title: `title`,
			subtitle: `defaultProductVariant.sku`,
			media: `defaultProductVariant.images[0]`,
		},
	},
}
