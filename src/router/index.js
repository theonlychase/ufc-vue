import Vue from 'vue';
import VueRouter from 'vue-router';
import Fighter from '../components/Fighter.vue';
import FighterList from '../components/FighterList.vue';
import NotFound from '../components/NotFound.vue';
import Home from '../components/Home.vue';
import Event from '../components/Event.vue';
import EventsList from '../components/EventsList.vue';
import TitleHolders from '../components/TitleHolders.vue';
import store from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/fighters/not-found',
            name: 'fighternotfound',
            component: NotFound
        },
        {
            path: '/fighters/:id',
            component: Fighter,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                const fighterState = store.state.fighter.fighter;
                const fighterEventState = store.state.fights.fights;
                const titleHoldersState = store.state.fighter.titleHolders;
                const ids = [];
                for (var i = 0; i < fighterState.length; i++) {
                    for (var key in fighterState[i]) {
                        if (fighterState[i][key] == id) {
                            ids.push(fighterState[i][key]);
                        }
                    }
                }
                for (var i = 0; i < fighterEventState.length; i++) {
                    for (var key in fighterEventState[i]) {
                        if (fighterEventState[i][key] == id) {
                            ids.push(fighterEventState[i][key]);
                        }
                    }
                }
                for (var i = 0; i < titleHoldersState.length; i++) {
                    for (var key in titleHoldersState[i]) {
                        if (titleHoldersState[i][key] == id) {
                            ids.push(titleHoldersState[i][key]);
                        }
                    }
                }
                if (!ids.includes(Number(id))) next('/fighters/not-found');
                else next();
            }
        },
        {
            path: '/fighters',
            component: FighterList
        },
        {
            path: '/events',
            name: 'eventslist',
            component: EventsList
        },
        {
            path: '/events/not-found',
            name: 'eventnotfound',
            component: NotFound
        },
        {
            path:'/events/:id',
            name: 'event',
            component: Event,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                const currState = store.state.events.events;
                const ids = [];
                for (var i = 0; i < currState.length; i++) {
                    for (var key in currState[i]) {
                        if (currState[i][key] == id) {
                            ids.push(currState[i][key]);
                        }
                    }
                }
                if (!ids.includes(Number(id))) next('/events/not-found');
                else next();
            }
        },
        {
            path: '/title-holders',
            name: 'titleholders',
            component: TitleHolders
        },
        {
            path: '*',
            component: NotFound
        },
        
    ]
}); 

export default router;