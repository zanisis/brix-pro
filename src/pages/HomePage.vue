<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="title-appbar">
        Movies Collection
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-page class="full-width column items-center q-px-md q-pt-md">
    <q-input
      outlined
      bottom-slots
      v-model="searchMovie"
      placeholder="Search title movie"
      class="full-width"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <btn
      v-for="movie in movieStore.movies"
      :key="movie.title"
      @click="handleClickCard(movie.id)"
      class="full-width"
    >
      <q-card class="full-width bg-grey-2 q-mt-sm">
        <q-card-section>
          <div class="text-h6">{{ movie.title }}</div>
          <div class="text-subtitle2">{{ movie.director }}</div>
        </q-card-section>

        <q-card-section class="row q-pt-none justify-end">
          <p
            v-for="(genre, index) in movie.genres"
            :key="genre"
            class="text-body2 q-ml-xs"
          >
            {{ genre }}
            <span v-if="index !== movie.genres.length - 1">/</span>
          </p>
        </q-card-section>
      </q-card>
    </btn>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        padding="sm"
        icon="add"
        color="primary"
        @click="$router.push({ path: '/add' })"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from 'src/stores/movieCollection';
import { useRouter } from 'vue-router';

const router = useRouter();
const movieStore = useMovieStore();
const searchMovie = ref(null);

const handleClickCard = (id: number) => {
  router.push({ path: `edit/${id}` });
};
</script>
