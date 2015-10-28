'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var radio = require('backbone.radio');

var SettingsForm = Backbone.View.extend({
  el: "[data-settings-form]",

  events: {
    "keyup input": "tokenChanged",
    "paste input": "tokenChanged"
  },

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render, this);
    this.listenTo(this.model, "change", this.notifyTokenChanged, this);
  },

  tokenChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setToken, this), 200);
  },

  setToken: function() {
    this.model.set("token", this.tokenField().val());
  },

  notifyTokenChanged: function() {
    radio.channel("settings").trigger("token:changed", this.model.get("token"));
  },

  template: function() {
    if (this._template) { return this._template; }
    return(this._template = _.template($("#settings-form-template").html()));
  },

  render: function() {
    this.$el.html(this.template()(this.model.toJSON()));
  },

  tokenField: function() {
    return(this.$el.find("input"));
    // caching the field also caches the val(), that's weird...
    // return(this._tokenField || (this._tokenField = this.$el.find("input")))
  }
})

export { SettingsForm }
