const open = require(`open`)

exports.onCreateDevServer = function(){
	setTimeout(() => open(`http://localhost:8888`), 12000)
}
