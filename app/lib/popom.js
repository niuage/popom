'use strict';

var app = require('remote').require('app');
var radio = require('backbone.radio');
var _ = require('underscore');

import { LogWatcher } from "./log_watcher"
import { Log } from "./log"
import { API } from "./api"

class Popom {

  constructor() {
    this.logChannel().on("new", function(log) {
      var log = new Log(log)
      if (!log.isValid()) { return; }

      API.send(log)
    });

    app.on('window-all-closed', _.bind(this.stop, this));
  }

  start() { this.watcher().watch(); }
  stop()  { this.watcher().stop(); }

  watcher() { return this._watcher || (this._watcher = new LogWatcher()); }

  logChannel() { return radio.channel('log'); }

}

export { Popom }
