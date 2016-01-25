var expect = require('chai').expect;
var lodash = require('lodash');

var helpers = require('../../lib/clients/helpers');


describe('Client Helpers', function () {
  describe('#parseAPIResponse()', function () {
    it('should process a JSON  string, converting it to JSON with camel-cased keys', function () {
      var testMsg = {
        ok: true,
        reply_to: 1,
        ts: '1355517523.000005',
        text: 'Hello world',
      };
      var message = helpers.parseAPIResponse(JSON.stringify(testMsg));

      expect(message).to.deep.equal({
        ok: true,
        replyTo: 1,
        ts: '1355517523.000005',
        text: 'Hello world',
      });
    });
  });

  describe('#getData()', function () {
    it('merges the opts value into the top level data object and then removes opts', function () {
      var testData = {
        channel: 'slack',
        opts: {
          count: 125,
        },
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        count: 125,
        token: 'test',
      });
    });

    it('prunes undefined and null values from the data object', function () {
      var testData = {
        channel: 'slack',
        opt_count: undefined,
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        token: 'test',
      });
    });

    it('handles undefined data object', function () {
      var testData = undefined;

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        token: 'test',
      });
    });
  });

  describe('#getAPICallArgs()', function () {
    it('returns an empty object and noop fn when called with no data or cb', function () {
      var callArgs = helpers.getAPICallArgs('test');
      expect(callArgs.data).to.deep.equal({
        token: 'test',
      });
      expect(callArgs.cb).to.deep.equal(lodash.noop);
    });

    it('returns the supplied object and noop fn when called with an object and no cb', function () {
      var callArgs = helpers.getAPICallArgs('test', { test: 1 });
      expect(callArgs.data).to.deep.equal({
        test: 1,
        token: 'test',
      });
      expect(callArgs.cb).to.deep.equal(lodash.noop);
    });

    it('returns the supplied cb and empty object when called with a cb and no object', function () {
      var testCb = function testCb() {};
      var callArgs = helpers.getAPICallArgs('test', testCb);
      expect(callArgs.data).to.deep.equal({
        token: 'test',
      });
      expect(callArgs.cb).to.deep.equal(testCb);
    });

    it('returns the supplied object and cb when called with an object and cb', function () {
      var testCb = function testCb() {};
      var callArgs = helpers.getAPICallArgs('test', { test: 1 }, testCb);
      expect(callArgs.data).to.deep.equal({
        test: 1,
        token: 'test',
      });
      expect(callArgs.cb).to.deep.equal(testCb);
    });
  });
});
