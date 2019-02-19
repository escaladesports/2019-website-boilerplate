# New Project Boilerplate

A simple starter for new web applications, Gatsby plugins, react components, or JavaScript modules.

## Installation

```bash
git clone git@github.com:escaladesports/gatsby-boilerplate.git your-website
cd your-website
npm i
npm run reset
```

## Usage

- `npm run dev`: Starts up live development server
- `npm run build`: Builds site for production
- `npm run reset`: Changes the project name in `package.json` to match the directory, resets the version number, and resets the git history.
- `npm run env`: Pulls Netlify environment variables into a local `.env` file. (Only works if you have logged into [netlifyctl](https://github.com/netlify/netlifyctl#command-line-login) at least once and have permissions to the Netlify site)

## Images

All UI related images that belong in the template can be stored in the repository in the `src` directory. Any images that need to be edited through the CMS should be stored in Cloudinary to prevent the repository size from getting out of control.

## Preparing boilerplate to create Gatsby plugins

- Develop plugin in `./plugins/export` directory
- Change `build` script to `npm run build:plugin`

## Netlify CMS

Unless you're using the "invite only" option in Netlify Identity, make sure to add the "admin" role in the Git Gateway settings. Then add the "admin" role to any users you want to have access to the CMS.