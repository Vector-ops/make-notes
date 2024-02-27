const Joi = require("joi");

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().required().min(8),
});

const loginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().required().min(8),
});

module.exports = { registerSchema, loginSchema };
