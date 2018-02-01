<template>
  <window :initialHeight="300" :initialWidth="400" type="about">
          <div slot="text" class="text">About me</div>
            <h2>Welcome!</h2>
            <div class="bio-paragraph">My name is Laura Ohrndorf and I am a fullstack developer.</div>
            <div class="bio-paragraph">You can view some of my projects by clicking on the icons on the desktop.</div>
            <div class="bio-paragraph">You can also follow me on <a class="highlight-link "v-bind:href="github"> GitHub </a></div>
          <div></div>
    </window>
</template>

<script>
import Window from './Window';

export default {
    name: 'about',
    data() {
        return {
            github: 'https://github.com/Laura-O',
        };
    },
    components: {
        Window,
    },
};
</script>

<style>
.bio-paragraph {
    margin: 5px;
}
</style>
