<template>
  <div class="pagination" v-if="pagesArray">
    <button
      class="pagination-nextprev-button"
      v-if="page != 1"
      @click="page = page - 1"
    >
      Previous
    </button>
    <div v-for="(pg, index) in pagesArray" :key="index">
      <button
        :class="page == pg ? 'pagination-button-selected' : ''"
        class="pagination-button"
        v-if="pg != '...'"
        @click="page = pg"
      >
        {{ pg }}
      </button>
      <div class="pagination-dots" v-else>...</div>
    </div>

    <button
      class="pagination-nextprev-button"
      v-if="page != totalPages"
      @click="page = page + 1"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    pagesArray: function () {
      if (this.totalPages > 6) {
        if (this.page == 1) {
          return [
            this.page,
            this.page + 1,
            this.page + 2,
            "...",
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages,
          ];
        } else if (this.page == 2) {
          return [
            this.page - 1,
            this.page,
            this.page + 1,
            "...",
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages,
          ];
        } else if (this.page > this.totalPages - 3) {
          return [
            "...",
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages,
          ];
        } else if (this.page == this.totalPages - 3) {
          return [
            this.page - 2,
            this.page - 1,
            this.page,

            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages,
          ];
        } else {
          return [
            this.page - 1,
            this.page,
            this.page + 1,
            "...",
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages,
          ];
        }
      } else return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },

    page: {
      get() {
        return this.$store.state.searchResultPage;
      },
      set(value) {
        return this.$store.commit("UPDATE_SEARCH_RESULT_PAGE", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  * {
    font-weight: bold;
  }
}

.pagination-button {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  border: 1px solid black;
  margin: 0.2rem 0.5rem;
  border-radius: 4px;
}

.pagination-nextprev-button {
  display: flex;
  width: 90px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  border: 1px solid black;
  margin: 0.2rem 0.5rem;

  border-radius: 4px;
}

.pagination-dots {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  margin: 0.2rem 0.5rem;

  border-radius: 4px;
}

.pagination-button-selected {
  background-color: #204080;
  border: 1px solid #204080;
  color: white;
}

@media screen and (max-width: 800px) {
  .pagination-dots,
  .pagination-button {
    height: 20px;
    width: 20px;
  }
  .pagination-nextprev-button {
    height: 20px;
    width: 60px;
  }
}
</style>
