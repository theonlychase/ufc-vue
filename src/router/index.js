import Vue from 'vue';
import VueRouter from 'vue-router';
import Fighter from '../components/Fighter.vue';
import FighterList from '../components/FighterList.vue';
import NotFound from '../components/NotFound.vue';
import Home from '../components/Home.vue';
import Event from '../components/Event.vue';
import EventsList from '../components/EventsList.vue';
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
            path: '/fighters/:id',
            component: Fighter,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                const currState = store.state.fighter.fighter;
                const ids = [];
                for (var i = 0; i < currState.length; i++) {
                    for (var key in currState[i]) {
                        if (currState[i][key] == id) {
                            ids.push(currState[i][key]);
                        }
                    }
                }
                if (!ids.includes(Number(id))) next('/not-found');
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
            path:'/events/:id',
            name: 'event',
            component: Event,
            props: true
            // beforeEnter: (to, from, next) => {
            //     const id = to.params.id;
            //     console.log("store.state.widgetevents.widgetevents", store.state.events.widgetevents);
            //     const currState = store.state.events.widgetevents;
            //     const ids = [];
            //     for (var i = 0; i < currState.length; i++) {
            //         for (var key in currState[i]) {
            //             if (currState[i][key] == id) {
            //                 ids.push(currState[i][key]);
            //             }
            //         }
            //     }
            //     if (!ids.includes(Number(id))) next('/not-found');
            //     else next();
            // }
        },
        {
            path: '*',
            component: NotFound
        },
        
    ]
}); 

export default router;