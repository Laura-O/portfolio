<template>
    <div class="startmenu">
        <ul>            
            <li @click="startAbout"><font-awesome-icon icon="smile" /> About me</li>
            <li @click="startProject"><font-awesome-icon icon="keyboard" /> Projects</li>
            <li @click="startTic"><font-awesome-icon icon="gamepad" /> Tic Tac Toe</li>
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


<style scoped>
.startmenu {
    background-color: #011627;
    opacity: 0.5;
    color: white;
    width: 200px;
    height: 300px;
    margin-top: 0;
    position: absolute;
    z-index: 1;
    border-top: 3px solid #011627;
    border-right: 3px solid #011627;
    border-top-right-radius: 5px;
    font-size: 18px;
}

.startmenu ul {
    list-style: none;
    padding-left: 5px;
    padding-right: 5px;
}

ul li:after {
    content: '';
    display: block;
    height: 1px;
    margin: 5px;
    background: #d90368;
}

li:hover {
    background-color: #2a628f;
}
</style>
