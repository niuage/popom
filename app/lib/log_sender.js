'use strict';

var radio = require('backbone.radio');
var _ = require('underscore');

import { API } from "./api"
import { Log } from "./log"

class LogSender {
  constructor() {
    this.api = new API();
  }

  start() {
    this.logChannel().on("new", _.bind(this.send, this));
  }

  send(log) {
    var log = new Log(log)
    if (!log.isValid()) { return; }

    this.api.send(log);
  }

  logChannel() { return radio.channel('log'); }
}

export { LogSender }
