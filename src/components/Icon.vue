<template>
    <div
        @click="toggleActive"
        @dblclick="selectProject"
        :class="[{'active': active}, 'icon']"
        >
      <img v-bind:src="project.thumbnail" />
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
            windowBus.$emit('projectSelected', this.project);
        },
    },
};
</script>


<style>
.icon {
    width: 50px;
    height: 50px;
    background-color: blue;
    align-self: flex-end;
    justify-content: flex-center;
    margin: 10px;
}

.icon.active {
    border: 1px solid black;
}

.icon img {
    width: 100%;
    height: 100%;
}

.active {
    border: 1px solid black;
}
</style>
