<template>
  <div id="app">
    <div class="header">Header</div>
    <div id="main">      
      <icon v-for="project in projects"
        :key="project.id"
        :project="project"
        :active="project.id === activeIcon"
        @newactive="activeIcon = $event"
        >
      </icon>
      <project-window v-if="showProject"
        :project="selectedProject"
        @close="showProject = false">
      </project-window>      
      <window v-if="showTic"  :initialHeight="400" :initialWidth="250" type="tic">
          <div slot="text" class="text">Tic Tac Toe</div>
          <board></board>
        </window>
      <start-menu v-if="showMenu"></start-menu>
    </div>
    <lower-bar :showProject="showProject" :tic="this.showTic" :selectedProject="selectedProject" v-on:toggleMenu="toggleMenu"></lower-bar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import icon from './components/Icon';
import projects from './projects.json';
import projectWindow from './components/ProjectWindow';
import LowerBar from './components/LowerBar';
import StartMenu from './components/StartMenu';
import Board from './components/Tic-Tac-Toe/Board';
import Window from './components/Window.vue';
import { windowBus } from './main';

export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            projects,
            windows: [],
            showProject: false,
            selectedProject: undefined,
            activeIcon: null,
            showMenu: false,
            showTic: true,
        };
    },
    components: {
        icon,
        projectWindow,
        LowerBar,
        FontAwesomeIcon,
        StartMenu,
        Board,
        Window,
    },
    methods: {
        selectProject(project) {
            this.selectedProject = project;
            this.showProject = true;
        },
        deselect() {
            this.selectedProject = undefined;
            this.showProject = false;
        },
        toggleMenu() {
            console.log('yo toggle');
            this.showMenu = !this.showMenu;
        },
    },
    created() {
        windowBus.$on('projectSelected', project => {
            this.selectedProject = project;
            this.showProject = true;
        });
        windowBus.$on('close', type => {
            console.log(type);
            if (type == 'tic') {
                this.showTic = false;
            } else {
                this.selectedProject = undefined;
                this.showProject = false;
            }
        });
        windowBus.$on('minimize', type => {
            if (type == 'tic') {
                this.showTic = false;
            } else {
                this.showProject = !this.showProject;
            }
        });
        windowBus.$on('start', type => {
            if (type == 'tic') {
                this.showTic = true;
            }
        });
        windowBus.$on('toggleMenu', () => {
            this.toggleMenu();
        });
    },
};
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: lightblue;
    font-family: 'Montserrat', sans-serif;
}

.header {
    display: flex;
    height: 30px;
    width: 100%;
    background-color: #011627;
}

#main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
}
/* 
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
} */

.buttons {
    align-self: flex-end;
    color: #d90368;
}
</style>
