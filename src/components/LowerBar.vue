<template>
    <div class="footer">
        <div class="logo buttons"
          v-on:click="showStartMenu"          
        >
          <font-awesome-icon icon="eject" />
        </div>
        <div class="bar-entry" v-if="selectedProject" @click="minimize()">{{selectedProject.name}}</div>
        <show-time></show-time>
    </div>
</template>

<script>
import { windowBus } from '../main';
import ShowTime from './ShowTime';

export default {
    props: ['showProject', 'selectedProject'],
    components: {
        ShowTime,
    },
    methods: {
        minimize() {
            windowBus.$emit('minimize');
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
}

.logo {
    margin: 5px 10px;
    order: 2;
    display: inline-block;
}

.bar-entry {
    display: inline-block;
    background-color: #d90368;
    border-radius: 2px;
    margin: 1px;
    padding: 1px;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
