"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LOCATION_CHANGE", {
  enumerable: true,
  get: function get() {
    return _locationService.LOCATION_CHANGE;
  }
});
Object.defineProperty(exports, "LOCATION_RELOAD", {
  enumerable: true,
  get: function get() {
    return _locationService.LOCATION_RELOAD;
  }
});
exports.listeners = exports.services = exports.reducers = void 0;

var _locationService = require("./services/location-service");

var reducers = {};
exports.reducers = reducers;
var services = [require('./services/location-service')];
exports.services = services;
var listeners = [require('./listeners/location-listener')];
exports.listeners = listeners;