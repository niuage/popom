'use strict';

var $ = require('jquery');
var _ = require('underscore')
var radio = require('backbone.radio');

class LogNotifier {
  constructor() {
    this.$logs = $("[data-logs=base]")
    console.log(this.$logs)
  }

  start() {
    this.displaNewLogs();
  }

  displaNewLogs() {
    radio.channel("log").on("new", _.bind(this.display, this));
  }

  display(log) {
    this.$logs.append(this.template()({ log: log }));
  }

  template() {
    if (this._template) { return this._template; }

    return(this._template = _.template(
      "<li>\
      Sending: <%= log %>\
      </li>"
    ));
  }
}

export { LogNotifier }
