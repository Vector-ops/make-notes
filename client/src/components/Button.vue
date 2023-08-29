<template>
  <button :style="{ background: color }" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
};
</script>

<style scoped>
.btn {
  border-radius: 5px;
  border: none;
  height: 50px;
  width: 100px;
  font-size: medium;
  font-weight: bold;
  color: whitesmoke;
}
</style>
