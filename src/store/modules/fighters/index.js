import axios from 'axios';
import _ from 'lodash';

const state = {
    fighter: [],
    fighterMedia: [],
    titleHolders: [],
    mensTitleHolders: [],
    womensTitleHolders: [],
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
        state.noMedia = false;
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
    },
    ALL_TITLE_HOLDERS (state, payload) {
        state.titleHolders = payload;
    },
    MENS_TITLE_HOLDERS (state, payload) {
        state.mensTitleHolders = payload;
    },
    WOMENS_TITLE_HOLDERS (state, payload) {
        state.womensTitleHolders = payload;
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
            let results = [];
            const fighterMedia = await axios(`https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/fighters/${data}/media`);
            const media = fighterMedia.data;

            for (let i = 0; i < media.length; i++) {
                for (let key in media[i]) {
                    if (key === "type") {
                        if (media[i][key] !== "PHOTOGALLERY") {
                            results.push(media[i]);
                        } 
                    }
                }
            }

            let finalResults = results.slice(0,8);
            
            console.log("media results", finalResults);
            if (finalResults.length) {
                commit('GET_MEDIA', finalResults);
                commit('MEDIA_LOADED');
            } else {
                commit('NO_MEDIA');
                commit('MEDIA_LOADED');
            }
        } catch(e) {
            console.error("Error", e);
        }
    },
    async setTitleHolders({ commit }, data) {
        try {
            commit('LOADING_DATA');
            const mens = [];
            const womens = [];
            const titleHolders = await axios(`https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/fighters/title_holders`);
            const titleHolder = titleHolders.data.map((obj, index, arr) => {
                return _.mapValues(obj, function(s) { 
                    return _.isString(s) ? (s.length < 20 ? s.toLowerCase() : s) : s; 
                });
            });

            for (let i = 0; i < titleHolder.length; i++) {
                for (let key in titleHolder[i]) {
                    if (key === "weight_class") {
                        if (titleHolder[i][key] !== "PHOTOGALLERY") {
                            if (_.includes(titleHolder[i][key], 'women')) {
                                womens.push(titleHolder[i]);
                            } else {
                                mens.push(titleHolder[i]);
                            }
                        } 
                    }
                }
            }

            if (titleHolder.length) {
                commit('ALL_TITLE_HOLDERS', titleHolder);
            }
            if (mens.length) {
                commit('MENS_TITLE_HOLDERS', mens);
            }
            if (womens.length) {
                commit('WOMENS_TITLE_HOLDERS', womens);
            }
            commit('DATA_LOADED');
        } catch (e) {
            commit('NETWORK_ERROR');
            console.error("Error", e);
        }
    }
};

const getters = {
    getFighters: state => state.fighter,
    getMensTH: state => state.mensTitleHolders,
    getWomensTH: state => state.womensTitleHolders,
    getTitleHolders: (state) => (id) => {
        return state.titleHolders.find((tholder) => {
            return tholder.id === id;
        });
    },
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