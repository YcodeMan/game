require('jsdom-global')();
var assert = require('assert');
var expect = require('chai').expect; // 引入Chai
var test = require('../assets/js/2048.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal([1,2,3].indexOf(4), -1); // node 自带的断言库
      expect([1,2,3].indexOf(4)).to.equal(-1); // Chai expect 形式断言语句
    });
  });
});
describe('Object', function () {
	describe('#game.init()', function () {
		it('test game.init return {}', function () {
		expect(test).to.be.an('Object');
	});
  });
});
