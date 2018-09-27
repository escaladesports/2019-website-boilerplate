export default function formatUsd(n){
	return (n / 100)
		.toLocaleString(`en-US`, {
			style: `currency`,
			currency: `USD`,
		})
}