'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var radio = require('backbone.radio');

var SettingsForm = Backbone.View.extend({
  el: "[data-settings-form]",

  events: {
    "keyup [data-token-input]": "tokenChanged",
    "paste [data-token-input]": "tokenChanged",
    "keyup textarea": "charactersChanged",
    "paste textarea": "charactersChanged",
    "keyup [data-logs-path-input]": "logsPathChanged",
    "paste [data-logs-path-input]": "logsPathChanged"
  },

  validLogPath: false,

  initialize: function(options) {
    this.render();

    radio.channel("logs").on({
      "watch:start": _.bind(this.validLogs, this),
      "watch:stop": _.bind(this.invalidLogs, this)
    });

    this.model.set("token", window.storage.get("token"));
    this.model.set("characters", window.storage.get("characters"));
    this.model.set("logs_path", window.storage.get("logs_path"));
  },

  serializeData: function() {
    return _.extend(this.model.toJSON(), {
      validLogPath: this.validLogPath
    })
  },

  tokenChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setToken, this), 200);
  },

  charactersChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setCharacters, this), 200);
  },

  logsPathChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setLogsPath, this), 1000);
  },

  setToken: function() {
    this.model.set("token", this.$el.find("[data-token-input]").val());
  },

  setCharacters: function() {
    this.model.set("characters", this.$el.find("textarea").val());
  },

  setLogsPath: function() {
    this.model.set("logs_path", this.$el.find("[data-logs-path-input]").val());
  },

  template: function() {
    if (this._template) { return this._template; }
    return(this._template = _.template($("#settings-form-template").html()));
  },

  validLogs: function() {
    this.validLogPath = true;
    this.render();
  },

  invalidLogs: function() {
    this.validLogPath = false;
    this.render();
  },

  render: function() {
    this.$el.html(this.template()(this.serializeData()));
  }
})

export { SettingsForm }
