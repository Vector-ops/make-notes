<template>
  <div class="container">
    <Header :title="'Make Notes'" />
    <div class="notes-container">
      <Notes :notes="this.notes" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Notes from "../components/Notes.vue";
export default {
  name: "Home",
  components: {
    Header,
    Notes,
  },
  data() {
    return {
      notes: [],
    };
  },
  created() {
    this.notes = [
      {
        id: "1",
        title: "This is first note",
        date: "2 Aug, 2023",
        content: "This is the first note",
      },
      {
        id: "2",
        title: "This is second note",
        date: "2 Aug, 2023",
        content: "This is the second note",
      },
      {
        id: "3",
        title: "This is third note",
        date: "2 Aug, 2023",
        content: "This is the third note",
      },
      {
        id: "4",
        title: "This is fourth note",
        date: "2 Aug, 2023",
        content: "This is the fourth note",
      },
      {
        id: "4",
        title: "This is fourth note",
        date: "2 Aug, 2023",
        content: "This is the fourth note",
      },
      {
        id: "4",
        title: "This is fourth note",
        date: "2 Aug, 2023",
        content: "This is the fourth note",
      },
      {
        id: "4",
        title: "This is fourth note",
        date: "2 Aug, 2023",
        content: "This is the fourth note",
      },
    ];
  },
};
</script>

<style scoped>
.container {
  background: lightgray;
}
.notes-container {
  max-height: 83.3dvh;
  overflow-y: scroll;
}

.container {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
