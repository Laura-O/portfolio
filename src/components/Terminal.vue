<template>
    <vue-draggable-resizable :h="height" :w="width" :x="x" :y="y"
    :minw="minwidth" :minh="minheight" :drag-handle="'.drag'"
    v-on:resizing="onResize" class="window">        
        <div class="window-top drag">
            <div class="text">Terminal</div>
            <div class="buttons">
              <font-awesome-icon icon="window-minimize" @click="minimize" />
              <font-awesome-icon icon="window-close" @click="close" />
            </div>
        </div>
        <div class="window-content">
            <div class="terminal-wrapper">
                <div class="terminal-history">
                    <pre>{{ history }}</pre>
                </div>
                <div class="terminal-input">
		            <span>user:~$ </span>
		            <textarea class="terminal-input"
                        name="input"
                        cols="30" rows="1"
                        v-model="command"
                        @keyup.enter="submit">
                    </textarea>
	            </div>
            </div>
        </div>
      <div class="window-bottom"></div>
    </vue-draggable-resizable>
</template>

<script>
import { windowBus } from '../main';

export default {
    name: 'Terminal',
    data() {
        return {
            width: this.initialWidth,
            height: this.initialHeight,
            minwidth: 400,
            minheight: 400,
            x: 200,
            y: 200,
            currentType: this.type,
            command: '',
            history: '',
            files: 'about projects tictactoe',
            options: [
                {
                    cmd: 'clear',
                    desc: 'Clear the screen',
                },
                {
                    cmd: 'date',
                    desc: 'Return current date',
                },
                {
                    cmd: 'help',
                    desc: 'List of available commands',
                },
                {
                    cmd: 'ls',
                    desc: 'List files',
                },
            ],
        };
    },
    props: ['initialWidth', 'initialHeight', 'type'],
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
        minimize() {
            windowBus.$emit('minimize', this.currentType);
        },
        close() {
            windowBus.$emit('close', this.currentType);
        },
        submit() {
            let currentCommand = this.command.trim();
            this.history += `user:~$ ${currentCommand} \n`;
            if (this[currentCommand]) {
                this[currentCommand]();
            } else {
                this.history += `Command not found: ${currentCommand}  \n`;
            }
            this.command = '';
        },
        help() {
            let list = '';
            for (let name of this.options) {
                list += `${name.cmd}\t- ${name.desc}\n`;
            }
            this.history += `Available commands: \n\n${list}\n`;
        },
        clear() {
            this.history = '';
        },
        date() {
            this.history += `${new Date().toString()}\n`;
        },
        ls() {
            this.history += `${this.files} \n`;
        },
        about() {
            windowBus.$emit('start', 'about');
        },
        projects() {
            windowBus.$emit('start', 'project');
        },
        tictactoe() {
            windowBus.$emit('start', 'tic');
        },
    },
};
</script>

<style scoped>
pre {
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
}
.window {
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
}

.window-top {
    min-height: 20px;
    background-color: #011627;
    color: white;
    padding: 2px 5px;
    display: flex;
    justify-content: space-between;
}

.buttons {
    align-self: flex-end;
    color: #d90368;
}

.window-bottom {
    height: 20px;
    background-color: #011627;
}

.window-content {
    background-color: #000;
    color: #fff;
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    height: 100%;
}

.terminal-input {
    display: flex;
}

.terminal-input textarea {
    color: #fff;
    outline: 0;
    border: 0;
    background-color: transparent;
    font-family: inherit;
    font-size: 16px;
    width: 100%;
    resize: none;
}
</style>
