<template>
	<div class="not-found">
		<Header
			@btn-click="returnHome"
			:title="'NoteStack'"
			:color="color"
			btnType="Home"
			@signout="signout"
		/>
		<div class="content">
			<h1>404 - Page Not Found</h1>
			<p>This page no longer exists or was moved to another location.</p>
		</div>
	</div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
	name: "PageNotFound",
	components: {
		Header,
	},
	data() {
		return {
			color: "#2c3e50",
		};
	},
	methods: {
		async signout() {
			try {
				await axios.get(
					`${process.env.VUE_APP_SERVER_URL}/auth/logout`,
					{
						withCredentials: true,
					}
				);
				this.$router.push({ name: "login" });
			} catch (error) {
				this.hasError = true;
			}
		},
		returnHome() {
			this.$router.push({
				name: "home",
			});
		},
	},
};
</script>

<style scoped>
.home {
	text-decoration: underline;
	color: #2c3e50;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1em;
	gap: 1em;
}
</style>
