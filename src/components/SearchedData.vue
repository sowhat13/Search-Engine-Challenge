<template>
  <div class="searched-data-loading" v-if="!data">Loading</div>
  <div
    v-if="data"
    @click="goToName(data.fullName)"
    class="searched-data-wrapper"
  >
    <div class="searched-data-title">
      {{
        stringCutting
          ? cutString(`${data.country} - ${data.city}`, stringCuttingSize)
          : `${data.country} - ${data.city}`
      }}
    </div>
    <div class="searched-data-title">
      {{
        stringCutting ? cutString(data.email, stringCuttingSize) : data.email
      }}
    </div>

    <div class="searched-data-subtitle">
      {{ data.fullName }} - {{ data.year }}
    </div>

    <div class="searched-data-subtitle">{{ data.company }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    stringCutting: {
      type: Boolean,
      default: true,
    },
    stringCuttingSize: {
      type: Number,
      default: 20,
    },
  },

  methods: {
    cutString(str, length) {
      if (str.length <= length) return str;
      let res = str.substring(0, length);
      res += "...";

      return res;
    },

    goToName(name) {
      this.$router.push({
        path: "/search",
        query: { words: name },
        replace: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.searched-data-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: 1px solid black;
  padding: 4px;
  margin-bottom: 4%;
  max-width: 100%;
  overflow: hidden;
  gap: 0.5rem;
}

.searched-data-wrapper:hover {
  background: #c4c4c4;
  cursor: pointer;
  .searched-data-subtitle {
    color: white;
  }
}

.searched-data-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 1.2rem;
  word-break: break-all;
}

.searched-data-subtitle {
  font-size: 12px;
}
</style>
