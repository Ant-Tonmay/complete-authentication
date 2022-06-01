const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .trim(true)

      .messages({
        "string.pattern.base":
          "Name must not contain number or special characters",
        "any.custom": "Charater * is not allowed in NAME!",
      }),

    email: Joi.string().min(6).required().email(),
    password: new passwordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    })
      .custom((value, helper) => {
        if (value.includes("*")) throw new Error("Charater * is not allowed in PASSWORD!");
      })
      .messages({
        "any.custom": "Charater * is not allowed in PASSWORD!",
      }),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports.registerValidation = registerValidation;
