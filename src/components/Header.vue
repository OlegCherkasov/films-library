<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      hide-overlay
      color="deep-purple darken-1"
      width="210"
    >
      <v-img
        src="@/images/icon-globe-big.png"
        height="48"
        width="48"
        class="mx-auto mt-12"
        alt="icon globe"
      ></v-img>
      <v-list nav class="mt-10 text-center">
        <v-list-item-group active-class="darken-3--text">
          <v-list-item
            class="header__item white--text"
            :class="{ header__btnMob: isAllFilms }"
          >
            <v-list-item-title @click="getAllFilms"> HOME </v-list-item-title>
          </v-list-item>
          <v-list-item
            class="header__item white--text mt-6"
            :class="{ header__btnMob: isPopular }"
          >
            <v-list-item-title @click="getPopular"> POPULAR </v-list-item-title>
          </v-list-item>
          <v-list-item class="header__item white--text mt-6">
            <v-list-item-title @click="back"> BACK </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="max-size" color="deep-purple darken-1" dense dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <img
        v-else
        src="@/images/icon-globe-small.png"
        height="34"
        class="ml-4"
        alt="icon globe"
      />
      <v-spacer />
      <v-toolbar-title>Purple Space</v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        text
        rounded
        @click="back"
        class="movie__btn text-center"
      >
        BACK
      </v-btn>
      <input
        v-model="wordSearch"
        class="input pl-3 rounded"
        placeholder="search movie"
      />
      <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex mr-2">
        <v-btn
          text
          rounded
          class="my-2 mr-2"
          :class="{ header__btn: isPopular }"
          @click="getPopular"
        >
          POPULAR
        </v-btn>
        <v-btn
          text
          rounded
          class="my-2"
          :class="{ header__btn: isAllFilms }"
          @click="getAllFilms"
        >
          HOME
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Header",

  data() {
    return {
      drawer: false,
      wordSearch: "",
      isAllFilms: true,
      isPopular: false,
    };
  },

  computed: {
    ...mapGetters(["search", "reqAllFilms", "reqPopular"]),
  },

  watch: {
    wordSearch: {
      handler(val) {
        this.setSearch(val);
      },
      immediate: true,
    },

    search: {
      handler(val) {
        if (!val) {
          this.wordSearch = "";
        }
      },
      immediate: true,
    },

    reqAllFilms: {
      handler(val) {
        this.isAllFilms = val;
      },
      immediate: true,
    },

    reqPopular: {
      handler(val) {
        this.isPopular = val;
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations(["setSearch"]),

    getPopular() {
      this.wordSearch = "";
      this.$router.push("/popular");
    },

    getAllFilms() {
      this.wordSearch = "";
      this.$router.push({ name: "Main" });
    },

    back() {
      this.$router.back();
      this.wordSearch = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.header__item {
  border: 1px solid white;
}

.input {
  outline-color: #ff9800;
  outline-width: 2px;
  border: 1px solid white;
  color: white;
}

.header__btn {
  color: #ff9800;
}

.header__btnMob {
  background-color: #ff9800;
}
</style>
