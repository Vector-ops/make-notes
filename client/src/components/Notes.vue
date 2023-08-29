<template>
  <div v-for="note in notes" :key="note.id">
    <Note :title="note.title" :date="note.date" />
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
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>
