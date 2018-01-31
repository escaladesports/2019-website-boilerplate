# Gatsby Boilerplate

## Salsify Product

Products are stored in the `./src/markdown/products` directory. Always set an ID property to pull all the product data from Salsify into GraphQL.

## Environment Variables

Environment variables are managed through envdotjs. [See the envdotjs docs](https://github.com/escaladesports/envdotjs) for usage.

## MobX

To use MobX with Gatsby, first make sure the plugin is enabled in `gatsby-config.js`. Models and stores are in their respective directories in the `src` directory. To make sure they get exported into Gatsby add them in the `gatsby-mobx-config.js` file.