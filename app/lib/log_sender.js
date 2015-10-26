'use strict';

var radio = require('backbone.radio');
var _ = require('underscore');

import { API } from "./api"
import { Log } from "./log"

class LogSender {
  start() {
    this.logChannel().on("new", _.bind(this.send, this));
  }

  send(log) {
    var log = new Log(log)
    if (!log.isValid()) { return; }

    API.send(log)
  }

  logChannel() { return radio.channel('log'); }
}

export { LogSender }
