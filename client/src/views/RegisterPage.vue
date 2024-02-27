<template>
	<div class="register-container">
		<form class="register-form">
			<h1 class="register-title">Welcome to NoteStack!</h1>
			<div class="input-container">
				<input
					type="text"
					id="name"
					placeholder="Name"
					v-model="name"
				/>
			</div>
			<div class="input-container">
				<input
					type="email"
					id="email"
					placeholder="Email"
					v-model="email"
				/>
			</div>
			<div class="input-container">
				<input
					type="password"
					id="password"
					placeholder="Password"
					v-model="password"
				/>
			</div>
			<p v-if="this.registerError">{{ this.errorMessage }}</p>
			<button type="button" @click="register">Register</button>
			<div class="login">
				Have an account?
				<router-link to="/auth/login" class="link">Login</router-link>
			</div>
		</form>
	</div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
export default {
	name: "RegisterPage",

	setup() {
		const name = ref("");
		const email = ref("");
		const password = ref("");
		const registerError = ref(false);
		const errorMessage = ref("Invalid credentials");
		return { name, email, registerError, password, errorMessage };
	},

	methods: {
		async register() {
			try {
				await axios.post(
					"http://localhost:5000/api/v1/auth/register",
					{
						name: this.name,
						email: this.email,
						password: this.password,
					},
					{
						withCredentials: true,
					}
				);
				this.$router.push({ name: "home" });
			} catch (error) {
				this.registerError = true;
				console.log(error);
				if (error.response.status === 400) {
					this.errorMessage = "User with this email already exists";
				}
			}
		},
	},
};
</script>

<style scoped>
.register-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: lightgray;
}

.register-form {
	width: 30em;
	height: 40em;
	margin-bottom: 6em;
	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 2em;
	border: 1px solid #2c3e50;
	border-radius: 15px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	background-color: white;
}

.input-container {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

label {
	margin-right: 20em;
}

input {
	height: 2.5em;
	border-radius: 15px;
	border: 2px solid gray;
	padding-left: 0.7em;
	font-size: large;
	background-color: white;
	font-weight: normal;
}

input:focus {
	outline: oklab(lightness a b);
}

button {
	height: 2.5em;
	border: none;
	border-radius: 15px;
	background-color: #2c3e50;
	color: white;
	font-size: large;
	font-weight: bold;
	cursor: pointer;
	margin-top: 3em;
}

button:hover {
	background-color: #34495e;
}

.register-title {
	text-align: center;
	margin-bottom: 1em;
	margin-top: 1em;
}

p {
	color: red;
	text-align: center;
}

.login {
	text-align: center;
	margin-top: 1em;
}

.link {
	text-decoration: underline;
	color: #2c3e50;
}
</style>
