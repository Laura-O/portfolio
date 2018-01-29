<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight"
    v-on:dragging="onDrag" v-on:resizing="onResize" class="window">
        <div class="window-top">
            <div class="text">Title</div>
            <div class="buttons"></div>
        </div>
        <div class="window-content">
            <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
        </div>
      <div class="window-bottom"></div>
    </vue-draggable-resizable>
</template>

<script>
export default {
    data() {
        return {
            width: 200,
            height: 200,
            minwidth: 200,
            minheight: 200,
            x: 200,
            y: 200,
        };
    },
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
    },
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
    height: 20px;
    background-color: grey;
}

.window-bottom {
    height: 20px;
    background-color: grey;
}
</style>
