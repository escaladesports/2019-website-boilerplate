export default function formatUsd(n, dollars = false){
	if(!dollars){
		n = n / 100
	}
	return n.toLocaleString(`en-US`, {
		style: `currency`,
		currency: `USD`,
	})
}