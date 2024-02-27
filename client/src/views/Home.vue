<template>
	<div class="container">
		<Header
			@new-click="toggleAddNewNote()"
			@signout="signout()"
			:title="'NoteStack'"
			btnType="newNote"
			:color="this.color"
		/>
		<div class="error" v-if="this.hasError">
			<h1>Something went wrong</h1>

			<h1>It's not you, it's me :(</h1>
		</div>
		<div
			v-if="!this.hasError"
			class="multi-note"
			:style="
				!this.toggleNewNote ? '' : 'display: flex; flex-direction:row;'
			"
		>
			<div class="notes-container">
				<Notes
					v-if="notes.length > 0"
					@note-click="showSingleNote"
					@delete-click="deleteNote"
					:notes="this.notes"
				/>
				<h1 v-else class="empty">Wow such empty :/</h1>
			</div>
			<AddNote
				@update-note="recieveNewNote"
				v-show="this.toggleNewNote"
				@close-form="toggleAddNewNote"
			/>
		</div>
	</div>
</template>

<script>
const axios = require("axios");
import Header from "../components/Header.vue";
import Notes from "../components/Notes.vue";
import AddNote from "../components/AddNote.vue";
import { ref } from "vue";
export default {
	name: "Home",
	components: {
		Header,
		Notes,
		AddNote,
	},
	data() {
		return {
			notes: [],
			newNote: {},
			color: "#2c3e50",
			toggleNewNote: false,
			saveNote: false,
			hasError: ref(false),
		};
	},
	methods: {
		async signout() {
			try {
				await axios.get("http://localhost:5000/api/v1/auth/logout", {
					withCredentials: true,
				});
				this.$router.push({ name: "login" });
			} catch (error) {
				this.hasError = true;
			}
		},
		async deleteNote(noteId) {
			try {
				await axios.delete(
					`http://localhost:5000/api/v1/notes/${noteId}`,
					{
						withCredentials: true,
					}
				);
				this.notes = this.notes.filter((note) => note._id !== noteId);
			} catch (error) {
				this.hasError = true;
			}
		},
		toggleAddNewNote() {
			this.toggleNewNote = !this.toggleNewNote;
			this.color = "#2c3e50";
			this.saveNote = true;
		},
		showSingleNote(id) {
			this.$router.push({
				name: "note",
				params: { noteId: id },
			});
		},
		async fetchNotes() {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/v1/notes",
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
		recieveNewNote(newNote) {
			this.newNote = newNote;
			this.addNewNote();
			this.toggleAddNewNote();
		},
		async addNewNote() {
			try {
				if (this.saveNote) {
					const res = await axios.post(
						"http://localhost:5000/api/v1/notes",
						this.newNote,
						{
							withCredentials: true,
						}
					);
					this.notes.push(res.data.notes);
					this.saveNote = false;
				}
			} catch (error) {
				if (error.response.status === 401) {
					this.$router.push({ name: "login" });
				}
				this.hasError = true;
			}
		},
	},
	async created() {
		this.notes = await this.fetchNotes();
	},
};
</script>

<style scoped>
.container {
	background: lightgray;
}
.notes-container {
	max-height: 80.6dvh;
	overflow-y: scroll;
	min-width: 50vw;
}

.container {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.container::-webkit-scrollbar {
	display: none;
}

.empty {
	margin-top: 5em;
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
