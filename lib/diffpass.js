var promptly = require('promptly');
var md5 = require('md5');

var diffpass = (function() {
  var DIFFPASS = 'diffpass';
  var ALPHANUM = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  var SYMBOL = '~!@#$%^&*()_+-={}[]|;:",<.>/ ?'.split('');
  var ALL = ALPHANUM.concat(SYMBOL);

  function generator(args, common, opts) {
    var infoStr = '';
    for (var i = 0; i < args.length; i++) {
      infoStr += args[i];
    }
    var firstMD5 = md5(infoStr);
    var secondMD5 = md5(common + convert(firstMD5, ALPHANUM) + DIFFPASS);

    var password = '';
    if (opts.symbol) {
      password = convert(secondMD5 + firstMD5, ALL);
    } else {
      password = convert(secondMD5 + firstMD5, ALPHANUM);
    }

    password = password.substr(0, opts.length);
    console.log(password);
  }

  function convert(str, arr) {
    var aStr = str.split('');
    var N = arr.length;
    var password = '';
    for (var i = 0; i < aStr.length; i += 2) {
      var index = (parseInt(aStr[i], 16) * 16 + parseInt(aStr[i + 1], 16)) % N;
      password += arr[index];
    }
    return password;
  }

  return function(args, opts) {
    var option = {
      length: opts.length || 16,
      symbol: opts.symbol
    };

    if (args.length) {
      promptly.password('Common password: ', function (err, value) {
        generator(args, value, option);
      });
    } else {
      promptly.prompt('Software name: ', function (err, value) {
        args.push(value);
        promptly.password('Common password: ', function (err, value) {
          generator(args, value, option);
        });
      });
    }
  };
})();

module.exports = diffpass;
