'use strict';

var app = require('remote').require('app');
var radio = require('backbone.radio');
var _ = require('underscore');
var $ = require('jquery');

import { LogWatcher } from "./log_watcher"
import { LogSender } from "./log_sender"
import { LogNotifier } from "./log_notifier"
import { SettingsForm } from "./views/settings_form"
import { Setting } from "./models/setting"
import { Storage } from "./storage";
window.storage = new Storage();

class Popom {
  start() {
    this.watcher();
    this.sender().start();
    this.notifier().start();

    this.renderSettingsForm();

    // radio.channel("settings").on({
    //   "change:token": function(token) {
    //     console.log("token changed:", token)
    //     storage.set("token", token);
    //   },
    //   "change:characters": function(characters) {
    //     console.log("characters changed:", characters)
    //     storage.set("characters", characters);
    //   },
    //   "change:logs_path": function(logs_path) {
    //     console.log("logs_path changed:", logs_path)
    //     ;
    //   },
    // })

    app.on('window-all-closed', _.bind(this.stop, this));
  }

  renderSettingsForm() {
    var setting = new Setting();
    var form = new SettingsForm({ model: setting });
    form.render();
  }

  stop() { radio.channel("app").trigger("stop"); }

  notifier()  { return this._notifier  || (this._notifier  = new LogNotifier()); }
  sender()    { return this._sender    || (this._sender    = new LogSender()); }
  watcher()   { return this._watcher   || (this._watcher   = new LogWatcher()); }

}

export { Popom }
