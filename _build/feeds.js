const { Feed } = require('feed');
const fs = require('fs');
const fse = require('fs-extra');
const matter = require('gray-matter');
const marked = require('marked');
const path = require('path');

// see: src/lib/posts.ts
const getAllPosts = async () => {
  const posts = [];
  const postsDirectory = path.resolve(__dirname, '../_posts/');
  const filenames = await fs.promises.readdir(postsDirectory);
  for (let filename of filenames) {
    const pathname = path.resolve(postsDirectory, filename);
    const fileContent = await fs.promises.readFile(pathname, 'utf8');
    const {
      content: markdownContent,
      excerpt,
      data: frontmatter,
    } = matter(fileContent, { excerpt: true });
    const html = marked.parse(markdownContent);
    const slugWithDate = path.parse(filename).name;
    const [year, month, day, ...rest] = slugWithDate.split('-');
    const slug = rest.join('-');
    const postDate = new Date(
      parseFloat(year),
      parseFloat(month) - 1,
      parseFloat(day)
    );
    const post = {
      postDate,
      year,
      month,
      day,
      slug,
      filename,
      // pathname,
      // fileContent,
      // markdownContent,
      html,
      // excerpt,
      frontmatter,
    };
    // make sure newest posts show up first
    posts.unshift(post);
  }
  return posts;
};

const generateFeeds = async () => {
  const posts = await getAllPosts();
  const author = {
    name: 'skratchdot',
    email: 'jeff@skratchdot.com',
    link: 'https://www.skratchdot.com/',
  };
  const feed = new Feed({
    title: 'skratchdot',
    description: 'The skratchdot.com feed',
    id: 'https://www.skratchdot.com/',
    link: 'https://www.skratchdot.com/',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: 'https://www.skratchdot.com/images/logo.png',
    favicon: 'https://www.skratchdot.com/favicon.ico',
    copyright: `Copyright © ${new Date().getFullYear()} skratchdot`,
    updated: posts[0].postDate,
    generator:
      'https://github.com/skratchdot/skratchdot.com/blob/master/_build/feeds.js',
    feedLinks: {
      json: 'https://www.skratchdot.com/json',
      atom: 'https://www.skratchdot.com/atom.xml',
    },
    author: author,
  });
  posts.forEach((post) => {
    const postUrl = `https://www.skratchdot.com/${post.year}/${post.month}/${post.slug}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: postUrl,
      link: postUrl,
      // description: post.description,
      content: post.html,
      author: [author],
      contributor: [author],
      date: post.postDate,
      // image: post.image,
    });
  });

  const atomFeed = feed.atom1();
  const jsonFeed = feed.json1();
  const rssFeed = feed.rss2();

  await fse.outputFile(
    path.resolve(__dirname, '../public/atom.xml'),
    atomFeed,
    'utf-8'
  );
  await fse.outputFile(
    path.resolve(__dirname, '../public/feed.json'),
    jsonFeed,
    'utf-8'
  );
  await fse.outputFile(
    path.resolve(__dirname, '../public/feed.xml'),
    rssFeed,
    'utf-8'
  );
};

generateFeeds();
