import Vue from 'vue';
import Vuex from 'vuex';
import fighter from './modules/fighters/index.js';
import events from './modules/events/index.js';
import fights from './modules/fights/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        fighter,
        events,
        fights
    }
});