#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const argv = require('yargs').argv;

if (argv._.length) {
    process.env.WEBPACK_TURNKEY_ENTRY = argv._;
}
if (argv.eslint) {
    process.env.WEBPACK_TURNKEY_ESLINT = true;
    delete argv['eslint'];
}
if (argv.sourmap) {
    process.env.WEBPACK_TURNKEY_SOURCEMAP = true;
    delete argv['sourcemap'];
}

// Parse command options
const options = require('../lib/options')(argv);
if (process.env.NODE_ENV == 'prod') options.push(`-p`);
else options.push(`-d`);

spawn('npx', ['webpack'].concat(options), {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
});