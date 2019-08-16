export default {
	name: `captionedImage`,
	title: `Image`,
	type: `image`,
	fields: [
		{
			name: `caption`,
			title: `Caption`,
			type: `string`,
			options: {
				isHighlighted: true, // <-- make this field easily accessible
			},
		},
	],
}
