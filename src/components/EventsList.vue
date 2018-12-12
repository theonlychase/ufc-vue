<template>
    <div class="columns is-multiline is-mobile events_list">
        <div class="column is-9-desktop is-8-tablet is-12-mobile">
            <div v-if="getEvents.length">
                <h3 class="widget-title">Event Search Results</h3>
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
                <a v-if="getPageNumber == 0" disabled class="button is-small">Prev</a>
                <a v-else @click="getPrevPage" class="button is-small">Prev</a>
                <a v-if="getPageNumber > nextPageCount - 1" :disabled="getPageNumber > nextPageCount - 1" class="button is-small">Next</a>
                <a v-else @click="getNextPage" class="button is-small">Next</a>
            </div>
            <div v-else-if="noEventResults">
                <h3>No Event Found. Please search again</h3>
            </div>
        </div>
         <div class="column is-3-desktop is-12-mobile is-4-tablet" v-if="getWidgetEvents.length">
            <h3 class="widget-title">Upcoming UFC Events</h3>
            <div class="columns is-multiline is-mobile">
                <div class="column is-half-mobile is-12-tablet" v-for="(widgetevent,i) in getWidgetEvents" :key="'widget' + i">
                    <EventWidget :widgetevent="widgetevent"></EventWidget>
                </div>
            </div>
        </div>
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
                'isLoading',
                'noEventResults',
                'getPageNumber',
                'nextPageCount',
                'paginatedData'
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
</style>