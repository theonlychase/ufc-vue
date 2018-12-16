import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const state = {
    events: [],
    noEventResults: false,
    widgetevents: [],
    loadWidgets: false,
    loadEvents: false, 
    pageNumber: 0,
    eventError: false
};

const mutations = {
    GET_EVENT_DATA(state, payload) {
        state.events = payload;
        state.noEventResults = false;
    },
    NO_EVENT_DATA (state, payload) {
        state.noEventResults = true;
        state.events = [];
    },
    WIDGET_EVENTS (state, payload) {
        state.widgetevents = payload;
    },
    LOAD_WIDGET_EVENTS (state) {
        state.loadWidgets = true;
    },
    LOAD_WIDGET_SUCCESS (state) {
        state.loadWidgets = false;
    },
    LOAD_EVENTS (state) {
        state.loadEvents = true;
        state.pageNumber = 0;
    },
    LOAD_EVENTS_SUCCESS (state) {
        state.loadEvents = false;
    },
    NEXT_PAGE (state) {
        state.pageNumber = state.pageNumber + 1;
    }, 
    PREV_PAGE (state) {
        state.pageNumber = state.pageNumber - 1;
    },
    EVENT_ERROR (state) {
        state.loadEvents = false;
        state.eventError = true;
    }
};

const actions = {
    async widgetevents({ commit }) {
        try {
            commit('LOAD_WIDGET_EVENTS');
            let month = Number(moment().format("MM"));
            if (month < 12) {
                month++;
            } else if (month === 12) {
                month = 1;
            }
            let monthAhead = String(month);
            if (monthAhead.length === 1) {
                monthAhead = "0" + monthAhead;  
            }
            const day = moment().format("DD");
            const year = moment().format("YYYY");
            const currentDate = moment().format("MM/DD/YYYY");
            const results = [];
            const widgetData = await axios('https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/events');
            const widgetevents = await widgetData.data.reverse();

            for (let i = 0; i < widgetevents.length; i++) {
                for (let key in widgetevents[i]) {
                    if (key === "event_date") {
                        const eventDate = moment(String(widgetevents[i][key])).format("MM/DD/YYYY");
                        if (moment(eventDate).isBetween(currentDate, `${monthAhead}/${day}/${year}`)) {
                            results.push(widgetevents[i]);
                        }
                    }
                }
            }

            commit('LOAD_WIDGET_SUCCESS');
            commit('WIDGET_EVENTS', results);
        } catch (e) {
            console.error("Error", e);
        }
    },
    async searchEvents({ commit }, data) {
        try {
            commit('LOAD_EVENTS');
            // Makes an array with each search term split, then lowercases each
            let dataArr = data.split(" ").map(data => data.toLowerCase());
            // If only one word was searched, then its lowercased
            let dataStr = data.toLowerCase();
            let results = [];
            const eventData = await axios('https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/iphone/events');

            // Gets event data an lowercases anything data that is: 1.String 2.less than 30 characters (bc of URL strings), if not, returns original data
            const events = await eventData.data.map((obj, index, arr) => {
                return _.mapValues(obj, function(s) { 
                    return _.isString(s) ? (s.length < 30 ? s.toLowerCase() : s) : s; 
                });
            });

            for (let i = 0; i < events.length; i++) {
                for (let key in events[i]) {
                    // If this symbol exists, remove it
                    if (_.includes(events[i][key], '®')) {
                        events[i][key] = events[i][key].replace('®', '');
                        events[i][key] = events[i][key].replace(/\s+$/, '');
                    }
                    if (key === "base_title" || key === "location") {
                        if (_.includes(events[i][key], `${dataStr},`)) {
                            let locArr = events[i][key].split(" ");
                            if (locArr[locArr.length - 1].length === 2) {
                                locArr[locArr.length - 1] = locArr[locArr.length - 1].toUpperCase();
                                let final = locArr.join(" ");
                                events[i][key] = final;
                            }
                            // results.push(events[i]);
                        } 
                        if (_.includes(events[i][key], `,`)) {
                            let locArr = events[i][key].split(" ");
                            if (locArr[locArr.length - 1].length === 2) {
                                locArr[locArr.length - 1] = locArr[locArr.length - 1].toUpperCase();
                                let final = locArr.join(" ");
                                events[i][key] = final;
                            }
                        }
                        events[i][key] = events[i][key].replace(/\s+$/, '');
                        if (key === "base_title") { 
                            const terms = events[i][key].split(' ');
                            const doubles = terms.filter((element) => {
                                return dataArr.every(function(e) {
                                    return element.toLowerCase().indexOf(e.toLowerCase()) !== -1;
                                })
                            })
                            if (doubles.length > 1) {
                                results.push(events[i]);
                            }
                        }
                        if (dataStr === events[i][key]) {
                            results.push(events[i]);
                        }
                    }
                }
            }

            if (results.length === 1) {
                console.log("1 match", results);
            } else if (results.length === 0) {
                for (let i = 0; i < events.length; i++) {
                    for (let key in events[i]) {
                        if (key === "base_title" || key === "location") {
                            // if (_.includes(events[i][key], `,`)) {
                            //     let locArr = events[i][key].split(" ");
                            //     if (locArr[locArr.length - 1].length === 2) {
                            //         locArr[locArr.length - 1] = locArr[locArr.length - 1].toUpperCase();
                            //         let final = locArr.join(" ");
                            //         events[i][key] = final;
                            //     }
                            // }
                            // if (_.includes(events[i][key], dataArr)) {
                            //     results.push(events[i]);
                            // }
                            if (events[i][key].includes(dataStr)) {
                                results.push(events[i]);
                            }
                        }
                    }
                }
            }

            if (results.length) {
                commit('GET_EVENT_DATA', results);
                commit('LOAD_EVENTS_SUCCESS');
            } else {
                commit('NO_EVENT_DATA');
                commit('LOAD_EVENTS_SUCCESS');
            }
        } catch (e) {
            commit('EVENT_ERROR');
            console.error("Error", e);
        }
    },
    getNextPage({ commit }) {
        commit('NEXT_PAGE');
    },
    getPrevPage({ commit }) {
        commit('PREV_PAGE');
    },
};

const getters = {
    getEvents: state => state.events,
    noEventResults: state => state.noEventResults,
    getWidgetEvents: state => state.widgetevents,
    isLoading: state => state.loadWidgets,
    loadEvents: state => state.loadEvents,
    getEvent: (state) => (id) => {
        const combineEventState = [...state.events, ...state.widgetevents];
        return combineEventState.find((event) => {
            return event.id === id;
        });
    },
    getWidgetEvent: (state) => (id) => {
        return state.widgetEvents.find((widgetevent) => {
            return widgetevent.id === id;
        });
    },
    getPageNumber: state => state.pageNumber,
    nextPageCount: (state) => {
        let l = state.events.length,
            s = 10;
        return Math.floor(l / s);
    },
    paginatedData: (state) => {
        const start = state.pageNumber * 10,
              end = start + 10;
        const events = state.events;
        return events.slice(start, end);
    },
    eventError: state => state.eventError
};

const eventsModule = {
    state, 
    mutations,
    actions,
    getters
};

export default eventsModule;