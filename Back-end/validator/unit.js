const { body } = require("express-validator");

const unitValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("نام واحد  خود را وارد کنید")
      .matches(/^[ \u0600-\u06FF A-Za-z ][ \u0600-\u06FF A-Za-z ]+$/i)
      .withMessage("نام واحد خود را درست وارد کنید"),
  ];
};

module.exports = {
  unitValidationRules,
};
