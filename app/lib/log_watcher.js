'use strict';

var app = require('remote').require('app');
var env = window.env;
var radio = require('backbone.radio');
var path = require('path');
var touch = require('touch')
var _ = require('underscore')

import { Log } from "./log"

// remove
window.Log = Log

class LogWatcher {
  start() {
    this.refreshLogsPeriodically();
    this.watchLogs();

    radio.channel("app").on("stop", _.bind(this.stop, this));
  }

  watchLogs() {
    this.follower().on('line', function(fn, log) {
      radio.channel('log').trigger("new", new Log(log))
    });
  }

  stop() {
    this.stopRefreshing();
    this.stopWatching();
  }

  // forces the log file to update every few seconds
  refreshLogsPeriodically() {
    touch(this.logsPath(), { nocreate: true });
    this.currentTimeout = setTimeout(_.bind(this.refreshLogsPeriodically, this), this.refreshDelay());
  }

  // Log file watcher
  follower() {
    if (this._follower) { return this._follower; }

    var follow = require('text-file-follower');
    return (this._follower = follow(this.logsPath()));
  }

  stopRefreshing() {
    if (this.currentTimeout) { clearTimeout(this.currentTimeout) }
  }

  stopWatching() { this.follower().close(); }

  // Path to the log file on the user machine
  logsPath() {
    return (
      this._logsPath ||
      (this._logsPath = path.resolve.apply(this, env.logs_path))
    );
  }

  refreshDelay() { return 4000; }
}

export { LogWatcher }
