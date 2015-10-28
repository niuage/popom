'use strict';

var $ = require('jquery');
var _ = require('underscore')
var radio = require('backbone.radio');

class LogNotifier {
  constructor() {
    this.$logs = $("[data-logs=base]")
  }

  start() {
    this.displayNewLogs();
    this.displayErrors();
  }

  displayNewLogs() {
    radio.channel("log").on("new", _.bind(this.display, this));
  }

  displayErrors() {
    radio.channel("errors").on("error", _.bind(this.displayError, this));
  }

  display(log) {
    this.$logs.append(this.template()({ log: log }));
  }

  displayError(error) {
    this.$logs.append(this.errorTemplate()({ error: error }));
  }

  template() {
    if (this._template) { return this._template; }

    return(this._template = _.template(
      "<li>\
      Sending: <%= log %>\
      </li>"
    ));
  }

  errorTemplate() {
    if (this._errorTemplate) { return this._errorTemplate; }

    return(this._errorTemplate = _.template(
      "<li>\
      Error: <%= error %>\
      </li>"
    ));
  }
}

export { LogNotifier }
