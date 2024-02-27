<template>
	<header>
		<h1>{{ title }}</h1>
		<div class="buttons">
			<ph-house
				v-if="btnType === 'Home'"
				:size="36"
				style="color: '#2c3e50'"
				weight="duotone"
				@click="$emit('home-click')"
			/>
			<ph-plus-square v-else :size="36" @click="$emit('new-click')" />
			<ph-sign-out
				:size="36"
				weight="duotone"
				@click="$emit('signout')"
			/>
		</div>
	</header>
	<div class="line"></div>
</template>

<script>
export default {
	name: "Header",
	props: {
		title: String,
		btnType: String,
		color: String,
	},
	emits: ["new-click", "home-click", "signout"],
};
</script>

<style scoped>
header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1.1em;
	user-select: none;
}

h1 {
	font-size: 2.5em;
}

.line {
	border-bottom: 2px solid grey;
}

.buttons {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	gap: 30px;
	margin: 0 0.5em;
}
</style>
