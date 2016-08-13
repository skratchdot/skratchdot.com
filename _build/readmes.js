#!/usr/bin/env node
var async = require('async');
var nugget = require('nugget');
var fs = require('fs');
var remoteUrls = require('../.remoteurls').remoteUrls;

var fixRemote = function () {
  var content, header;
  remoteUrls.forEach(function (item) {
    content = fs.readFileSync(item.dest, 'utf-8');

    // append header
    if (content.indexOf('---\n') !== 0) {
      header = '---\n' +
        'layout: ' + JSON.stringify(item.layout) + '\n' +
        'title: ' + JSON.stringify(item.title) + '\n' +
        '---\n';
      content = header + content;
    }

    // fix highlights
    content = content.replace(/\n```([a-zA-Z0-9]+)/gi, function () {
        return '\n{% highlight ' + arguments[1] + ' %}';
    });
    content = content.replace(/\n```/gi, function () {
      return '\n{% endhighlight %}';
    });

    // write file
    console.log(item.dest);
    fs.writeFileSync(item.dest, content, 'utf-8');
  });
};

var getRemote = function () {
  console.log('Downloading README files...');
  async.each(remoteUrls, (item, callback) => {
    console.log(item.src);
    nugget([item.src], {
      target: item.dest,
      quiet: true
    }, callback);
  }, (err, items) => {
    console.log('Fixing README files');
    fixRemote();
  });
};

getRemote();
