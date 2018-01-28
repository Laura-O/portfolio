<template>
  <div id="app">
    <div class="header">Header</div>
    <div id="main">
      <window></window>
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
      <start-menu></start-menu>
    </div>
    <lower-bar :showProject="showProject" :selectedProject="selectedProject"></lower-bar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import window from './components/Window';
import icon from './components/Icon';
import projects from './projects.json';
import projectWindow from './components/ProjectWindow';
import LowerBar from './components/LowerBar';
import StartMenu from './components/StartMenu';
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
    };
  },
  components: {
    window,
    icon,
    projectWindow,
    LowerBar,
    FontAwesomeIcon,
    StartMenu,
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
  },
  created() {
    windowBus.$on('projectSelected', project => {
      this.selectedProject = project;
      this.showProject = true;
    });
    windowBus.$on('close', () => {
      this.selectedProject = undefined;
      this.showProject = false;
    });
    windowBus.$on('minimize', () => {
      this.showProject = !this.showProject;
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

.footer {
  display: flex;
  height: 30px;
  background-color: #011627;
}

#main {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
}

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
}

.buttons {
  align-self: flex-end;
  color: #d90368;
}
</style>
