<template>
	<div class="note">
		<div class="content" @click="$emit('note-click')">
			<h3>{{ note.title }}</h3>
			<p>{{ date }}</p>
		</div>
		<ph-trash
			:size="32"
			weight="regular"
			style="color: lightgray"
			class="btn"
			@click="$emit('delete-click')"
		/>
	</div>
</template>

<script>
export default {
	name: "Note",
	props: {
		note: Object,
	},
	data() {
		return {
			date: "",
		};
	},
	created() {
		let rawDate = new Date(this.note.created_at);
		this.date = rawDate.toDateString();
	},
};
</script>
<style scoped>
.note {
	margin: 0.5em 2em;
	height: 8em;
	color: whitesmoke;
	background: #2c3e50;
	padding: 1.2em;
	gap: 1em;
	align-items: start;
	border-radius: 1em;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	user-select: none;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	gap: 1em;
	height: 100%;
	width: 98%;
}

.btn {
	cursor: pointer;
}
</style>
