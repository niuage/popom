'use strict';

var app = require('remote').require('app');
var env = window.env;
var radio = require('backbone.radio');
var path = require('path');
var touch = require('touch')
var _ = require('underscore')
var follow = require('text-file-follower');
var fs = require('fs');

import { Log } from "./log"

class LogWatcher {
  constructor() {
    radio.channel("settings").on("change:logs_path", _.bind(function(logsPath) {
      try {
        fs.lstatSync(logsPath);
        this.start(logsPath);
      }
      catch(e) {
        this.stop();
      }
    }, this))
  }

  start(logsPath) {
    this.stop();

    radio.channel("logs").trigger("watch:start");

    this.setLogsFile(logsPath);

    this.refreshLogsPeriodically();
    this.watchLogs();

    radio.channel("app").on("stop", _.bind(this.stop, this));

    this.started = true
  }

  watchLogs() {
    this.follower().on('line', function(fn, log) {
      radio.channel('log').trigger("new", new Log(log))
    });
  }

  stop() {
    if (!this.started) return;

    radio.channel("logs").trigger("watch:stop");

    this.stopRefreshing();
    this.stopWatching();
    this.logFile = null;

    this.started = false;
  }

  // forces the log file to update every few seconds
  refreshLogsPeriodically() {
    touch(this.logsFile, { nocreate: true });
    this.currentTimeout = setTimeout(_.bind(this.refreshLogsPeriodically, this), this.refreshDelay());
  }

  // Log file watcher
  follower() {
    if (this._follower) { return this._follower; }
    return (this._follower = follow(this.logsFile));
  }

  stopRefreshing() {
    if (this.currentTimeout) { clearTimeout(this.currentTimeout) }
  }

  stopWatching() {
    this.follower().close();
    this._follower = null
  }

  setLogsFile(logsPath) {
    this.logsFile = path.resolve(logsPath)
  }

  refreshDelay() { return 4000; }
}

export { LogWatcher }
