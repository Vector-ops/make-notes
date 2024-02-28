<template>
	<div class="view">
		<Header
			@home-click="returnHome"
			:title="note ? note.title : 'NoteStack'"
			:color="color"
			btnType="Home"
			@signout="signout"
		/>
		<div class="error" v-if="this.hasError">
			<h1>Something went wrong</h1>

			<h1>It's not you, it's me :(</h1>
		</div>
		<AddNote
			v-if="!this.hasError"
			@update-note="recieveNote"
			:note="this.note"
			:show="true"
			@delete-click="deleteNote"
		/>
	</div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import AddNote from "@/components/AddNote.vue";
import { ref } from "vue";
export default {
	name: "SingleNotePage",
	components: {
		Header,
		AddNote,
	},
	data() {
		return {
			note: {},
			color: "#2c3e50",
			updatedNote: {},
			hasError: ref(false),
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
		async getNote(id) {
			try {
				const res = await axios.get(
					`${process.env.VUE_APP_SERVER_URL}/notes/${id}`,
					{
						withCredentials: true,
					}
				);
				return res.data.notes;
			} catch (error) {
				if (error.response.status === 401) {
					this.$router.push({ name: "login" });
				}
				this.hasError = true;
			}
		},
		recieveNote(updatedNote) {
			this.updatedNote.title = updatedNote.title
				? updatedNote.title
				: this.note.title;
			this.updatedNote.body = updatedNote.body
				? updatedNote.body
				: this.note.body;

			this.updateNote();
		},
		async updateNote() {
			try {
				const res = await axios.put(
					`${process.env.VUE_APP_SERVER_URL}/notes/${this.note._id}`,
					this.updatedNote,
					{
						withCredentials: true,
					}
				);
				this.note = res.data.notes;
			} catch (error) {
				this.hasError = true;
			}
		},
		async deleteNote(noteId) {
			try {
				await axios.delete(
					`${process.env.VUE_APP_SERVER_URL}/notes/${noteId}`,
					{
						withCredentials: true,
					}
				);
				this.$router.push({ name: "home" });
			} catch (error) {
				this.hasError = true;
			}
		},
	},
	async created() {
		this.note = await this.getNote(this.$route.params.noteId);
	},
};
</script>

<style scoped>
.view {
	display: flex;
	flex-direction: column;
}

.error {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin-top: 10em;
}
</style>
