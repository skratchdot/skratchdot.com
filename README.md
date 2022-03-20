# skratchdot.com

I started a website back in the early 2000's to share projects that I created. Over the years, I haven't
really maintained a blog, but I've continued to migrate my site from one blog technology to the next
(to learn about the different solutions). I've tried Drupal, Wordpress, Jekyll, etc. Currently I'm using
[Next.js](https://nextjs.org/) to generate my static blog.

If you feel like copying any of the code, or running this blog locally, feel free to follow the instructions below.

Thanks!

## Run locally

To run the repo, you need to have some tools like git and npm installed already.
You can clone the repo, install the npm modules, and run the blog via the following commands:

```bash
git clone https://github.com/skratchdot/skratchdot.com.git
cd skratchdot.com
npm install
npm run dev
```

## Deploy

Currently, I'm using firebase for hosting.

The firebase hosting docs are here:

- https://firebase.google.com/docs/hosting

For deployment to work, you need to install `firebase-tools` via:

```bash
npm install -g firebase-tools
```

To perform a deployment, run:

```bash
npm run deploy
```

## Links

- Main Site: [https://www.skratchdot.com](https://www.skratchdot.com)
- Source Code: [https://github.com/skratchdot/skratchdot.com/](https://github.com/skratchdot/skratchdot.com/)
- Github Page: [https://github.com/skratchdot](https://github.com/skratchdot)
