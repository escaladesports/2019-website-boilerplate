# Gatsby Boilerplate

## Installation

1. Ensure the [Yarn package manager](https://yarnpkg.com/en/) and npm are installed
2. `git clone https://github.com/escaladesports/gatsby-boilerplate.git gatsby-boilerplate; cd gatsby-boilerplate`
3. Run `yarn` to install dependencies
4. Create `envdotjs-key` (see [Environment Variables](#environment-variables) for more information)

## Development server

To run a local development server served with webpack and hot-module reloading, run `yarn dev`

## Deployment and build/static export

(to-do)

## Salsify Product

Products are stored in the `./src/markdown/products` directory. Always set an ID property to pull all the product data from Salsify into GraphQL.

## Environment Variables

Environment variables are managed through envdotjs. [See the envdotjs docs](https://github.com/escaladesports/envdotjs) for usage.

## MobX

To use MobX with Gatsby, first make sure the plugin is enabled in `gatsby-config.js`. Models and stores are in their respective directories in the `src` directory. To make sure they get exported into Gatsby add them in the `gatsby-mobx-config.js` file.

## CSS and styling with styled-jsx

This boilerplate uses [gatsby-plugin-styled-jsx-postcss](https://github.com/escaladesports/gatsby-plugin-styled-jsx-postcss), a Gatsby plugin that implements support for styled-jsx with PostCSS processing. See [information about PostCSS configuration](https://github.com/michael-ciniawsky/postcss-load-plugins) and [styled-jsx](https://github.com/zeit/styled-jsx) for specific information and documentation about these dependencies.

## Static assets