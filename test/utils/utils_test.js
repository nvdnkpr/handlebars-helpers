/**
 * Handlebars Helpers Tests: Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */


require('should');
var Glob = require('../../lib/utils/glob');
var Utils = require('../../lib/utils/utils');
var Handlebars = require('handlebars');


var content, expected, data, actual;

describe('utils', function() {
  describe('trim', function() {
    it('should trim off white space', function() {
      content = "  test  ";
      expected = "test";
      actual = Utils.trim(content);
      actual.should.equal(expected);
    });
  });

  describe('lowercase', function() {
    it('should convert a string to lowercase', function() {
      content = "This IS a TEST StRiNg";
      expected = "this is a test string";
      actual = Utils.lowerCase(content);
      actual.should.equal(expected);
    });
  });

  describe('object globbing', function() {
    describe('buildObjectPaths', function() {
      it('should an array of paths that look like file paths but with object keys', function() {
        data = {
          foo: 'bar',
          baz: {
            foo2: 'bar2'
          }
        };
        actual = Glob.buildObjectPaths(data);
      });
    });

    describe('globObject', function() {
      it('should a new object only containing keys that match the given pattern', function() {
        data = {
          foo: 'bar',
          baz: {
            foo2: 'bar2'
          }
        };
        expected = ['baz/foo2'];
        actual = Glob.globObject(data, '**');
      });
    });
  });

  describe('#SafeString', function() {
    /* jshint eqeqeq: false */
    it("constructing a safestring from a string and checking its type", function() {
      var safe = new Handlebars.SafeString("testing 1, 2, 3");
      safe.should.be.instanceof(Handlebars.SafeString);
      (safe == "testing 1, 2, 3").should.equal(true, "SafeString is equivalent to its underlying string");
    });
    it("it should not escape SafeString properties", function() {
      var name = new Handlebars.SafeString("<em>Sean O&#x27;Malley</em>");
      var source = '{{name}}';
      var template = Handlebars.compile(source);
      template({ name: name }).should.equal('<em>Sean O&#x27;Malley</em>');
    });
  });

  describe('#escapeExpression', function() {
    it('shouhld escape html', function() {
      Handlebars.Utils.escapeExpression('foo<&"\'>').should.equal('foo&lt;&amp;&quot;&#x27;&gt;');
    });
    it('should not escape SafeString', function() {
      var string = new Handlebars.SafeString('foo<&"\'>');
      Handlebars.Utils.escapeExpression(string).should.equal('foo<&"\'>');
    });
    it('should handle falsy', function() {
      Handlebars.Utils.escapeExpression('').should.equal('');
      Handlebars.Utils.escapeExpression(undefined).should.equal('');
      Handlebars.Utils.escapeExpression(null).should.equal('');
      Handlebars.Utils.escapeExpression(false).should.equal('');
      Handlebars.Utils.escapeExpression(0).should.equal(0);
    });
  });

  describe('#isEmpty', function() {
    it('should not be empty', function() {
      Handlebars.Utils.isEmpty(undefined).should.equal(true);
      Handlebars.Utils.isEmpty(null).should.equal(true);
      Handlebars.Utils.isEmpty(false).should.equal(true);
      Handlebars.Utils.isEmpty('').should.equal(true);
      Handlebars.Utils.isEmpty([]).should.equal(true);
    });

    it('should be empty', function() {
      Handlebars.Utils.isEmpty(0).should.equal(false);
      Handlebars.Utils.isEmpty([1]).should.equal(false);
      Handlebars.Utils.isEmpty('foo').should.equal(false);
      Handlebars.Utils.isEmpty({bar: 1}).should.equal(false);
    });
  });
});

