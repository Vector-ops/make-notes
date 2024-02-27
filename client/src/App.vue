<template>
	<div class="container">
		<router-view />
		<div class="footer">
			<Footer />
		</div>
	</div>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
	name: "App",
	components: {
		Footer,
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap");
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

*::-webkit-scrollbar {
	width: 2px;
}

body::-webkit-scrollbar {
	width: 8px;
}

*::-webkit-scrollbar-track {
	background: gray;
	width: 0px;
}

*::-webkit-scrollbar-thumb {
	background-color: #2c3e50;
	border-radius: 14px;
}

body {
	font-family: "Syne", sans-serif;
	background: lightgray;
	min-height: 100dvh;
	height: 100%;
}

button {
	cursor: pointer;
}

.container {
	height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
