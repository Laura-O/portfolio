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
            :initialHeight="400" :initialWidth="400"
            :class="{major:selectedProject !== undefined}"
            >
        </project-window>
        <about v-if="showAboutWindow"
            :initialHeight="300" :initialWidth="400"
            @close="showAbout = false"
            :class="{minor:selectedProject !== undefined}"
            type="about">
        </about>
        <terminal v-if="showTerminalWindow"        
            @close="showTerminal = false"
            type="terminal">
        </terminal>
      <window v-if="showTicWindow" :initialHeight="400" :initialWidth="300" type="tic">
          <div slot="text" class="text">Tic Tac Toe</div>
          <board></board>
        </window>
      <start-menu v-if="showMenu"></start-menu>
    </div>
    <lower-bar
        :showProject="showProject"
        :tic="showTicEntry"
        :terminal="this.showTerminalEntry"
        :about="this.showAboutEntry"
        :selectedProject="selectedProject"
        v-on:toggleMenu="toggleMenu">
    </lower-bar>
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
            showAboutWindow: true,
            showAboutEntry: true,
            showTerminalWindow: false,
            showTerminalEntry: false,
        };
    },
    computed: {
        currentWidth: function () { return window.innerWidth },
        currentHeight: function () { return window.innerHeight }
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
    background-color: #232630;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
    font-family: 'Montserrat', sans-serif;
}

.window {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
}

#main {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-end;
    flex: 1;
    padding-bottom: 15px;
    max-height: 95vh;
}

.buttons {
    align-self: flex-end;
    color: #232630;
}

.buttons div:hover {
    transform: scale(1.1);
}

.window-bottom {
    height: 20px;
    background-color: #828081;
}

.window-top {
    min-height: 20px;
    background-color: #828081;
    color: #0a1612;
    padding: 2px 5px;
    display: flex;
    justify-content: space-between;
}

.window-content {
    padding: 10px;
    overflow-y: auto;
}

.window-bottom {
    height: 20px;
    background-color: #828081;
}

.active {
    z-index: 999 !important;
}

.major {
    z-index: 998 !important;
}

.minor {
    z-index: 997 !important;
}

.handle {
    background: transparent !important;
}

a.highlight-link {
    text-decoration: none;
    color: black;
    background: linear-gradient(
        to top,
        rgba(217, 3, 104, 0.4) 35%,
        transparent 35%
    );
}

a.highlight-link:hover {
    background: linear-gradient(
        to top,
        rgba(217, 3, 104, 0.4) 100%,
        transparent 45%
    );
}

.fa-window-minimize:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.fa-window-close:hover {
    transform: scale(1.1);
    cursor: pointer;
}
</style>
