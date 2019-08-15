# Escalade Sports Project Boilerplate

An opinionated project boilerplate for creating and working with [modern full stack serverless applications](https://jamstack.org/).

## Required

- [yarn](https://yarnpkg.com/)
- [nvm](https://github.com/creationix/nvm)

## Setup for a new project

```bash
git clone git@github.com:escaladesports/gatsby-boilerplate.git your-website
cd your-website
nvm use
yarn
yarn bootstrap
rm -rf .git
git init
```

Add environment variables to a `./.env` file in the root of your project. There's an example file of

It's also recommended to change any settings you might need in the `./site-config.js` file.

## Setup for an existing project

```bash
git clone REMOTE_URL folder-name
cd folder-name
nvm use
yarn
yarn bootstrap
```

Add environment variables to a `./.env` file in the root of your project.

## What's included

- [Gatsby](https://www.gatsbyjs.org/docs/) is used for building a static application from React components
- [Netlify](https://www.netlify.com/docs/) configs are included for easy deployment
- [Netlify CMS](https://www.netlifycms.org/docs/intro/) is included in the `site` package
- [ESLint](https://eslint.org/docs/user-guide/) is used under the hood for JS linting
- [Babel](https://babeljs.io/docs/en/) is used under the hood for JS transpiling
- [Lerna](https://lerna.js.org/) is used for package management

### Project Structure

This boilerplate is set up as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) with [Lerna](https://github.com/lerna/lerna). By default, the following packages are included:

- `api`: [Serverless functions](https://www.netlify.com/docs/functions/) for any logic that needs to be server side
- `site`: The UI of the application built with [Gatsby](https://www.gatsbyjs.org/)
- `babel-preset-boilerplate`: The [Babel](https://babeljs.io/) preset that's used for the site and APIs
- `eslint-config-boilerplate`: The [ESLint](https://eslint.org/) config that's used for the entire project
- `utils`: An assortment of random utility functions that need to be shared between other packages

## Usage

- `yarn bootstrap`: Installs and symlinks all package dependencies
- `yarn dev`: Starts up live development server on your local machine
- `yarn build`: Builds site for production

## Netlify Config, Redirects, and Headers

The Netify config file is located in `packages/site/netlify.toml` and is transpiled to the root directory on `yarn dev` and `yarn build`. This allows you to use environment variables in the source config (example: `env.API_KEY`) that will be injected into the root config. Since these changes are one way, you should never edit the config that's in the root.