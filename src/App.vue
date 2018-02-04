<template>
  <div id="app">
    <upper-bar></upper-bar>
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
            @close="showProject = false"            
            >
        </project-window>
        <about v-if="showAboutWindow"   
            @close="showAbout = false"
            type="about">
        </about>
        <terminal v-if="showTerminalWindow"        
            @close="showTerminal = false"
            type="terminal">
        </terminal>
      <window v-if="showTicWindow"  :initialHeight="400" :initialWidth="250" type="tic">
          <div slot="text" class="text">Tic Tac Toe</div>
          <board></board>
        </window>
      <start-menu v-if="showMenu"></start-menu>
    </div>
    <lower-bar :showProject="showProject" :tic="showTicEntry" :terminal="this.showTerminalEntry" :about="this.showAboutEntry" :selectedProject="selectedProject" v-on:toggleMenu="toggleMenu"></lower-bar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import icon from './components/Icon';
import projects from './projects.json';
import projectWindow from './components/ProjectWindow';
import About from './components/About';
import LowerBar from './components/LowerBar';
import UpperBar from './components/UpperBar';
import StartMenu from './components/StartMenu';
import Board from './components/Tic-Tac-Toe/Board';
import Terminal from './components/Terminal';
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
            showTicWindow: false,
            showTicEntry: false,
            showAboutWindow: false,
            showAboutEntry: false,
            showTerminalWindow: false,
            showTerminalEntry: false,
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
        UpperBar,
        Terminal,
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
            this.showMenu = !this.showMenu;
        },
    },
    created() {
        windowBus.$on('projectSelected', project => {
            this.selectedProject = project;
            this.showProject = true;
        });
        windowBus.$on('close', type => {
            if (type == 'tic') {
                this.showTicWindow = false;
                this.showTicEntry = false;
            } else if (type == 'about') {
                this.showAboutWindow = false;
                this.showAboutEntry = false;
            } else if (type == 'terminal') {
                this.showTerminalWindow = false;
                this.showTerminalEntry = false;
            } else {
                this.selectedProject = undefined;
                this.showProject = false;
            }
        });
        windowBus.$on('minimize', type => {
            if (type == 'tic') {
                this.showTicWindow = !this.showTicWindow;
            } else if (type == 'about') {
                this.showAboutWindow = !this.showAboutWindow;
            } else if (type == 'terminal') {
                this.showTerminalWindow = !this.showTerminalWindow;
            } else {
                this.showProject = !this.showProject;
            }
        });
        windowBus.$on('start', type => {
            if (type == 'tic') {
                this.showTicWindow = true;
                this.showTicEntry = true;
            } else if (type == 'project') {
                this.selectedProject = projects['project1'];
                this.showProject = true;
            } else if (type == 'terminal') {
                this.showTerminalWindow = true;
                this.showTerminalEntry = true;
            } else if (type == 'about') {
                this.showAboutWindow = true;
                this.showAboutEntry = true;
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
    background-color: #2a628f;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    font-family: 'Montserrat', sans-serif;
}

#main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
}

.buttons {
    align-self: flex-end;
    color: #d90368;
}

.active {
    z-index: 999 !important;
}

a.highlight-link {
    text-decoration: none;
    font-weight: 600;
    background: linear-gradient(to top, rgba(217, 3, 104, 0.4) 35%, transparent 35%);
}
a.highlight-link:hover {
    background: #d90368;
}

.active {
    z-index: 999;
}
</style>
