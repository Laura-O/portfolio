<template>
    <div class="startmenu">
        <ul>
            <li @click="startTic">Tic Tac Toe</li>
        </ul>
    </div>
</template>

<script>
import { windowBus } from '../main';

export default {
    methods: {
        startTic() {
            windowBus.$emit('start', 'tic');
            windowBus.$emit('toggleMenu');
        },
    },
};
</script>


<style>
.startmenu {
    background-color: white;
    width: 200px;
    height: 300px;
    margin-top: 0;
    position: absolute;
    z-index: 1;
    border-top: 2px solid #011627;
    border-right: 2px solid #011627;
    border-top-right-radius: 5px;
}
</style>
