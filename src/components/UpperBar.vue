<template>
    <div class="header">        
        <show-time></show-time>
    </div>
</template>

<script>
import { windowBus } from '../main';
import ShowTime from './ShowTime';

export default {
    components: {
        ShowTime,
    },
};
</script>

<style>
.header {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    height: 30px;
    width: 100%;
    background-color: #011627;
}
</style>
