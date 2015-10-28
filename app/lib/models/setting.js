'use strict';

var Backbone = require('backbone');

var Setting = Backbone.Model.extend({
  defaults: {
    token: ""
  },

  initialize: function() {
    this.set("token", window.storage.get("token"));
  }
})

export { Setting }
