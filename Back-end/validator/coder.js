const { body } = require("express-validator");
const coderValidationRules = () => {
  return [
    body("phoneNumber")
      .notEmpty()
      .withMessage("Only finnish phone number is allowed")
      .isLength({ min: 9, max: 9 })
      .withMessage("Enter your phone Number without zero"),
  ];
};

module.exports = {
  coderValidationRules,
};
