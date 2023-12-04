"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_orders = exports.success_cleaner = exports.error_cleaner = void 0;

var _publicActionTypes = require("../../actionTypes/public/publicActionTypes");

var _customerActionTypes = require("../../actionTypes/customer/customerActionTypes");

var _errorHandler = require("../error/errorHandler");

var _api = _interopRequireDefault(require("../../config/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var error_cleaner = function error_cleaner() {
  return {
    type: _publicActionTypes.ERROR_CLEANER
  };
};

exports.error_cleaner = error_cleaner;

var success_cleaner = function success_cleaner() {
  return {
    type: _publicActionTypes.SUCCESS_CLEANER
  };
};

exports.success_cleaner = success_cleaner;

var get_orders = function get_orders(retData, incomingData) {
  return function _callee(ReduxDispacth) {
    var params, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            params = new URLSearchParams();
            params.append('userEmail', incomingData);
            _context.next = 5;
            return regeneratorRuntime.awrap(_api["default"].post("/customer/pv/orders", params));

          case 5:
            response = _context.sent;

            if (response && response.data) {
              retData(response.data);
            }

            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            (0, _errorHandler.errorHandler)(_context.t0, ReduxDispacth, _publicActionTypes.ERROR);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.get_orders = get_orders;