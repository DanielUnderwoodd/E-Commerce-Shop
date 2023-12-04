const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Enter your first name"),
      // .matches(/^[ \u0600-\u06FF A-Za-z0-9 ][ \u0600-\u06FF A-Za-z0-9 ]+$/i)
      // .withMessage("Usa a correct form"),
    body("email").isEmail().withMessage("Enter Valid email address"),
    body("lastName")
       .notEmpty()
       .withMessage("Enter your last name"),
      // .matches(/^[ \u0600-\u06FF A-Za-z0-9 ][ \u0600-\u06FF A-Za-z0-9 ]+$/i)
      // .withMessage("Use a correct form"),
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
  userValidationRules,
  validate,
};
