<template>
    <div
        @click="toggleActive"
        @dblclick="selectProject"
        :class="[{'active': active}, 'icon']"
        >
      <img v-bind:src="project.thumbnail" />
      <p class="icon-title">{{project.name}}</p>
    </div>
</template>

<script>
import { windowBus } from '../main';

export default {
    data() {
        return {
            selected: undefined,
            icon_text: '',
        };
    },
    props: ['project', 'active'],
    methods: {
        toggleActive() {
            this.$emit('newactive', this.project.id);
        },
        selectProject() {
            console.log(this.project);
            windowBus.$emit('projectSelected', this.project);
        },
    },
};
</script>

<style scoped>
.icon {
    width: 80px;
    height: 80px;
    background-color: transparent;
    margin: 15px 10px 15px 10px;
    padding: 10px;
}

.icon.active {
    border: 1px solid black;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0 !important;
}

.icon img {
    width: 50px;
    height: 50px;
    display: block;
    margin: auto;
}

.icon-title {
    color: white;
    font-size: 10px;
    font-weight: 900;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
}
</style>
