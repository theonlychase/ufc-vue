import axios from 'axios';

const state = {
    girls: [],
    loadingGirls: false,
    girlsError: false
};

const mutations = {
    SET_GIRL_DATA(state, payload) {
        state.girls = payload;
    },
    LOADING_GIRLS(state) {
        state.loadingGirls = true;
        state.girlsError = false;
    },
    GIRLS_LOADED(state) {
        state.loadingGirls = false;
    },
    GIRLS_ERROR(state) {
        state.girlsError = true;
    }
};

const actions = {
   async setOctagonGirls({ commit }, data) {
       try {
            commit('LOADING_GIRLS');
            
            const girlsData = await axios(`https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/octagon_girls`);
            const girls = girlsData.data;
            console.log("girls", girls);

            if (girls) {
                commit('GIRLS_LOADED');
                commit('SET_GIRL_DATA', girls);
            }
       } catch(e) {
            commit('GIRLS_ERROR');
            console.error(e);
       }
   }
};

const getters = {
    getOctagonGirls: state => state.girls,
    loadingGirls: state => state.loadingGirls
};

const girlsModule = {
    state, 
    mutations,
    actions,
    getters
};

export default girlsModule;