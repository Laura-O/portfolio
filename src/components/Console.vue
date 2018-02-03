<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight" :drag-handle="'.drag'"
    v-on:resizing="onResize" class="window">        
        <div class="window-top drag">
            <div class="text">Terminal</div>
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" />
              <font-awesome-icon icon="window-close" @click="close" />
            </div>
        </div>
        <div class="window-content">
            <div class="console-wrapper">
                <div class="console-history">
                    <pre>{{ history }}</pre>
                </div>
                <div class="console-input">
		            <span>dev$ </span>
		            <textarea class="console-input"
                        name="input"
                        cols="30" rows="1"
                        v-model="command"
                        @keyup.enter="submit">
                    </textarea>
	            </div>
            </div>
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
            minwidth: 400,
            minheight: 400,
            x: 200,
            y: 200,
            currentType: this.type,
            command: '',
            history: '',
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
        submit() {
            console.log(this.command);
            this.history += this.command;
            this.command = '';
            console.log(this.history);
        },
    },
};
</script>

<style scoped>
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

.buttons {
    align-self: flex-end;
    color: #d90368;
}

.window-bottom {
    height: 20px;
    background-color: #011627;
}

.window-content {
    background-color: #000;
    color: #fff;
    font-family: Inconsolata, monospace;
    font-size: 12px;
    height: 100%;
}

.console-input {
    display: flex;
}

.console-input textarea {
    color: #fff;
    border: solid 1px red;
    outline: 0;
    background-color: transparent;
    font-family: inherit;
    width: 100%;
    resize: none;
}
</style>
