<template>
  <div class="new-note">
    <div class="date">{{ this.date }}</div>
    <div class="line"></div>
    <form @submit.prevent="submitForm">
      <input
        v-model="updateTitle"
        @input="updateNote"
        type="text"
        :placeholder="this.title"
      />
      <textarea
        v-model="updateBody"
        @input="updateNote"
        rows="15"
        cols="45vw"
        type="text"
        :placeholder="this.body"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddNote",
  props: {
    note: Object,
    btnClick: Boolean,
  },
  emits: ["update-note"],
  data() {
    return {
      date: "",
      title: "",
      body: "",
      updateBody: "",
      updateTitle: "",
    };
  },
  created() {
    this.$watch(
      () => this.note,
      () => {
        this.setNote();
      },
      { immediate: true }
    );
  },
  updated() {
    this.setNote();
    if (this.btnClick) {
      this.updateTitle = "";
      this.updateBody = "";
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
    },
    setNote() {
      const rawDate = new Date(this.note.created_at);
      this.date = this.note.created_at
        ? rawDate.toDateString()
        : Date().split("GMT")[0];
      this.title = this.note.title ? this.note.title : "Title";
      this.body = this.note.body ? this.note.body : "Body";
    },
    updateNote() {
      let updateNote = {
        title: this.updateTitle,
        body: this.updateBody,
      };
      this.$emit("update-note", updateNote);
    },
  },
};
</script>

<style scoped>
.date {
  font-weight: bolder;
}
.new-note {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5em;
  margin: 0.5em 1.5em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

input {
  height: 3em;
  width: 45vw;
  border: none;
  border-bottom: 2px solid gray;
  border-radius: 7px;
  padding-left: 0.7em;
  padding-top: 1em;
  font-size: large;
  background-color: lightgray;
  font-weight: bold;
}

input:focus,
textarea:focus {
  outline: none;
}

textarea {
  resize: none;
  border: none;
  border-radius: 7px;
  padding-left: 0.7em;
  padding-top: 0.3em;
  font-size: x-large;
  background-color: lightgray;
  font-weight: 500;
}

.line {
  width: 100%;
  border-bottom: 2px solid gray;
}
</style>
