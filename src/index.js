#!/usr/bin/env node
"use strict";

var program = require('commander'),
	fs = require('fs'),
	byline = require('byline');

var toString = str => '' + str;
var toList = str => ('' + str).split(',');

program
	.version('0.1.0')
	.option('-p, --prefix <prefix,prefix>', "Set prefix", toList, [])
	.option('-f, --file <path>', "Input file, defaults to /etc/hosts", toString, '/etc/hosts')
	.option('-u, --user <user>', "User", toString)
	.option('-o, --out <out>', "Output file", toString)
	.parse(process.argv);

if (!fs.lstatSync(program.file).isFile()) {
	console.log('Input file to read must be a valid file. --file <path>');
	process.exit(1);
}

if (program.prefix.length < 1) {
	console.log('Please provide a list of valid prefixes. --prefix <prefix>');
	process.exit(1);
}

var stream = byline(fs.createReadStream(program.file), { encoding: 'utf8' });

var out = [];

stream.on('data', line => {
	if (line.match(new RegExp('(' + program.prefix.join('|') + ')'))) {
		let parts = line.split(/\s+/);
		let config = ['Host ' + parts[1]];

		config.push("\t" + 'HostName ' + parts[0]);

		if (program.user) {
			config.push("\t" + 'User ' + program.user);
		}

		if (program.identity) {
			config.push("\t" + 'IdentityFile ' + program.identity);
		}

		out.push(config.join("\n"));
	}
});

stream.on('end', () => {
	console.log(out.join("\n"))
});
