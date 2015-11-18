'use strict';

var Backbone = require('backbone');
var radio = require('backbone.radio');
var _ = require("underscore");

var Setting = Backbone.Model.extend({
  defaults: {
    token: "",
    characters: "",
    logs_path: ""
  },

  initialize: function() {
    this.set("token", window.storage.get("token"));
    this.set("characters", window.storage.get("characters"));
    this.set("logs_path", window.storage.get("logs_path"));

    _.each(["token", "characters", "logs_path"], _.bind(function(attr) {
      var changeEvent = "change:" + attr
      this.on(changeEvent, function() {
        console.log(attr + " changed")
        radio.channel("settings").trigger(changeEvent, this.get(attr))
        storage.set(attr, this.get(attr))
      })
    }, this))
  }
})

export { Setting }
