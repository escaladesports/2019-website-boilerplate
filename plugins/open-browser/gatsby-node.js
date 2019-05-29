const open = require(`open`)

exports.onCreateDevServer = () => {
	setTimeout(() => open(`http://localhost:8888`), 500)
}
