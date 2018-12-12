import axios from 'axios';
import _ from 'lodash';

const state = {
    fights: [],
    loading: false
};

const mutations = {
    GET_FIGHT_DATA(state, payload) {
        state.fights = payload;
    },
    LOADING_DATA(state) {
        state.loading = true;
    },
    DATA_LOADED(state) {
        state.loading = false;
    }
};

const actions = {
   async getFights({ commit }, data) {
       try {
            commit('LOADING_DATA');
            
            const fightsData = await axios(`https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/events/${data}/fights`);
            const fights = fightsData.data;

            if (fights) {
                commit('DATA_LOADED');
                console.log('fightsData', fights);
                commit('GET_FIGHT_DATA', fights);
            }
       } catch(e) {
            console.error(e);
       }
   }
};

const getters = {
    getFightsData : state => state.fights,
    fightsLoading: state => state.loading
};

const fightsModule = {
    state, 
    mutations,
    actions,
    getters
};

export default fightsModule;