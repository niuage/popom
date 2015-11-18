'use strict';

var app = require('remote').require('app');
var fs = require('fs');
var path = require('path');

class Storage {
  constructor() {
    this.data = null;
    this.dataFilePath = path.join(app.getPath('userData'), 'settings.json');
  }

  load() {
    if (this.data !== null) { return; }
    if (!fs.existsSync(this.dataFilePath)) { return this.data = {}; }
    this.data = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf-8'));
  }

  save() {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.data));
  }

  set(key, value) {
    this.load();
    this.data[key] = value;
    this.save();
  }

  get(key) {
    this.load();
    return this.data[key];
  }

  unset(key) {
    load();
    if (!(key in this.data)) return;

    delete this.data[key];
    this.save();
  }
}

export { Storage }
