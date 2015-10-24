'use strict';

var app = require('remote').require('app');
var radio = require('backbone.radio');
var _ = require('underscore');

import { LogWatcher } from "./log_watcher"
import { Log } from "./log"
import { API } from "./api"

class Popom {

  start() {
    this.watcher().watch()

    radio.channel('log').on({
      new: function(log) {
        var log = new Log(log)
        if (!log.isValid()) { return; }

        API.send(log)
      }
    })

    app.on('window-all-closed', _.bind(this.stop, this));
  }

  stop() {
    this.watcher().stop()
  }

  watcher() {
    return(this._watcher || (this._watcher = new LogWatcher()))
  }
}

export { Popom }
