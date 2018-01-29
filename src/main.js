import App from './App';
import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import FontAwesome from '@fortawesome/fontawesome';

import { faGithub } from '@fortawesome/fontawesome-free-brands';
import {
  faWindowMinimize,
  faWindowMaximize,
  faWindowClose,
} from '@fortawesome/fontawesome-free-solid';

import { faEject } from '@fortawesome/fontawesome-pro-regular';

FontAwesome.library.add(faGithub, faWindowClose, faWindowMaximize, faWindowMinimize);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.component('vue-draggable-resizable', VueDraggableResizable);

export const windowBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App),
});
