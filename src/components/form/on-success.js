async function onSuccess(body) {
	this.props.onSuccess(body)
	this.setState({
		loading: false,
		success: body,
		error: false,
	})
}

export default onSuccess