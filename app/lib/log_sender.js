'use strict';

var radio = require('backbone.radio');
var _ = require('underscore');

import { API } from "./api"

// Listens to the log channel, and send any valid log
// to the server

class LogSender {
  constructor() {
    this.api = new API();
  }

  start() {
    this.logChannel().on("new", _.bind(this.send, this));
  }

  send(log) {
    if (!log.isValid()) return;

    this.api.send(log);
  }

  logChannel() { return radio.channel('log'); }
}

export { LogSender }
