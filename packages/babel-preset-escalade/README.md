# babel-preset-escalade

A Babel preset for JavaScript projects.

## Installation

```bash
$ npm install --save babel-preset-escalade
```

## Usage

In your `.babelrc` file:

```json
{
  "presets": [
    "escalade"
  ]
}
```

## Targeting Environments

Please refer to [@babel/preset-env#targets](https://babeljs.io/docs/en/babel-preset-env#targets) for a list of available options.

For a list of browsers please see [browserlist](https://github.com/ai/browserslist).

You may override our default list of targets by providing your own `targets` key.

```json
{
  "presets": [["escalade", {
    "targets": {
      "chrome": 50,
      "ie": 11,
      "firefox": 45
    }
  }]]
}
```
