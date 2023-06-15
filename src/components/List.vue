<template>
  <div class="list">
    <div class="list__card mx-auto">
      <Card v-for="(item, index) in films" :key="index" :item="item" />
    </div>
    <div class="pagin text-center">
      <v-pagination
        color="deep-purple darken-1"
        v-model="page"
        :total-visible="9"
        :length="totalPages"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "List",

  components: {
    Card,
  },

  props: {
    films: {
      type: Array,
      default: () => [],
    },
    pages: {
      type: [Number, String],
    },
  },

  data() {
    return {
      page: 1,
      totalPages: 500,
    };
  },

  created() {
    this.getMovies();
  },

  watch: {
    page: {
      handler(val) {
        if (val) {
          this.getMovies();
        }
      },
    },

    pages: {
      handler(val) {
        if (val) {
          this.totalPages = val;
        }
      },
      immediate: true,
    },
  },

  methods: {
    getMovies() {
      this.$emit("update", this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 20px;
  background-color: #ede7f6;

  .list__card {
    max-width: 1440px;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px 10px;
  }
}
</style>