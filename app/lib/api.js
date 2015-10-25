'use strict';

var env = window.env;
var $ = require('jquery');
var clipboard = require("copy-paste");

import { Map } from "./map"

class API {
  constructor() {}

  static send(log) {
    console.log("sending log! " + log.toS())

    clipboard.paste(function(clipboard, cp_content) {
      var map = new Map(cp_content);

      $.ajax({
        url: env.api.logs_url,
        type: "POST",
        dataType: "json",
        data: {
          log: {
            command: log.toS(),
            map: map.encode()
          }
        },
        xhrFields: { withCredentials: true },
        crossDomain: false
      });
    });
  }
}

export { API }
