<template>
  <header>
    <h1>{{ title }}</h1>
    <Button :text="'New Note'" :color="'#2c3e50'" />
  </header>
  <div class="line"></div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Header",
  components: {
    Button,
  },
  props: {
    title: String,
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.1em;
}

h1 {
  font-size: 2.5em;
}

.line {
  border-bottom: 2px solid grey;
}
</style>
