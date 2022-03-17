<template>
  <div class="search-results-wrapper">
    <div class="search-results-navbar">
      <router-link to="/" class="search-results-logo-wrapper">
        <img :src="logo" alt="" class="logo" />
      </router-link>
      <div class="search-bar-wrapper">
        <SearchBar :buttonBackgroundColor="'secondary'"></SearchBar>
      </div>
    </div>
    <div class="search-results-details-wrapper">
      <div class="search-results-details">
        Total Results: {{ totalResponseSize }}
      </div>
      <button @click="isOrdering = !isOrdering" class="search-results-order-by">
        <img :src="orderIcon" /> Order By
      </button>

      <div class="search-results-orders" v-if="isOrdering">
        <div
          class="search-results-order"
          v-for="order in orderTypes"
          :key="order"
          @click="orderIt(order.value)"
          :class="orderBy == order.value ? 'bg-gray' : ''"
        >
          {{ order.name }}
        </div>
      </div>
    </div>

    <div class="search-results" v-if="searchResponse.length > 0">
      <div
        class="search-result"
        v-for="data in searchResponse"
        :key="data.email"
      >
        <SearchedData :stringCuttingSize="32" :data="data"></SearchedData>
      </div>

      <SearchResultPagination
        :page="page"
        :totalPages="totalPages"
      ></SearchResultPagination>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.svg";
import orderIcon from "@/assets/icons/orderIcon.svg";

import SearchBar from "../components/SearchBar.vue";
import axios from "axios";
import SearchedData from "../components/SearchedData.vue";
import SearchResultPagination from "../components/SearchResultPagination.vue";
export default {
  data() {
    return {
      logo,
      orderIcon,
      searchResponse: null,
      orderTypes: [
        { name: "Closest", value: null },

        { name: "Name Asceding", value: "nameAsc" },
        { name: "Name Desceding", value: "nameDesc" },
        { name: "Year Asceding", value: "yearAsc" },
        { name: "Year Desceding", value: "yearDesc" },
      ],
      isOrdering: false,
      orderBy: null,
      dataPerPage: 6,
      totalResponseSize: 0,
    };
  },
  title() {
    return `${this.$route.query.words} - TESODEV Searched...`;
  },
  mounted() {
    this.search(this.$route.query.words);
  },

  computed: {
    totalPages: function () {
      return Math.ceil(this.totalResponseSize / this.dataPerPage);
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

  methods: {
    async search(words) {
      await axios
        .get(
          `http://localhost:8000/api/people/${words}?page=${
            this.page
          }&dataPerPage=${this.dataPerPage}${
            this.orderBy ? "&orderBy=" + this.orderBy : ""
          }`
        )
        .then(
          (response) => (
            (this.totalResponseSize = response.data.totalSize),
            (this.searchResponse = response.data.data)
          )
        );
    },

    async orderIt(val) {
      this.orderBy = val;
      await this.search(this.$route.query.words);

      this.isOrdering = false;
    },
  },
  components: {
    SearchBar,
    SearchedData,
    SearchResultPagination,
  },

  watch: {
    "$route.query.words": {
      handler: function (w) {
        this.search(w);
      },
      deep: true,
      immediate: true,
    },

    page: {
      handler: function () {
        this.search(this.$route.query.words);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.search-results-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.search-results-navbar {
  display: flex;
  width: 100%;
  padding: 1% 2%;
  align-items: center;
}
.search-results-logo-wrapper {
  width: 200px;
  max-width: 20vw;
  .logo {
    width: 100%;
  }
}

.search-bar-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-left: 2%;
  max-width: 74vw;
}

.search-results {
  display: flex;
  flex-direction: column;
  width: 720px;
  max-width: 100%;
  margin-top: 2%;
  margin-left: 280px;
}
.search-results-details-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 720px;
  max-width: 100%;
  margin-left: 280px;
  * {
    margin: 4px;
  }
}
.search-results-details {
  margin: 1%;
  font-size: 14px;
}

.search-results-order-by {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.search-results-orders {
  position: absolute;
  right: 0;
  width: 220px;
  top: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
}

.search-results-order {
  display: flex;
  width: 96%;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.search-results-order:hover {
  background: gray;
  color: white;
}

@media screen and (max-width: 1000px) {
  .search-results,
  .search-results-details-wrapper {
    margin-left: 10%;
    padding: 1%;
  }
}
@media screen and (max-width: 800px) {
  .search-results,
  .search-results-details-wrapper {
    margin-left: 0%;
    padding: 1%;
  }
}
</style>
