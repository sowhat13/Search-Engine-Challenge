<template>
  <div class="home">
    <div class="search-wrapper">
      <div class="search-logo-wrapper">
        <img :src="logo" />
        <span class="seach-logo-text ml-auto">Search web app</span>
      </div>

      <SearchBar class="mt-3rem"></SearchBar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import logo from "@/assets/logo.svg";
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "Home",
  title() {
    return `TESODEV Search Engine`;
  },
  data() {
    return {
      logo,
    };
  },

  components: {
    SearchBar,
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 460px;
  max-height: 90%;

  max-width: 100%;
}
.search-logo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  max-width: 90%;
}

.seach-logo-text {
  margin-top: 0.5rem;
  margin-left: auto;
}
</style>
