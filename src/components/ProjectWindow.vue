<template>
    <vue-draggable-resizable :h="height"
        :w="width"
        :x="x" :y="y"
        :minw="minwidth" :minh="minheight"
        v-on:dragging="onDrag"
        v-on:resizing="onResize" class="window"        
        >
        <div class="window-top drag">
            <div class="text">Project Viewer: {{project.name}}</div>
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" />
              <font-awesome-icon icon="window-close" @click="close" />
            </div>
        </div>
        <div class="window-content">
            <h2>{{project.name}}</h2>

            <div class="project-image">
              <img class="project-image" v-bind:src="project.image">
            </div>
          
            <div>{{project.description}}</div>
          

            <h4>Tech used:</h4>
            <ul v-for="tech in project.techs" :key="tech.id">
                <li>{{tech}}</li>
            </ul>
        </div>
      <div class="window-bottom"></div>
    </vue-draggable-resizable>
</template>

<script>
import { windowBus } from '../main';

export default {
    data() {
        return {
            width: this.initialWidth,
            height: this.initialHeight,
            minwidth: 200,
            minheight: 200,
            x: 100,
            y: 100,
        };
    },
    props: ['initialWidth', 'initialHeight', 'project'],
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
            windowBus.$emit('minimize');
        },
        close() {
            windowBus.$emit('close');
        },
        toggleActive() {
            this.isActive = !this.isActive;
            console.log(this.isActive);
        },
    },
    created() { },
};
</script>

<style>
.window {
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
}

.window-top {
    min-height: 20px;
    background-color: #828081;
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
    color: #fff;
}

.window-bottom {
    height: 20px;
    background-color: #232630;
}

div.project-image {
    text-align: center;
}

img.project-image {
    max-width: 200px;
    margin: auto;
}
</style>
