const User = require("../schema/User");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customError } = require("../error/all-route-catch");
const { registerSchema, loginSchema } = require("../utils/joi");

const login = asyncWrapper(async (req, res, next) => {
	const validation = await loginSchema.validateAsync(req.body);
	const user = await User.findOne({ email: validation.email });
	if (!user) {
		return next(
			customError(404, `No user with email: ${validation.email}`)
		);
	}
	const isValidPassword = await user.isValidPassword(validation.password);
	if (!isValidPassword) {
		return next(customError(401, `Invalid password`));
	}
	req.session.user = user._id;
	res.sendStatus(200);
});

const register = asyncWrapper(async (req, res, next) => {
	const validation = await registerSchema.validateAsync(req.body);
	const existingUser = await User.findOne({ email: validation.email });
	if (existingUser) {
		return next(
			customError(
				400,
				`User with email: ${validation.email} already exists`
			)
		);
	}
	const user = await User.create({
		name: validation.name,
		email: validation.email,
		password: validation.password,
	});
	res.status(201).json({ user });
});

const logout = asyncWrapper(async (req, res) => {
	req.session.destroy();
	res.sendStatus(200);
});

module.exports = {
	login,
	register,
	logout,
};
