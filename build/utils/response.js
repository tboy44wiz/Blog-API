'use strict';
/**
 * @class Response
 * */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Response {
  /**
   * @property {Boolean} success true/false.
   * @property {Number} code Status code.
   * @property {String} message Response message.
   * @property {Object} data Response data.
   **/
  constructor(success, code, message, data) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }

}

var _default = Response;
exports.default = _default;
//# sourceMappingURL=response.js.map