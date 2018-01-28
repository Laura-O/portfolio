<template>
    <div class="footer">
        <div class="logo buttons"
          v-on:click="showStartMenu"          
        >
          <font-awesome-icon icon="eject" />
        </div>
        <div class="bar-entry" v-if="selectedProject" @click="minimize()">{{selectedProject.name}}</div>
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
    showStartMenu: function() {
      console.log('button clicked');
      this.$emit('toggleMenu');
    },
  },
};
</script>

<style>
.footer {
  color: white;
}

.logo {
  margin: 5px 10px;
}

.bar-entry {
  background-color: #d90368;
  border-radius: 2px;
  margin: 1px;
  padding: 1px;
  width: 80px;
}
</style>
