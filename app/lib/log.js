'use strict';

var _ = require("underscore");

class Log {
  constructor(log) {
    this.log = log
  }

  toS() {
    return this.log;
  }

  isValid() {
    if (!this.log) return false;
    if (!this.userCharacters().length) return false;
    if (!this.validFormat()) return false;

    return true;
  }

  validFormat() {
    return this.logRegexp().test(this.log)
  }

  userCharacters() {
    var characters = window.storage.get("characters")
    return characters ? _.compact(characters.split(/\r?\n/)) : []
  }

  logRegexp() {
    var commandPrompt = ">" // customizable?
    var characterRegexp = this.userCharacters().join("|")
    return new RegExp([
      "\\[INFO Client \\d+\\]\\s.?(", characterRegexp, "):\\s+", commandPrompt
    ].join(""), "i")
  }
}

export { Log }
