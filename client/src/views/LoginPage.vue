<template>
	<div class="login-container">
		<form class="login-form">
			<h1 class="login-title">Welcome Back!</h1>
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
			<p v-if="this.loginError">Invalid credentials.</p>
			<button type="button" @click="login">Login</button>
			<div class="register">
				New to NoteStack?
				<router-link to="/auth/register" class="link"
					>Create an account</router-link
				>
			</div>
		</form>
	</div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
export default {
	name: "LoginPage",

	setup() {
		const email = ref("");
		const password = ref("");
		const loginError = ref(false);
		return { loginError, email, password };
	},

	methods: {
		async login() {
			try {
				const res = await axios.post(
					`${process.env.VUE_APP_SERVER_URL}/auth/login`,
					{
						email: this.email,
						password: this.password,
					},
					{
						withCredentials: true,
					}
				);
				if (res.status === 200) this.$router.push({ name: "home" });
			} catch (error) {
				this.loginError = true;
			}
		},
	},
};
</script>

<style scoped>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: lightgray;
}

.login-form {
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
	margin: 0.5em 0;
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
	margin-top: 2.5em;
}

button:hover {
	background-color: #34495e;
}

.login-title {
	text-align: center;
	margin-bottom: 1em;
	margin-top: 1em;
}

p {
	color: red;
	text-align: center;
}

.register {
	text-align: center;
	margin-top: 1em;
}

.link {
	text-decoration: underline;
	color: #2c3e50;
}
</style>
