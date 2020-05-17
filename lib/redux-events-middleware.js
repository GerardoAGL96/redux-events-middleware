"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
    eslint
        import/prefer-default-export: off
*/
// const EventEmitter = require('events');
// import logger from '@marcopeg/utils/lib/logger'
var ReduxEvents = /*#__PURE__*/function () {
  function ReduxEvents() {
    (0, _classCallCheck2["default"])(this, ReduxEvents);
    this.listeners = [];
  }

  (0, _createClass2["default"])(ReduxEvents, [{
    key: "registerListener",
    value: function registerListener(listeners) {
      this.listeners = this.listeners.concat(listeners);
    }
  }, {
    key: "createReduxMiddleware",
    value: function createReduxMiddleware(ctx) {
      var _this = this;

      return function (store) {
        return function (next) {
          return function (action) {
            // console.log(`EVENT: ${action.type}`)
            // console.log(listeners)
            _this.listeners.filter(function (listener) {
              return listener.type === action.type;
            }).forEach(function (listener) {
              try {
                if (listener.async) {
                  setTimeout(function () {
                    return listener.handler(action, ctx)(store.dispatch, store.getState);
                  });
                } else {
                  listener.handler(action, ctx)(store.dispatch, store.getState);
                }
              } catch (e) {
                // eslint-disable-next-line
                console.error('Redux event handler error');
              }
            });

            return next(action);
          };
        };
      };
    }
  }]);
  return ReduxEvents;
}();

module.exports = {
  ReduxEvents: ReduxEvents
};