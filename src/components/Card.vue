<template>
  <v-card class="card mx-auto rounded-lg">
    <button @click="goToMovie">
      <v-img
        v-if="item.poster_path"
        class="card__img rounded-lg ma-1"
        :src="
          'https://www.themoviedb.org/t/p/w440_and_h660_face/' +
          item.poster_path
        "
        alt="movie poster"
      ></v-img>

      <v-img
        v-else
        class="card__img rounded-lg ma-1"
        src="@/images/img_noPoster1.png"
        alt="no poster"
      ></v-img>

      <h3 class="title pl-4 pr-4 text-center">{{ item.title }}</h3>

      <v-card-text class="card__text">
        <div v-if="item.release_date">{{ item.release_date.slice(0, 4) }}</div>
        <div v-else>release date unknown</div>
      </v-card-text>
    </button>
  </v-card>
</template>

<script>
export default {
  name: "Card",

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    goToMovie() {
      this.$router.push({ name: "Movie", params: { id: this.item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 255px;
  display: flex;
  flex-direction: column;

  .card__img {
    max-width: 100%;
    height: auto;
    border: 1px solid lightgrey;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card__text {
    padding: 8px 16px 4px 16px;
  }
}
</style>
