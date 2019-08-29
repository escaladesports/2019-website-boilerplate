# React Escalade Pricing


## Import `usePrices` custom hook into your component

```jsx
import { usePrices } from '@escaladesports/react-escalade-pricing'
```

## Usage
The hook will return an array with two values like most react hooks.

```js
const [ prices, setPrices ] = usePrices(id, productIds)
```
`prices` will be the value of the hook:

```js
// single id
console.log(prices) // "9.99"

// multiple ids
console.log(prices)
// {
//  kz123: {prices: "9.99", formatted: "$9.99"}
//	kz124: {prices: "1.99", formatted: "$1.99"}
// }
```

`setPrices` is the dispatch method you can use to change the prices value:

```jsx
<button
	onClick={() => setPrices({
		...prices,
		kz123: { prices: "8.99", formatted: "$8.99" }
		})}
>
	Change Prices
</button>
```



