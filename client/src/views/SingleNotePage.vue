<template>
  <div>
    <Header
      @btn-click="editNote"
      :title="note.title"
      :color="color"
      newNote="Edit"
    />
    <router-link to="/">Home</router-link>
    <AddNote
      @update-note="recieveNote"
      :note="this.note"
      :btnClick="btnClick"
    />
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import AddNote from "@/components/AddNote.vue";
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
      btnClick: false,
    };
  },
  methods: {
    editNote() {
      this.btnClick = true;
      this.updateNote();
    },
    async getNote(id) {
      const res = await axios.get(`http://localhost:3000/api/v1/notes/${id}`);
      return res.data.notes;
    },
    recieveNote(updatedNote) {
      this.updatedNote = updatedNote;
    },
    updateNote() {
      this.note.title = this.updatedNote.title
        ? this.updatedNote.title
        : this.note.title;
      this.note.body = this.updatedNote.body
        ? this.updatedNote.body
        : this.note.body;

      // console.log(this.updatedNote);
    },
  },
  async created() {
    this.note = await this.getNote(this.$route.params.noteId);
  },
};
</script>
