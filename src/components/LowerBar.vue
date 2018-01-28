<template>
    <div class="footer">
        <div v-if="selectedProject" @click="minimize()">yep</div>
    </div>
</template>

<script>
import { windowBus } from '../main';

export default {
  props: ['showProject', 'selectedProject'],
  methods: {
    minimize() {
      windowBus.$emit('minimize');
    },
  },
};
</script>

<style>
.footer {
  color: white;
}
</style>
