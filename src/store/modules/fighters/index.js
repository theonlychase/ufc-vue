import axios from 'axios';
import _ from 'lodash';

const state = {
    fighter: [],
    noResults: false,
    loading: false, 
    error: false
};

const mutations = {
    GET_FIGHTER_DATA (state, payload) {
        state.fighter = payload;
        state.noResults = false;
    },
    NO_FIGHTER_DATA (state, payload) {
        state.noResults = true;
        state.fighter = [];
    },
    LOADING_DATA (state) {
        state.error = false;
        state.loading = true;
        state.fighter = [];
    },
    DATA_LOADED (state) {
        state.loading = false;
    },
    NETWORK_ERROR (state) {
        state.loading = false;
        state.error = true;
    }
};

const actions = {
    async searchFighter({ commit }, data) {
        try {
            commit('LOADING_DATA');
            let dataArr = data.split(" ").map(data => data.toLowerCase());
            let dataStr = data.toLowerCase();
            let results = [];
            const fighterData = await axios('https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/us/fighters');
            const fighters = await fighterData.data.map((obj, index, arr) => {
                return _.mapValues(obj, function(s) { 
                    return _.isString(s) ? (s.length < 20 ? s.toLowerCase() : s) : s; 
                });
            }).map(obj => {
                obj.full_name = `${obj.first_name} ${obj.last_name}`;
                return obj;
            });

            for (let i = 0; i < fighters.length; i++) {
                for (let key in fighters[i]) {
                    if (dataStr === fighters[i][key]) {
                        results.push(fighters[i]);
                    } 
                }
            }

            if (results.length === 0) {
                for (let i = 0; i < fighters.length; i++) {
                    for (let key in fighters[i]) {
                        if (key === "first_name" || key === "last_name" ||  key === "nickname" || key === "full_name") {
                            if (_.includes(fighters[i][key], dataArr)) {
                                results.push(fighters[i]);
                            }
                        }
                    }
                }
            }

            if (results.length) {
                commit('GET_FIGHTER_DATA', results);
                commit('DATA_LOADED');
            } else {
                commit('NO_FIGHTER_DATA');
                commit('DATA_LOADED');
            }
        } catch (e) {
             commit('NETWORK_ERROR');
             console.error("Error", e);
        }
    }    
};

const getters = {
    getFighters: state => state.fighter,
    noResults: state => state.noResults,
    loading: state => state.loading,
    error: state => state.error
};

const fighterModule = {
    state, 
    mutations,
    actions,
    getters
};

export default fighterModule;