#!/usr/bin/env node

var program = require('commander');
var diffpass = require('../lib/diffpass');

program
  .version('1.0.0')
  .option('-l, --length <n>', 'password length', parseInt)
  .option('-s, --symbol', 'enable symbol')
  .parse(process.argv);

diffpass(program.args, {
  length: program.length,
  symbol: program.symbol
});
