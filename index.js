/*=================
author: jacktown<https:jacktown11.github.io>
date: 2019-01-08
version: 0.0.1
=================*/

/**
 * 
 * @param {string} fmt format string
 * y: year
 * M: month
 * d: day
 * h: hour
 * m: minute
 * s: second
 * S: millisecond 
 */
export function SimpleDateFormat(fmt) {
  if (typeof fmt === 'string') {
    this.fmt = fmt;
  } else {
    throw new Error('the SimpleDateFormatter\'s parameter must be a string');
  }
}

SimpleDateFormat.prototype = {
  constructor: SimpleDateFormat,

  /**
   * format a date object to string using the format string passed when new the SimpleDateFormat instance
   * @param {Date} dateObj the date object to be formatted
   */
  format: function (dateObj) {
    // wrong parameter type
    if (!(dateObj instanceof Date)) {
      throw new Error('wrong parameter type: only a Date\'s instance can be formatted.');
    }
    var d = dateObj,
      fmt = this.fmt;
    // RegExp string for searching date item
    var o = {
      'y+': '' + (d.getFullYear()), // year
      'M+': '' + (d.getMonth() + 1), // month
      'd+': '' + d.getDate(), //day
      'h+': '' + d.getHours(), //hour
      'm+': '' + d.getMinutes(), //minute
      's+': '' + d.getSeconds(), //second
      'S+': '' + d.getMilliseconds() //millisecond
    };

    // search in the format string for date item one by one
    for (var k in o) {
      var result = new RegExp(k).exec(fmt);
      // if date item found
      if (result) {
        var item, // the result string for each date item
          len = result[0].length;
        switch (k) {
          case 'y+':
            item = ('000' + o[k]).slice(-len);
            break;
          case 'S+':
            item = len < 3 ? o[k] : ('000' + o[k]).slice(-3);
            break;
          default:
            item = len < 2 ? o[k] : ('00' + o[k]).slice(-2);
            break;
        }
        fmt = fmt.replace(result[0], item);
      }
    }
    return fmt;
  },
  /**
   * convert a date string to Date object using the format string passed when new the SimpleDateFormat instance
   * @param {string} dateStr date string to be converted to Date object
   */
  parse: function (dateStr) {
    // wrong parameter type
    if (typeof dateStr !== 'string') {
      throw new Error('wrong parameter type: only string can be parsed.');
    }
    var d = new Date(0); // 1970-01-01 00:00:00
    // RegExp string for searching date item and the Date setter function of it
    var o = {
      'y+': d.setFullYear, // year
      'M+': d.setMonth, //month
      'd+': d.setDate, //day
      'h+': d.setHours, //hour
      'm+': d.setMinutes, //minute
      's+': d.setSeconds, //second
      'S+': d.setMilliseconds //millisecond
    };

    // find every date item in the format string
    // and sort them by their appearance order in the format string 
    var dateItems = [];
    for (var k in o) {
      var matches = new RegExp(k).exec(this.fmt);
      if (matches) {
        dateItems.push({
          key: k,
          func: o[k],
          pos: matches.index,
          match: matches[0],
          maxLen: k === 'y+' ? matches[0].length
            : k === 'S+' ? 3 : 2,
          value: 0
        });
      }
    }
    dateItems.sort(function (a, b) {
      return a.pos - b.pos;
    });

    // get each date item value
    var startPos = 0; // start index to start finding date item in the date string 
    for (var i = 0; i < dateItems.length; i++) {
      var item = dateItems[i];
      var leftStr = dateStr.slice(startPos);
      var itemReg = new RegExp('\\d{' + item.match.length + ',' + item.maxLen + '}');
      var result = leftStr.match(itemReg);
      if (result) {
        item.value = +result[0] - (item.key === 'M+');
        if (item.key === 'y+' && item.value < 1000) {
          var currentYear = new Date().getFullYear();
          if (item.value < 10) {
            item.value = Math.floor(currentYear / 10) * 10 + item.value % 10;
          } else if (item.value < 100) {
            item.value = Math.floor(currentYear / 100) * 100 + item.value % 100;
          } else if (item.value < 1000) {
            item.value = Math.floor(currentYear / 1000) * 1000 + item.value % 1000;
          }
        }
        o[item.key].call(d, item.value);
        startPos += result[0].length + result.index;
      } else {
        break;
      }
    }
    return d;
  }
};
