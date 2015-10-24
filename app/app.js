var app = require('remote').require('app');
var env = window.env;


// var lala = require("./lib/popom").lala

// lala()

import { Popom } from "./lib/popom"
// var Popom = require("./lib/popom")

new Popom(env).start()
