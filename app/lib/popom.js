'use strict';

var app = require('remote').require('app');
var radio = require('backbone.radio');
var _ = require('underscore');

import { LogWatcher } from "./log_watcher"
import { LogSender } from "./log_sender"
import { LogNotifier } from "./log_notifier"

class Popom {

  start() {
    this.watcher().start();
    this.sender().start();
    this.notifier().start();

    app.on('window-all-closed', _.bind(this.stop, this));
  }

  stop() { radio.channel("app").trigger("stop"); }

  notifier()  { return this._notifier  || (this._notifier  = new LogNotifier()); }
  sender()    { return this._sender    || (this._sender    = new LogSender()); }
  watcher()   { return this._watcher   || (this._watcher   = new LogWatcher()); }

}

export { Popom }
