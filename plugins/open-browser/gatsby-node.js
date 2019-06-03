import open from 'open'

export function onCreateDevServer(){
	setTimeout(() => open(`http://localhost:8888`), 2000)
}
