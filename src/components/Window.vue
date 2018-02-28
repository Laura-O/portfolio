<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight"
    v-on:dragging="onDrag" v-on:resizing="onResize" class="window">        
        <div class="window-top">
            <slot name="text"></slot>            
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" class="minimize" />
              <font-awesome-icon icon="window-close" @click="close" />
            </div>
        </div>
        <div class="window-content">
            <slot>
              I am a slot!
              </slot>
        </div>
      <div class="window-bottom"></div>
    </vue-draggable-resizable>
</template>

<script>
import { windowBus } from '../main';

export default {
    name: 'Window',
    data() {
        return {
            width: this.initialWidth,
            height: this.initialHeight,
            minwidth: 200,
            minheight: 200,
            x: window.innerWidth / 3,
            y: window.innerWidth / 2,
            currentType: this.type,
        };
    },
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

</style>
