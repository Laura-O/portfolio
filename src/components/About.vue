<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight"
    v-on:dragging="onDrag"
    v-on:resizing="onResize"
    class="window">
        <div class="window-top">
            <div class="text"><font-awesome-icon icon="user" class="user-icon"/>About</div>
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" />
              <font-awesome-icon icon="window-close" @click="close" />
            </div>
        </div>
        <div class="window-content">            
            <h2>Hi, I am Laura!</h2>
            <div class="bio-paragraph">I am a full stack developer with a passion for visually appealing and easy to navigate frontends.</div>
            <div class="bio-paragraph">You can view some of my projects by clicking on the icons on the desktop. Don't forget to click on the start menu!</div>
            <div class="bio-paragraph">You can also follow me on <a class="highlight-link" target="_blank" v-bind:href="github"> GitHub </a></div>
          <div></div>
        </div>
      <div class="window-bottom"></div>
    </vue-draggable-resizable>
</template>

<script>
import { windowBus } from '../main';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
    name: 'Window',
    data() {
        return {
            width: this.initialWidth,
            height: this.initialHeight,
            minwidth: 200,
            minheight: 300,
            x: window.innerWidth / 2 - 200,
            y: 200,
            currentType: this.type,
            github: 'https://github.com/Laura-O',
        };
    },
    component: [FontAwesomeIcon],
    props: ['initialWidth', 'initialHeight', 'type'],
    methods: {
        onResize(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        onDrag(x, y) {
            this.x = x;
            this.y = y;
        },
        minimize() {
            windowBus.$emit('minimize', this.currentType);
        },
        close() {
            windowBus.$emit('close', this.currentType);
        },
    },
};
</script>

<style>
.bio-paragraph {
    margin-top: 10px;
}

.user-icon {
    padding-right: 10px;
}
</style>
