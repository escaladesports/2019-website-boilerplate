# gatsby-source-salsify

A Gatsby plugin for using [Salsify](https://www.salsify.com/) as a data source.

## Install

```bash
npm install --save gatsby-source-salsify
```

or with Yarn:

```bash
yarn add gatsby-source-salsify
```

## How to use

```javascript
// In your gatsby-config.js
plugins: [
	{
		resolve: 'gatsby-source-salsify',
		options: {
			ids: ['U2508', 'U2000'],
			apiKey: "your_salsify_key",
		},
	},
]
```

Or use markdown files that contain an "id" property in front matter to determine which products to use:

```javascript
// In your gatsby-config.js
plugins: [
	{
		resolve: 'gatsby-source-salsify',
		options: {
			markdownPath: `${__dirname}/src/markdown/products`,
			apiKey: "your_salsify_key",
		},
	},
]
```

`apiKey` is optional if your key is an environment variable. If it is not supplied in the options, it will still try to look for the key in the environment variable `process.env.SALSIFY_API_KEY`.

## How to query

**Note:** All properties will be converted to camelcase so they play nice with GraphQL.

```graphql
{
	salsifyContent(id: { eq: $id }){
		itemName
	}
}
```