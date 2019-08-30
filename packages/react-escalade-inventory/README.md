# React Escalade Inventory


## Import `useInventory` custom hook into your component

```jsx
import { useInventory } from '@escaladesports/react-escalade-inventory'
```

## Usage
The hook will return an array with two values like most react hooks.

```js
const [ inventory, setInventory ] = useInventory(id, productIds)
```
`inventory` will be the value of the hook:

```js
// single id
console.log(inventory) // 13

// multiple ids
console.log(inventory)
// {
//  kz123: {stock: 13, locations: { coolVille: 13 } }
//  kz124: {stock: 14, locations: { coolVille: 14 } }
// }
```

`setInventory` is the dispatch method you can use to change the inventory value:

```jsx
<button
 onClick={() => setInventory({
  ...inventory,
  kz123: { inventory: 18, locations: { coolVille: 18 } }
 })}
>
 Change inventory
</button>
```

## Optional Endpoint
If you would like to override the default endpoint, you may do so by passing
a third parameter as a string

```js
const [ inventory, setInventory ] = useInventory(id, productIds, `https://my-custom-inventory-api.com`)
```



