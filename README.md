# winston-logstash-amqp

A AMQP transport for [winston][0] that publishes logs consumed by Logstash.
Use [winston][0] logging with RabbitMQ to react on log messages.
Inspired by [winston-amqp][1].

## Installation

### Installing winston-logstash-amqp
```bash
  npm install --save winston-logstash-amqp
```

## Usage
``` js
  var LogstashAMQP = require('winston-logstash-amqp').LogstashAMQP;
  winston.add(LogstashAMQP, options);
```

The LogstashAMQP transport takes the following options:

* __host:__ The host running RabbitMQ, defaults to localhost.
* __port:__ The port on the host that RabbitMQ is running on, defaults to 5672.
* __vhost:__ virtual host entry for the RabbitMQ server, defaults to '/'
* __login:__ login for the RabbitMQ server, defaults to 'guest'
* __password:__ password for the RabbitMQ server, defaults to 'guest'
* __level:__ Level of messages that this transport should log. 
* __silent:__ Boolean flag indicating whether to suppress output.
* __routingKey:__ The routing key to use when publishing to the defined exchange.
* __appName:__ The application name to place in `@fields`


[0]: https://github.com/indexzero/winston
[1]: https://github.com/kr1sp1n/winston-ampq
