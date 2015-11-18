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
    _.each(["token", "characters", "logs_path"], _.bind(function(attr) {
      var changeEvent = "change:" + attr
      this.on(changeEvent, function() {
        radio.channel("settings").trigger(changeEvent, this.get(attr))
        storage.set(attr, this.get(attr))
      })
    }, this))
  }
})

export { Setting }
