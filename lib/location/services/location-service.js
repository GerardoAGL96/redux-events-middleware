"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.init = exports.rerun = exports.LOCATION_RELOAD = exports.LOCATION_CHANGE = void 0;

/**
 * Register to the history manager and trigger the history
 * events as redux actions
 */
var LOCATION_CHANGE = '@@location::change';
exports.LOCATION_CHANGE = LOCATION_CHANGE;
var LOCATION_RELOAD = '@@location::reload';
exports.LOCATION_RELOAD = LOCATION_RELOAD;

var rerun = function rerun(history) {
  return function (dispatch) {
    dispatch({
      type: LOCATION_CHANGE,
      payload: history.location
    });
  };
};

exports.rerun = rerun;

var init = function init(store, history) {
  return function (dispatch) {
    return history.listen(function (match) {
      return dispatch({
        type: LOCATION_CHANGE,
        payload: match
      });
    });
  };
};

exports.init = init;

var start = function start(store, history) {
  return function (dispatch) {
    return dispatch({
      type: LOCATION_CHANGE,
      payload: history.location
    });
  };
};

exports.start = start;