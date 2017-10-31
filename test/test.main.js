"use strict";

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var convertFunc = require('../');

var MockStream = function () {
  this.buffer = "";
};

MockStream.prototype.write = function (data) {
  this.buffer += data;
};

describe('npm2dot', function () {
  it('should be defined', function () {
    assert.ok(convertFunc);
  });

  it('should throw if passed object', function () {
    assert.throws(function () {
      convertFunc({});
    });
  });

  it('should parse the test.json', function () {
    var mockStream = new MockStream();
    convertFunc(fs.readFileSync(path.join(__dirname, 'test.json')).toString(), mockStream);
    assert.ok(mockStream.buffer.length > 10);
  });
})