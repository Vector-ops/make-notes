const express = require("express");
const app = express();
const mongoDB = require("./db/connect");
require("dotenv").config();
const noteRouter = require("./routes/note.routes");
const authRouter = require("./routes/auth.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authenticate = require("./middleware/validation");

const store = MongoStore.create({
	mongoUrl: process.env.MONGO_URI,
	ttl: 14 * 24 * 60 * 60, // = 14 days. Default
	autoRemove: "native",
	autoRemoveInterval: 10, // In minutes. Default
	dbName: "note-stack",
	collectionName: "sessions",
});

//port
const PORT = process.env.PORT || 5000;

//middleware
app.use(
	cors({
		origin: [
			"https://note-stack-khaki.vercel.app",
			"https://note-stack-og7zm28np-vector-ops.vercel.app",
			"https://note-stack-git-main-vector-ops.vercel.app",
			"https://note-stack-jtbp5azrm-vector-ops.vercel.app",
			"https://note-stack-vector-ops.vercel.app",
		],
		credentials: true,
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		name: "sessionId",
		resave: false,
		saveUninitialized: false,
		store: store,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
			secure: false,
		},
	})
);
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authenticate, noteRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await mongoDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log(`Server is live at ${PORT}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
