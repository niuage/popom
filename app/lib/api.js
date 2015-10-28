'use strict';

var env = window.env;
var $ = require('jquery');
var _ = require('underscore');
var clipboard = require("copy-paste");

import { Map } from "./map"

class API {
  constructor() {}

  send(log) {
    console.log("sending log! " + log.toS())

    if (!this.isAuthorized()) return this.unauthorized();

    clipboard.paste(_.bind(function(clipboard, cp_content) {
      var map = new Map(cp_content);
      var token = this.token();

      $.ajax({
        url: env.api.logs_url,
        type: "POST",
        dataType: "json",
        data: {
          token: token,
          log: {
            command: log.toS(),
            map: map.encode()
          }
        },
        xhrFields: { withCredentials: true },
        crossDomain: false
      });
    }, this));
  }

  token() {
    return window.storage.get("token");
  }

  isAuthorized() {
    return this.token();
  }

  unauthorized() {
    radio.channel("errors").trigger("error", "Missing token.")
  }
}

export { API }
