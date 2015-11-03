'use strict';

var Backbone = require('backbone');

var Setting = Backbone.Model.extend({
  defaults: {
    token: "",
    characters: ""
  },

  initialize: function() {
    this.set("token", window.storage.get("token"));
    this.set("characters", window.storage.get("characters"));
  }
})

export { Setting }
