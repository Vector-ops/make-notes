const Joi = require("joi");

const errorHandler = (err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message || "Something went wrong";

	if (Joi.isError(err)) {
		status = 400;
		message = err.details.map((err) => err.message).join(", ");
	}
	console.log(err);
	return res.status(status).json({
		message,
	});
};

module.exports = errorHandler;
