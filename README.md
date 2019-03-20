# New Project Boilerplate

A simple starter for new web applications, Gatsby plugins, react components, or JavaScript modules.

## Requirements

- [yarn](https://yarnpkg.com/)
- [nvm](https://github.com/creationix/nvm)
- [Netlify CLI](https://www.netlify.com/docs/cli/)
- Netlify CLI Large Media Plugin
  ```bash
  netlify plugins:install netlify-lm-plugin
  netlify lm:install
  ```

## Installation

```bash
git clone git@github.com:escaladesports/gatsby-boilerplate.git your-website
cd your-website
nvm use
yarn
yarn reset
```

## Usage

- `npm run dev`: Starts up live development server
- `npm run build`: Builds site for production
- `npm run reset`: Changes the project name in `package.json` to match the directory, resets the version number, and resets the git history.
- `npm run env`: Pulls Netlify environment variables into a local `.env` file. (Only works if you have logged into [netlifyctl](https://github.com/netlify/netlifyctl#command-line-login) at least once and have permissions to the Netlify site)

## Images

All UI related images that belong in the template can be stored in the repository in the `src` directory. Any images that need to be edited through the CMS should be stored in Cloudinary to prevent the repository size from getting out of control.

## Schema

The GraphQL schema is stored in `./src/schema.gql`. This is typically used to make sure the build script doesn't break whenever required fields in the markdown files are emptied out. If you delete the schema file, a snapshot of the current schema will be created the next time you run `yarn build` or `yarn dev`. This can be useful if you don't want to go through the hassle of writing it out yourself.

## Netlify CMS

Unless you're using the "invite only" option in Netlify Identity, make sure to add the "admin" role in the Git Gateway settings. Then add the "admin" role to any users you want to have access to the CMS.

You'll also need to point Netlify to your Netlify CMS email templates. These templates will change the Identity transactional emails to point to the `/admin` page instead of the home page. This can be found in the Netlify dashboard under "Settings -> Identity -> Emails". Change the template paths to:

- Invitation template: `/email-templates/cms-invitation`
- Confirmation template: `/email-templates/cms-confirmation`
- Recovery template: `/email-templates/cms-password-recovery`
- Email change template: `/email-templates/cms-email-change`