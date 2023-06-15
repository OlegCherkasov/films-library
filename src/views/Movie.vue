<template>
  <div class="movie">
    <div
      class="movie__card mx-auto"
      :class="{ movie__mobil: $vuetify.breakpoint.smAndDown }"
    >
      <div v-if="film.poster_path" class="movie__poster mx-auto rounded-lg">
        <img
          class="movie__img rounded-lg"
          :src="
            'https://www.themoviedb.org/t/p/w440_and_h660_face' +
            film.poster_path
          "
          alt="movie poster"
        />
      </div>
      <div v-else class="movie__poster mx-auto rounded-lg">
        <img
          class="movie__img rounded-lg"
          src="@/images/img_noPoster1.png"
          alt="no poster"
        />
      </div>
      <div class="movie__data">
        <div class="movie__text rounded-lg">
          <h1 class="mx-auto">{{ film.title }}</h1>
          <h2 class="mx-auto">{{ releaseDate }}</h2>
          <div class="movie__genres">
            <h3>Ganres:</h3>
            <div class="d-flex ml-4">
              <div v-for="(item, index) in film.genres" :key="index">
                {{ index === 0 ? item.name : `&nbsp;/ ${item.name}` }}
              </div>
            </div>
          </div>
          <div v-if="film.budget" class="d-flex align-center">
            <h3 class="mr-2">Budget:</h3>
            <div>{{ budget }} million dollars</div>
          </div>
          <div>
            <h3>Overview:</h3>
            <p class="movie__overview ml-4 mr-6">{{ film.overview }}</p>
          </div>
          <v-btn
            v-if="film.homepage"
            class="movie__homepage mb-3"
            text
            color="orange"
          >
            <a :href="film.homepage" target="_blank">HOMEPAGE</a>
          </v-btn>
        </div>
        <v-btn @click="$router.back()" class="movie__btn text-center">
          BACK
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchFilmId } from "@/backend/movieApi.js";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Movie",

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      film: {},
    };
  },

  computed: {
    ...mapGetters(["search"]),

    budget() {
      return this.film.budget && this.film ? this.film.budget / 1000000 : "";
    },

    releaseDate() {
      return this.film.release_date && this.film
        ? this.film.release_date.slice(0, 4)
        : "";
    },
  },

  watch: {
    id: {
      handler(val) {
        if (val) {
          this.setSearch("");
          this.getMovie();
        }
      },
      immediate: true,
    },

    search: {
      handler(val) {
        if (val) {
          this.$router.push({ name: "Main" });
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations(["setSearch"]),

    async getMovie() {
      this.film = await getSearchFilmId(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.movie {
  height: 100%;
  background-color: #ede7f6;

  .movie__mobil {
    flex-wrap: wrap;
  }

  .movie__card {
    max-width: 1440px;
    height: 100%;
    padding: 35px;
    display: flex;
    justify-content: center;
    gap: 40px;

    .movie__poster {
      min-width: 223px;
      max-width: 440px;
      align-self: center;

      .movie__img {
        max-width: 100%;
        height: auto;
      }
    }

    .movie__data {
      width: 800px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 100;

      .movie__text {
        min-width: 300px;
        margin-top: 30px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1px solid #8e24aa;

        .movie__overview {
          font-size: 18px;
        }

        .movie__homepage {
          width: fit-content;
          align-self: center;
          border: 1px solid #8e24aa;

          a {
            text-decoration: none;
            font-size: 18px;
            letter-spacing: 2px;
            color: #ff9800;
          }
        }
      }

      .movie__btn {
        margin-top: 30px;
        font-size: 18px;
        color: #ff9800;
        background-color: #ede7f6;
        border: 1px solid #8e24aa;
      }
    }
  }
}
</style>