'use strict';

var app = require('remote').require('app');
var env = window.env;
var radio = require('backbone.radio');

class LogWatcher {
  watch() {
    this.follower().on('line', function(fn, log) {
      radio.channel('log').trigger("new", log)
    });
  }

  // Log file watcher
  follower() {
    if (this._follower) { return this._follower; }

    var follow = require('text-file-follower');
    return (this._follower = follow(this.logsPath()));
  }

  stop() {
    this.follower().close();
  }

  // Path to the log file on the user machine
  logsPath() {
    return app.getAppPath() + env.logs_path
  }

  // Sends parsed logs to the PoM server,
  // but only if they are recognized commands
  sendLog(log) {
    logger.sendLog(log)
  }
}

export { LogWatcher }
