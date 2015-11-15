'use strict';

var $ = require('jquery');
var _ = require('underscore')
var radio = require('backbone.radio');

class LogNotifier {
  constructor() {
    this.$logs = $("[data-logs=base]")
  }

  start() {
    radio.channel("log").on("new",
      _.bind(this.display, this)
    );

    radio.channel("errors").on("error",
      _.bind(this.displayError, this)
    );
  }

  display(log) {
    if (!log.isValid()) return;
    this.$logs.append(this.template()({ log: log.toS() }));
  }

  displayError(error) {
    this.$logs.append(this.errorTemplate()({ error: error }));
  }

  template() {
    if (this._template) { return this._template; }

    return(this._template = _.template(
      "<li class='log'>\
      Sending: <%= log %>\
      </li>"
    ));
  }

  errorTemplate() {
    if (this._errorTemplate) { return this._errorTemplate; }

    return(this._errorTemplate = _.template(
      "<li class='error log'>\
      Error: <%= error %>\
      </li>"
    ));
  }
}

export { LogNotifier }
