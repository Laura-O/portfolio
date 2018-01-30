<template>
    <div class="footer">
        <div class="logo buttons"
          v-on:click="showStartMenu"          
        >
          <font-awesome-icon icon="eject" />
        </div>
        <div class="bar-entry" v-if="selectedProject" @click="minimize('project')">{{selectedProject.name}}</div>
        <div class="bar-entry" v-if="tic" @click="minimize('tic')">Tic Tac Toe</div>
        <show-time></show-time>
    </div>
</template>

<script>
import { windowBus } from '../main';
import ShowTime from './ShowTime';

export default {
    props: ['showProject', 'selectedProject', 'tic'],
    components: {
        ShowTime,
    },
    methods: {
        minimize(type) {
            windowBus.$emit('minimize', type);
        },
        showStartMenu: function() {
            console.log('button clicked');
            this.$emit('toggleMenu');
        },
    },
};
</script>

<style>
.footer {
    color: white;
    background-color: #011627;
    padding-left: 5px;
    padding-right: 5px;
    height: 30px;
}

.logo {
    margin: 5px 15px 5px 10px;
    display: inline-block;
    vertical-align: middle;
}

.bar-entry {
    display: inline-block;
    vertical-align: middle;
    background-color: #d90368;
    border-radius: 2px;
    margin: 1px;
    padding: 1px;
    width: 100px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
