<template>
  <List :films="films" @update="getMovies" :pages="pages" />
</template>

<script>
import List from "@/components/List.vue";
import { getFilms, getSearchFilm } from "@/backend/movieApi.js";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Main",

  components: {
    List,
  },

  data() {
    return {
      films: [],
      total_page: 500,
      pages: "",
    };
  },

  computed: {
    ...mapGetters(["search"]),
  },

  watch: {
    search: {
      handler(val) {
        if (val) {
          this.getSearchMovies(1, val);
        } else {
          this.getAllFilms(1);
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations(["setReqAllFilms", "setReqPopular"]),

    getMovies(page) {
      if (page !== 1) {
        if (this.search) {
          this.getSearchMovies(page, this.search);
        } else {
          this.getAllFilms(page);
        }
      }
    },

    async getAllFilms(page) {
      this.films = await getFilms(page);
      this.setReqAllFilms(true);
      this.setReqPopular(false);
    },

    async getSearchMovies(page, search) {
      const res = await getSearchFilm(page, search);
      this.films = res.results;
      this.pages = res.pages;
      this.setReqAllFilms(false);
      this.setReqPopular(false);
    },
  },
};
</script>
