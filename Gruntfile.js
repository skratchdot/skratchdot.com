'use strict';

module.exports = function (grunt) {
	var fs = require('fs');
	var remoteUrls = require('./.remoteurls').remoteUrls;

	// this converts our remoteUrls to grunt-curl shorthand format (i.e. "dest":"src")
	var getCurl = function () {
		var map = {}, i;
		remoteUrls.forEach(function (item) {
			map[item.dest] = item.src;
		});
		return map;
	};

	// this appends yaml headers to our remoteUrls files
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
			fs.writeFileSync(item.dest, content, 'utf-8');
		});
	};

	var doDeployment = function () {
		var settings = grunt.config('skratchdot');
		if (settings.remote) {
			grunt.task.run('curl', 'fix-remote');
		}
		if (settings.javadocs) {
			grunt.task.run('exec:javadocs');
		}
		grunt.task.run('jekyll');
		if (settings.private) {
			grunt.task.run('copy:private');
		}
		if (settings.ftp) {
			grunt.task.run('clean:ftp', 'copy:ftp', 'ftp-deploy');
		}
	};

	// Project configuration.
	grunt.initConfig({
		clean: {
			ftp: '_ftp'
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: '_site',
					keepalive: true
				}
			}
		},
		copy: {
			ftp: {
				cwd: '_site',
				src: '**',
				dest: '_ftp',
				expand: true
			},
			private: {
				cwd: '_private',
				src: '**',
				dest: '_site',
				expand: true
			}
		},
		curl: getCurl(),
		exec: {
			javadocs: {
				cmd: 'sh ./_build/javadocs.sh &>/dev/null',
				stderr: false
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'www.skratchdot.com',
					port: 21,
					authKey: 'skratchdot'
				},
				src: './_ftp/',
				dest: '/',
				exclusions: []
			}
		},
		jekyll: {
			server: {
				src: './',
				dest: './_site'
			}
		},
		prompt: {
			build: {
				options: {
					questions: [{
						config: 'skratchdot.remote',
						type: 'confirm',
						default: false,
						message: 'Do you want to grab remote README files?'
					}, {
						config: 'skratchdot.private',
						type: 'confirm',
						default: false,
						message: 'Do you want to copy the private folder?'
					}, {
						config: 'skratchdot.javadocs',
						type: 'confirm',
						default: false,
						message: 'Do you want to build the javadocs?'
					}, {
						config: 'skratchdot.ftp',
						type: 'confirm',
						default: false,
						message: 'Do you want to FTP the site?'
					}]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-prompt');

	// Default task.
	grunt.registerTask('default', ['prompt', 'deploy']);
	grunt.registerTask('server', ['connect']);
	grunt.registerTask(
		'fix-remote',
		'Append yaml headers and make highlight replacements to remote url files.',
		fixRemote
	);
	grunt.registerTask('deploy', 'Trigger a deployment build.', doDeployment);

};