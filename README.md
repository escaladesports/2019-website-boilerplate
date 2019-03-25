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
git remote add origin git@github.com:REMOTE_GIT_SITE.git
git push
```

- Setup new Netlify site using your new repo
  - Make note of, or change, your new site's Site Name in the General configurations
- Edit the `site-config.js` file, in the project root, changing the URL for the `siteUrl` key (ie. `siteUrl: process.env.URL || 'https://{SITE_NAME}.netlify.com',`)
- From the project root, run `netlify link`
  - Select 'Site Name' to link the repo by, using the Site Name from above
- From the project root, run `netlify lm:setup`

## Common Gotchas

- Be sure to include `SALSIFY_API_KEY` and `SALSIFY_ORG` in your environment variables, or comment out the `source-salsify` plugin from the `gatsby-config.js` file. Failing to do so will result in build failing.
- If you are being pestered to supply a username and password for LFS locking, enter the disabling command it provides:

```git config lfs.https://{SITE_ID}.netlify.com/.netlify/large-media.locksverify false```

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