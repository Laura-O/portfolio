<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight"
    v-on:dragging="onDrag" v-on:resizing="onResize" class="window">        
        <div class="window-top">
            <slot name="text"></slot>            
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" />
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
            x: 200,
            y: 200,
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
.window {
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
}

.window-top {
    min-height: 20px;
    background-color: #011627;
    color: white;
    padding: 2px 5px;
    display: flex;
    justify-content: space-between;
}

.window-content {
    padding: 10px;
    overflow-y: auto;
}

.buttons {
    align-self: flex-end;
    color: #d90368;
}

.window-bottom {
    height: 20px;
    background-color: #011627;
}
</style>
