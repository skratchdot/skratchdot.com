#!/usr/bin/env node
const readmes = require('./readmes.json');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

(async () => {
  const { default: fetch } = await import('node-fetch');

  const getRemoteUrls = async () => {
    console.log('Downloading README files...');

    for (let readme of readmes) {
      const response = await fetch(readme.src);
      let content = await response.text();

      // append frontmatter
      content = [
        '---',
        `layout: "${readme.layout}"`,
        `title: "${readme.title}"`,
        '---\n',
        content,
      ].join('\n');

      // fix links
      [
        ['http://skratchdot.com', 'https://www.skratchdot.com'],
        ['http://www.skratchdot.com', 'https://www.skratchdot.com'],
        ['http://projects.skratchdot.com', 'https://projects.skratchdot.com'],
      ].forEach((arr) => {
        content = content.split(arr[0]).join(arr[1]);
      });

      // todo: fix highlights?

      const filepath = path.resolve(__dirname, `../${readme.dest}`);

      console.log(`Writing: ${filepath}`);
      await fse.outputFile(filepath, content, 'utf-8');
    }
  };

  await getRemoteUrls();
})();
