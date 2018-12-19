import axios from 'axios';
import _ from 'lodash';

const state = {
    fighter: [],
    fighterMedia: [],
    noResults: false,
    noMedia: false,
    loading: false,
    mediaLoading: false,
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
    GET_MEDIA (state, payload) {
        state.fighterMedia = payload;
    },
    NO_MEDIA (state) {
        state.noMedia = true;
        state.fighterMedia = [];
    },
    LOADING_DATA (state) {
        state.error = false;
        state.loading = true;
    },
    DATA_LOADED (state) {
        state.loading = false;
    },
    LOADING_MEDIA (state) {
        state.mediaLoading = true;
    },
    MEDIA_LOADED (state) {
        state.mediaLoading = false;
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

            console.log("fighters", results);
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
    },
    async getFighterMedia({ commit }, data) {
        try {
            commit('LOADING_MEDIA');
            const fighterMedia = await axios(`https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/fighters/${data}/media`);
            const media = fighterMedia.data.slice(0, 8);

            console.log("media", media);
            if (media.length) {
                commit('GET_MEDIA', media);
                commit('MEDIA_LOADED');
            } else {
                commit('NO_MEDIA');
                commit('MEDIA_LOADED');
            }
        } catch(e) {
            console.error("Error", e);
        }
    }
};

const getters = {
    getFighters: state => state.fighter,
    getFighter: (state) => (id) => {
        return state.fighter.find((fighter) => {
            return fighter.id === id;
        });
    },
    fighterMedia: state => state.fighterMedia,
    noMedia: state => state.noMedia,
    noResults: state => state.noResults,
    loading: state => state.loading,
    loadMedia: state => state.mediaLoading,
    error: state => state.error
};

const fighterModule = {
    state, 
    mutations,
    actions,
    getters
};

export default fighterModule;