var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    winston = require('winston'),
    helpers = require('winston/test/helpers'),
    LogstashAMQP = require('../lib/winston-logstash-amqp').LogstashAMQP;

//var config = helpers.loadConfig(__dirname);

vows.describe('winston-logstash-amqp').addBatch({
 "An instance of the LogstashAMQP Transport": {
    topic: function() {
      return new (LogstashAMQP)(config.transports.amqp);
    },
    "is an instance of the LogstashAMQP transport": function(topic) {
      assert.instanceOf(topic, LogstashAMQP);
    },
    "has a log function defined": function (topic) {      
      assert.isFunction(topic.log);
    }
    // "the log() method": helpers.testNpmLevels(transport, "should log messages to LogstashAMQP server", function (ign, err, logged) {
    //   assert.isTrue(!err);
    //   assert.isTrue(logged);
    // })
  },
  "An LogstashAMQP Transport instance with a custom exchange definition": {
    topic: function() {
      return new (LogstashAMQP)({
        exchange: {
          name: "winston.log",
          properties: {
            durable: true,
            type: "topic"
          }
        }
      });
    },
    "properly sets the exchange name": function(topic) {
      assert.equal(topic.exchange.name, "winston.log");
    },
    "properly sets the exchange properties": function(topic) {
      assert.deepEqual(topic.exchange.properties, {
        durable: true,
        type: "topic"
      });
    }
  },
  "An LogstashAMQP Transport instance with no custom transform message function specified": {
    topic: function() {
      return new (LogstashAMQP)();
    },
    "uses the default message transform function": function(topic) {
      var level = "info"
        , msg = "my message"
        , meta = { propertyName: "propertyValue" };

      var actualTransformedMessage = topic.transformMessage(level, msg, meta)
        , expectedTransformedMessage = topic.defaultTransformMessage(level, msg, meta);

      assert.deepEqual(actualTransformedMessage, expectedTransformedMessage);
    }
  },
  "An LogstashAMQP Transport instance with a custom transform message function specified": {
    topic: function() {
      return new (LogstashAMQP)({
        transformMessage: function(level, msg, meta) {
          return level + "::" + msg + "::" + JSON.stringify(meta);
        }
      });
    },
    "uses the custom transform message function": function(topic) {
      var level = "info"
        , msg = "my message"
        , meta = { propertyName: "propertyValue" };

      var actualTransformedMessage = topic.transformMessage(level, msg, meta)
        , expectedTransformedMessage = "info::my message::{\"propertyName\":\"propertyValue\"}";

      assert.equal(actualTransformedMessage, expectedTransformedMessage);
    }
  }
}).export(module);

/*.addBatch({
  "An instance of the LogstashAMQP Transport": {
    "when the timeout has fired": {
      topic: function () {
        setTimeout(this.callback, config.transports.amqp.keepAlive);
      },
      "the log() method": helpers.testNpmLevels(transport, "should log messages to LogstashAMQP server", function (ign, err, logged) {
        assert.isTrue(!err);
        assert.isTrue(logged);
      })
    }
  }
})*/
