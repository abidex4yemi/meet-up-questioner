/**
 * Import external modules
 */
import Joi from 'joi';

// Schema validation function
module.exports = {
  validateBody(schema) {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {
        abortEarly: false,
      });

      if (result.error) {
        const errors = result.error.details.map(current => ({
          key: current.context.key,
          Rule: current.message.replace(/['"]/g, ''),
        }));

        return res.status(400).json({
          status: 400,
          error: errors,
        });
      }

      if (!req.error) {
        req.value = {};
      }

      req.value.body = result.value;

      return next();
    };
  },
};
