'use strict';
let appSettings = require('../config');

class Logger {
  static log(name = '', stack = undefined) {
    if(appSettings.useLog) {
      console.log(name, stack);
    }
  }
}

module.exports = Logger;
