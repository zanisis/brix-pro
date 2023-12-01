<template>
  <FormCollection
    :titleForm="'Edit Movies'"
    :id="(router.params?.id as string)"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import FormCollection from 'src/components/FormCollection.vue';

const router = useRoute();
</script>
