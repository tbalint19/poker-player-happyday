'use strict';
let appSettings = require('../config');

class Logger {
  static log(name = '', stack = '') {
    if(appSettings.useLog) {
      if(name == '') {
        console.log('=====');
      } else {
        if(stack === '') {
          console.log(name);
        } else {
          console.log(name, stack);
        }
      }
    }
  }
}

module.exports = Logger;
