const { body, validationResult } = require("express-validator");
("*");
const _ = require("lodash");
const e = require("express");

const classValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("نام صنف  خود را وارد کنید")
      .matches(/^[ \u0600-\u06FF A-Za-z ][ \u0600-\u06FF A-Za-z ]+$/i)
      .withMessage("نام صنف خود را درست وارد کنید"),
    body("properties")
      .custom((value) => {
        if (_.isArray(value)) {
          if (value.length !== 0) {
            for (var i = 0; i < value.length; i++) {
              if (
                /^[ \u0600-\u06FF A-Za-z ][ \u0600-\u06FF A-Za-z ]+$/.test(
                  value[i]
                )
              ) {
                if (i === value.length - 1) {
                  return true;
                } else {
                  continue;
                }
              } else {
                throw new Error("ورودی باید رشته  باشد");
              }
            }
          } else {
            return true;
          }
        } else {
          throw new Error("ورودی نامناسب است");
        }
      })
      .optional(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors
    .array({ onlyFirstError: true })
    .map((err) => (extractedErrors[err.param] = err.msg));

  return res.status(403).json({
    errors: extractedErrors,
  });
};

module.exports = {
  classValidationRules,
  validate,
};
