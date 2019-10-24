const {
	GraphQLFieldConfig,
} = require(`gatsby/graphql`)

module.exports = ({ type }) => {
	if(type.name.match(/cloudinary/i)){
		console.log(`TYPE: `, type.name)
		let fields = GraphQLFieldConfig
		console.log(fields)
	}
}