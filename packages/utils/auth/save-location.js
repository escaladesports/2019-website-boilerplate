export default function saveLocation() {
	const { pathname, hash } = document.location
	if(pathname === `/account` || pathname.indexOf(`/account/`) > -1){
		return global.localStorage.setItem(`previousLocation`, `/`)
	}
	global.localStorage.setItem(`previousLocation`, `${pathname}${hash}`)
}