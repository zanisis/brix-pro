<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        <div class="q-gutter-sm full-width row justify-end">
          <q-btn
            color="negative"
            label="Delete"
            @click="onReset"
            type="reset"
          />
          <q-btn
            color="secondary"
            label="Save"
            type="submit"
            @click="onSubmit"
          />
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-page class="">
    <div class="q-pa-md" style="max-width: 500px">
      <p class="q-mb-lg text-h6 text-weight-medium">Add Movie</p>
      <q-form ref="myForm" class="q-gutter-md">
        <q-input
          outlined
          v-model="title"
          label="Title"
          hint=""
          lazy-rules
          :rules="[(val: string | any[]) => (val && val.length > 0) || 'Please type something']"
          :dense="true"
        />
        <q-input
          outlined
          v-model="director"
          label="Director"
          hint=""
          lazy-rules
          :rules="[(val: string | any[]) => (val && val.length > 0) || 'Please type something']"
          :dense="true"
        />
        <q-input
          outlined
          v-model="summary"
          label="Summary"
          hint=""
          type="textarea"
          lazy-rules
          :rules="[(val: string | any[]) => (val && val.length > 0) || 'Please type something']"
        />
        <div class="q-px-md q-gutter-xs full-width row wrap">
          <q-btn
            v-for="genre in genres"
            :key="genre.label"
            :outline="!selectedGenre.includes(genre.label)"
            rounded
            color="primary"
            :label="genre.label"
            @click="handleGenreSelect(genre.label)"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar, QForm } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from 'src/stores/movieCollection';

const $q = useQuasar();
const router = useRouter();
const movieStore = useMovieStore();

const myForm = ref(QForm);
const title = ref(null);
const director = ref(null);
const summary = ref(null);
const genres = ref([
  { label: 'Action' },
  { label: 'Animation' },
  { label: 'Drama' },
  { label: 'Sci-Fi' },
]);
const selectedGenre = ref([] as string[]);

const handleGenreSelect = (value: string) => {
  let newGenres = [...selectedGenre.value];
  if (selectedGenre.value.includes(value)) {
    newGenres.splice(newGenres.indexOf(value), 1);
  } else {
    newGenres.push(value);
  }
  selectedGenre.value = newGenres;
};

const onSubmit = () => {
  myForm.value.validate().then((success: boolean) => {
    if (success) {
      movieStore.addMovie({
        title: title.value ?? '',
        director: director.value ?? '',
        summary: summary.value ?? '',
        genres: selectedGenre.value,
      });
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted',
        timeout: 1000,
      });
      router.replace({ path: '/' });
    } else {
      $q.notify({
        color: 'red-10',
        textColor: 'white',
        icon: 'dangerous',
        message: 'Field cannot be empty',
        timeout: 1000,
      });
    }
  });
};
const onReset = () => {
  console.log('reset');
};
</script>
