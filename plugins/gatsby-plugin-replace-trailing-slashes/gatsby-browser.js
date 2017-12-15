
exports.onInitialClientRender = () => {
	let path = window.location.pathname
	if(path && path[path.length - 1] === '/' && window.history){
		window.history.replaceState({}, '', path.slice(0, -1))
	}
}