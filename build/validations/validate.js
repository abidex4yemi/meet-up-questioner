"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import external modules
 */
// Schema validation function
module.exports = {
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = _joi.default.validate(req.body, schema, {
        abortEarly: false
      });

      if (result.error) {
        var errors = result.error.details.map(function (current) {
          return {
            key: current.context.key,
            Rule: current.message.replace(/['"]/g, '')
          };
        });
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }

      req.value = {};
      req.value.body = result.value;
      return next();
    };
  }
};
//# sourceMappingURL=validate.js.map