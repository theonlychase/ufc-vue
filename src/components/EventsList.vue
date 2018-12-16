<template>
    <div class="columns is-multiline is-mobile events_list">
        <div class="column is-12-desktop">
            <div v-if="loadEvents">
                <Loading></Loading>
            </div>
            <div v-else-if="getEvents.length">
                <h3 class="widget-title">UFC Event Search Results</h3>
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody v-for="(event, i) in paginatedData" :key="'event'+ i">
                        <Events :event="event"></Events>
                    </tbody>
                </table>
                <a v-if="getPageNumber == 0" disabled class="button is-small prev"><span class="icon"><i class="fas fa-arrow-left"></i></span> Prev</a>
                <a v-else @click="getPrevPage" class="button is-small prev"><span class="icon"><i class="fas fa-arrow-left"></i></span> Prev</a>
                <a v-if="getPageNumber > nextPageCount - 1" :disabled="getPageNumber > nextPageCount - 1" class="button is-small next">Next <span class="icon"><i class="fas fa-arrow-right"></i></span></a>
                <a v-else @click="getNextPage" class="button is-small next">Next <span class="icon"><i class="fas fa-arrow-right"></i></span></a>
            </div>
            <div v-else-if="eventError">
                <h3>No Event Found. Please search again</h3>
            </div>
            <div v-else>
                <h3>Search for an event!</h3>
            </div>
        </div>
         <!-- <div class="column is-3-desktop is-12-mobile is-4-tablet" v-if="getWidgetEvents.length">
            <h3 class="widget-title">Upcoming UFC Events</h3>
            <div class="columns is-multiline is-mobile">
                <div class="column is-half-mobile is-12-tablet" v-for="(widgetevent,i) in getWidgetEvents" :key="'widget' + i">
                    <EventWidget :widgetevent="widgetevent"></EventWidget>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import Loading from './Loading.vue';
    import EventWidget from './EventWidget.vue';
    import Event from './Event.vue';
    import Events from './Events.vue';

    export default {
        name: 'EventsList',
        created() {
            this.widgetevents()
        },
        watch: {
            '$route': 'widgetevents'
        },
        computed: {
            ...mapGetters([
                'getEvents',
                'getWidgetEvents',
                'loadEvents',
                'noEventResults',
                'getPageNumber',
                'nextPageCount',
                'paginatedData',
                'eventError'
            ])
        },
        methods: {
            ...mapActions([
                'widgetevents',
                'getPrevPage',
                'getNextPage'
            ])
        },
        components: {
            Loading,
            EventWidget,
            Events
        }
    };
</script>

<style>
    .widget-title {
        font-size: 18px;
        margin-bottom: 10px;
    }
    .widget-event {
        margin-bottom: 15px;
    }
    .column.is-half-desktop {
        margin: 0 auto;
    }
    .events_list .card-content {
        padding: 1rem;
    }
    .prev {
        margin-right: 3px;
    }
    .prev, .next {
        background-color: #d20a0a;
        color: #fff;
        border-color: transparent;
    }
    .button.prev[disabled], .button.next[disabled]  {
        background-color: #d20a0a;
        border-color: transparent;
    }
    .prev:hover, .next:hover {
        background-color: #bf0909;
        border-color: transparent;
        color: #fff;
    }
    .next span {
        margin-left: 2px !important;
    }
    .next span i {
        font-size: 10px;
    }
    .prev span {
        margin-right: 2px !important;
    }
    .prev span i {
        font-size: 10px;
    }
</style>