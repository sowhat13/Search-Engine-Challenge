<template>
  <div class="search-bar-wrapper" @keydown.enter="searchPush">
    <div class="search-bar-others"></div>
    <div class="search-bar-index" id="search-bar-index">
      <input
        class="search-bar-input"
        placeholder="What are you looking for?"
        name="search-bar"
        autocomplete="off"
        v-model="searchWords"
        @input="searchWordsChanged"
        @focus="isSearchBar = true"
        @blur="closeSearchBar"
      />
      <SearchButton
        :backgroundColor="buttonBackgroundColor"
        @click="searchPush"
      ></SearchButton>
    </div>

    <div class="search-bar-others cl-error">
      <Transition name="slide-fade">
        <div v-if="searchError">
          {{ searchError }}
        </div>
      </Transition>
    </div>

    <div
      v-if="isSearchBar && searchResponse && searchResponse.length > 0"
      class="search-bar-results"
    >
      <div v-for="res in searchResponse" :key="res.email">
        <SearchedData :data="res"></SearchedData>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SearchButton from "./SearchButton.vue";
import SearchedData from "./SearchedData.vue";

export default {
  data() {
    return {
      searchWords: this.$route.query.words,
      searchError: "",
      searchResponse: null,
      isSearchBar: false,
    };
  },

  computed: {
    page: {
      get() {
        return this.$store.state.searchResultPage;
      },
      set(value) {
        return this.$store.commit("UPDATE_SEARCH_RESULT_PAGE", value);
      },
    },
  },

  methods: {
    searchPush() {
      if (this.searchWords.length < 1) {
        this.searchError = "Enter some value";
        return;
      }

      this.$router.push({
        path: "/search",
        query: { words: this.searchWords },
      });
      this.isSearchBar = false;
    },
    async search(words) {
      await axios
        .get(`http://localhost:8000/api/people/${words}?page=1&dataPerPage=3`)
        .then((response) => (this.searchResponse = response.data.data));
    },

    async searchWordsChanged() {
      if (this.searchWords.length > 0) {
        this.isSearchBar = true;
        await this.search(this.searchWords);
      }
    },

    closeSearchBar() {
      setTimeout(() => (this.isSearchBar = false), 200);
    },
  },

  props: {
    buttonBackgroundColor: {
      default: "primary",
      type: String,
    },
  },

  components: {
    SearchButton,
    SearchedData,
  },

  watch: {
    $route: {
      handler() {
        this.page = 1;
      },
    },

    "$route.query.words": {
      handler: function (w) {
        this.searchWords = w;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  display: flex;
  width: 800px;
  max-width: 100%;
  justify-content: center;
  flex-direction: column;
  position: relative;
}
.search-bar-index {
  display: flex;
  width: 100%;
  justify-content: center;
}
.search-bar-input {
  display: flex;
  width: 85%;
  max-width: 85%;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid rgb(0, 0, 0);
  justify-content: center;
  align-items: center;

  color: #888888;
  font-weight: bold;
  font-size: 18px;
}

.search-bar-input:hover {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: rgba(100, 100, 100, 0.08);
}

.search-bar-others {
  margin: 2px;
  display: flex;
  height: 30px;
  align-items: center;
  width: 200px;
}

.search-bar-results {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 82%;
  max-width: 100%;
  min-width: 200px;
  height: fit-content;
  top: 80%;
  background: white;
  border-radius: 4px;
  padding: 0.5rem 2rem;
  border: 1px solid #484848;
  margin: auto;
  z-index: 3;
}
</style>
