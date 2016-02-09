# Node Library for the Slack APIs

[![Build Status](https://travis-ci.org/slackhq/node-slack-client.svg?branch=master)](https://travis-ci.org/slackhq/node-slack-client)

## Motivation

This is a wrapper around the Slack [RTM](https://api.slack.com/rtm) and [Web](https://api.slack.com/web) APIs.

This library will provide the low level functionality you need to build reliable apps and projects on top of Slack's APIs. It:
- handles reconnection logic and request retries
- provides reasonable defaults for events and logging
- defines a basic model layer and data-store for caching Slack RTM API responses

This library does not attempt to provide application level support, e.g. regex matching and filtering of the conversation stream. If you're looking for those kinds of features, you should check out one of the great libraries built on top of this.

## Installation

```bashp
npm install slack-client@2.0.0-beta.8 --save
```

## Usage

* [RTM Client](#rtm-client)
  * [Creating an RTM client](#creating-an-rtm-client)
  * [Listen to messages](#listen-to-messsages)
  * [Send messages](#send-messages)

## RTM Client

The [Real Time Messaging client](lib/clients/rtm) connects to [Slack's RTM API](https://api.slack.com/rtm) over a websocket.

It allows you to listen for activity in the Slack team you've connected to and push simple messages back to that team over the websocket.

### Creating an RTM client

```js

var RtmClient = require('slack-client').RtmClient;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

```

### Listen to messages

```js

var RTM_EVENTS = require('slack-client').EVENTS.API.EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});

```

### Send messages

```js

var RTM_CLIENT_EVENTS = require('slack-client').EVENTS.CLIENT.RTM;

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage('this is a test message', 'C0CHZA86Q', function messageSent() {
    // optionally, you can supply a callback to execute once the message has been sent
  });
});

```

## Copyright

Copyright &copy; Slack Technologies, Inc. MIT License; see LICENSE for further details.
