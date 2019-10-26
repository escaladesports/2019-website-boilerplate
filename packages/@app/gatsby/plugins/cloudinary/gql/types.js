const _ = require(`lodash`)

const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLInt,
	GraphQLBoolean,
} = require(`gatsby/graphql`)
const {
	ImageFormatType,
	ImageCropType,
	ImageGravityType,
} = require(`./schemas`)
const getBase64Image = require(`../utils/getBase64Image`)
const {
	resolveFixed,
	resolveFluid,
	resolveResize,
} = require(`../gql/resolvers`)


const fixedNodeType = ({ name, getTracedSVG, store }) => {
	return {
		type: new GraphQLObjectType({
			name: name,
			fields: {
				base64: {
					type: GraphQLString,
					resolve(imageProps) {
						return getBase64Image(imageProps)
					},
				},
				tracedSVG: {
					type: GraphQLString,
					resolve: (imageProps) => getTracedSVG(imageProps, store),
				},
				aspectRatio: { type: GraphQLFloat },
				width: { type: GraphQLFloat },
				height: { type: GraphQLFloat },
				src: { type: GraphQLString },
				srcSet: { type: GraphQLString },
				srcWebp: {
					type: GraphQLString,
					resolve({ image, options }) {
						if (image.format === `webp` || options.format === `webp`) {
							return null
						}

						const fixed = resolveFixed(image, {
							...options,
							format: `webp`,
						})
						return fixed.src
					},
				},
				srcSetWebp: {
					type: GraphQLString,
					resolve({ image, options }) {
						if (image.format === `webp` || options.format === `webp`) {
							return null
						}

						const fixed = resolveFixed(image, {
							...options,
							format: `webp`,
						})
						return fixed.srcSet
					},
				},
			},
		}),
		args: {
			width: {
				type: GraphQLInt,
			},
			height: {
				type: GraphQLInt,
			},
			crop: {
				type: ImageCropType,
			},
			format: {
				type: ImageFormatType,
			},
			gravity: {
				type: ImageGravityType,
			},
			background: {
				type: GraphQLString,
				defaultValue: null,
			},
			quality: {
				type: GraphQLInt,
				defaultValue: 50,
			},
		},
		resolve: (image, options, context) => {
			const node = resolveFixed(image, options)
			return {
				...node,
				image,
				options,
				context,
			}
		},
	}
}

const fluidNodeType = ({ name, getTracedSVG }) => {
	return {
		type: new GraphQLObjectType({
			name: name,
			fields: {
				base64: {
					type: GraphQLString,
					resolve(imageProps) {
						return getBase64Image(imageProps)
					},
				},
				tracedSVG: {
					type: GraphQLString,
					resolve: getTracedSVG,
				},
				aspectRatio: { type: GraphQLFloat },
				src: { type: GraphQLString },
				srcSet: { type: GraphQLString },
				srcWebp: {
					type: GraphQLString,
					resolve({ image, options }) {
						if (
							_.get(image, `file.contentType`) === `image/webp` ||
              options.toFormat === `webp`
						) {
							return null
						}

						const fluid = resolveFluid(image, {
							...options,
							toFormat: `webp`,
						})
						return _.get(fluid, `src`)
					},
				},
				srcSetWebp: {
					type: GraphQLString,
					resolve({ image, options }) {
						if (
							_.get(image, `file.contentType`) === `image/webp` ||
              options.toFormat === `webp`
						) {
							return null
						}

						const fluid = resolveFluid(image, {
							...options,
							toFormat: `webp`,
						})
						return _.get(fluid, `srcSet`)
					},
				},
				sizes: { type: GraphQLString },
			},
		}),
		args: {
			maxWidth: {
				type: GraphQLInt,
			},
			maxHeight: {
				type: GraphQLInt,
			},
			crop: {
				type: ImageCropType,
			},
			format: {
				type: ImageFormatType,
			},
			gravity: {
				type: ImageGravityType,
			},
			background: {
				type: GraphQLString,
				defaultValue: null,
			},
			quality: {
				type: GraphQLInt,
				defaultValue: 50,
			},
			sizes: {
				type: GraphQLString,
			},
		},
		resolve: (image, options, context) =>
			Promise.resolve(resolveFluid(image, options)).then(node => {
				return {
					...node,
					image,
					options,
					context,
				}
			}),
	}
}

const resizeNodeType = ({ name, getTracedSVG }) => {
	return {
		type: new GraphQLObjectType({
			name: name,
			fields: {
				base64: {
					type: GraphQLString,
					resolve(imageProps) {
						return getBase64Image(imageProps)
					},
				},
				tracedSVG: {
					type: GraphQLString,
					resolve: getTracedSVG,
				},
				src: { type: GraphQLString },
				width: { type: GraphQLInt },
				height: { type: GraphQLInt },
				aspectRatio: { type: GraphQLFloat },
			},
		}),
		args: {
			width: {
				type: GraphQLInt,
			},
			height: {
				type: GraphQLInt,
			},
			crop: {
				type: ImageCropType,
			},
			format: {
				type: ImageFormatType,
			},
			gravity: {
				type: ImageGravityType,
			},
			background: {
				type: GraphQLString,
				defaultValue: null,
			},
			quality: {
				type: GraphQLInt,
				defaultValue: 50,
			},
			jpegProgressive: {
				type: GraphQLBoolean,
				defaultValue: true,
			},
		},
		resolve(image, options) {
			return resolveResize(image, options)
		},
	}
}


module.exports = {
	fixedNodeType,
	fluidNodeType,
	resizeNodeType,
}