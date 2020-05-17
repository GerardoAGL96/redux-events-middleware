"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locationService = require("../services/location-service");

var _default = [{
  type: _locationService.LOCATION_RELOAD,
  handler: function handler(action, ctx) {
    return function (dispatch) {
      return setTimeout(function () {
        return dispatch((0, _locationService.rerun)(ctx.history));
      });
    };
  }
}];
exports["default"] = _default;