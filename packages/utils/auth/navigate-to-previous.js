import { navigate } from 'gatsby'

export default function navigateToPreviousLocation() {
	if (typeof window === `undefined`) return
	const previousLocation = localStorage.getItem(`previousLocation`)
	if (previousLocation) {
		localStorage.setItem(`previousLocation`, ``)
		navigate(previousLocation)
	}
}