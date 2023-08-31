<template>
  <div>
    <Header
      @btn-click="editNote"
      :title="note.title"
      :color="color"
      newNote="Edit"
    />
    <router-link to="/">Home</router-link>
    <AddNote :note="this.note" />
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import AddNote from "@/components/AddNote.vue";
export default {
  name: "Single Note",
  components: {
    Header,
    AddNote,
  },
  data() {
    return {
      note: {},
      color: "#2c3e50",
    };
  },
  methods: {
    editNote() {
      console.log("first");
    },
    async getNote(id) {
      const res = await axios.get(`http://localhost:3000/api/v1/notes/${id}`);
      return res.data.notes;
    },
  },
  async created() {
    this.note = await this.getNote(this.$route.params.noteId);
  },
};
</script>
