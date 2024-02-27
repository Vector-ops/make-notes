<template>
	<div v-for="note in notes" :key="note._id">
		<Note
			@note-click="$emit('note-click', note._id)"
			@delete-click="$emit('delete-click', note._id)"
			:note="note"
		/>
	</div>
</template>

<script>
import Note from "./Note.vue";
export default {
	name: "Notes",
	components: {
		Note,
	},
	props: {
		notes: Array,
	},
	emits: ["note-click", "delete-click"],
};
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
}
</style>
