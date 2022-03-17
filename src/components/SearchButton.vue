<template>
  <button
    class="search-bar-button"
    :class="backgroundColor ? `bg-${backgroundColor}` : ''"
  >
    Search
  </button>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style scoped lang="scss">
.search-bar-button {
  display: flex;
  padding: 10px;
  width: 138px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  max-width: 30%;
  margin-left: 1%;
  font-size: 18px;
  text-shadow: 0px 0.5rem 5px rgba(0, 0, 0, 0.25);
}
</style>
