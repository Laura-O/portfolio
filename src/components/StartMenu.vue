<template>
    <div class="startmenu">
        <ul>            
            <li @click="startAbout">About</li>
            <li @click="startProject">Projects</li>
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
        startAbout() {
            windowBus.$emit('start', 'about');
            windowBus.$emit('toggleMenu');
        },
        startProject() {
            windowBus.$emit('start', 'project');
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
    border-top: 3px solid #011627;
    border-right: 3px solid #011627;
    border-top-right-radius: 5px;
}
</style>
