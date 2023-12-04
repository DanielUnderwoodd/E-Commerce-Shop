const { body } = require("express-validator");
const coderValidationRules = () => {
  //console.log(body("email"));
  return [
    body("email")
      .notEmpty()
       .withMessage("Enter your phone Number without zero2"),
      // .isLength({ min: 9, max: 9 })
      // .withMessage("Only finnish phone number is allowed"),
  ];
};

module.exports = {
  coderValidationRules,
};
