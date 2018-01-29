<template>
    <div class="time">
       {{ currentTime }}
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            currentTime: '',
        };
    },
    methods: {
        updateTime() {
            let time = new Date();
            this.currentTime = time.getHours() + ' : ' + time.getMinutes();
        },
    },
    created: function() {
        setInterval(this.updateTime, 60 * 1000);
    },
    beforeMount() {
        this.updateTime();
    },
};
</script>

<style>
.time {
    color: #d90368;
    right: 0;
    float: right;
    vertical-align: middle;
    line-height: 30px;
}
</style>
