'use strict';

var app = require('remote').require('app');
var env = window.env;
var radio = require('backbone.radio');
var path = require('path');
var touch = require('touch')
var _ = require('underscore')

class LogWatcher {
  start() {
    this.refreshLogsPeriodically();

    this.follower().on('line', function(fn, log) {
      radio.channel('log').trigger("new", log)
    });
  }

  stop() {
    this.stopRefreshing();
    this.stopWatching();
  }

  refreshLogsPeriodically() {
    touch(this.logsPath(), { nocreate: true });
    this.currentTimeout = setTimeout(_.bind(this.refreshLogsPeriodically, this), 4000);
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

  // Sends parsed logs to the PoM server,
  // but only if they are sent by authorized characters (todo)
  sendLog(log) { logger.sendLog(log) }
}

export { LogWatcher }
