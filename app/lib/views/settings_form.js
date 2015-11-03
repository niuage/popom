'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var radio = require('backbone.radio');

var SettingsForm = Backbone.View.extend({
  el: "[data-settings-form]",

  events: {
    "keyup input": "tokenChanged",
    "paste input": "tokenChanged",
    "keyup textarea": "charactersChanged",
    "paste textarea": "charactersChanged"
  },

  initialize: function(options) {
    this.listenTo(this.model, "change:token", this.notifyTokenChanged, this);
    this.listenTo(this.model, "change:characters", this.notifyCharactersChanged, this);

    this.render();
  },

  tokenChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setToken, this), 200);
  },

  charactersChanged: function() {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(_.bind(this.setCharacters, this), 200);
  },

  setToken: function() {
    this.model.set("token", this.tokenField().val());
  },

  setCharacters: function() {
    this.model.set("characters", this.characterTextarea().val());
  },

  notifyTokenChanged: function() {
    radio.channel("settings").trigger("change:token", this.model.get("token"));
  },

  notifyCharactersChanged: function() {
    radio.channel("settings").trigger("change:characters", this.model.get("characters"));
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
    // caching the field also caches the val(), that's unexpected...
    // return(this._tokenField || (this._tokenField = this.$el.find("input")))
  },

  characterTextarea: function() {
    return(this.$el.find("textarea"));
  }
})

export { SettingsForm }
