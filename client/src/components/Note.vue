<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ date }}</p>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    title: String,
    date: String,
  },
};
</script>
<style scoped>
div {
  margin: 0.5em 2em;
  height: 8em;
  color: whitesmoke;
  background: #2c3e50;
  padding: 1.2em;
  gap: 1em;
  align-items: start;
  border-radius: 1em;
  justify-content: space-between;
}
</style>
