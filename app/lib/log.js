'use strict';

class Log {
  constructor(log) {
    this.log = log
  }

  toS() {
    return this.log;
  }

  isValid() {
    if (!this.log) { return false; }
    if (!this.userCharacters.length) return false;
    if (!this.validFormat()) return false;

    return true;
  }

  validFormat() {
    this.logRegexp().test(this.log)
  }

  userCharacters() {
    var characters = window.storage.get("characters")
    characters ? characters.split(/\r?\n/) : []
  }

  logRegexp() {
    var commandPrompt = ">" // customizable?
    var characterRegexp = this.userCharacters().join("|")
    console.log(characterRegexp)
    var r = /\[INFO Client \d+\]\s.?(#{characterRegexp}):\s+#{commandPrompt}/i
    console.log(r)
    r
  }
}

export { Log }
