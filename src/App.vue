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
      <about></about>
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
import About from './components/About';
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
            showTic: false,
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
        About,
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
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23d90368' fill-opacity='0.05' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
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

a.highlight-link {
    text-decoration: none;
    font-weight: 600;
    background: linear-gradient(to top, rgba(217, 3, 104, 0.4) 35%, transparent 35%);
}
a.highlight-link:hover {
    background: #d90368;
}
</style>
