'use strict';

// import { LogParser } from

class Log {
  constructor(log) {
    this.log = log
  }

  toJSON() {
    return {};
  }

  toS() {
    return this.log;
  }

  isValid() {
    return true;
  }
}

export { Log }
