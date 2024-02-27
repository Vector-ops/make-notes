const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "must provide name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "must provide email"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "must provide password"],
		trim: true,
	},
});

userSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("User", userSchema);
