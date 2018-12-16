<template>
    <tr>
        <td>
            <div class="event_widget-info">
                <div class="event_widget-img">
                    <figure class="image is-32x32" v-if="event.feature_image">
                        <img :src="event.feature_image" alt="Placeholder image">
                    </figure>
                    <figure class="image is-32x32" v-else>
                        <img src="../assets/ufc_placeholder.jpg" alt="Placeholder image">
                    </figure>
                </div>
                <div class="event_widget-name">
                    <p class="title is-6 is-uppercase"><router-link :to="'/events/' + event.id">{{ event.base_title }}</router-link></p>
                </div>
            </div>
        </td>
        <td class="event_date"><p class="subtitle is-6">{{ event.event_date | formatDate }}</p></td>
        <td class="event_location"><p class="is-capitalized">{{ event.location }}</p></td>
    </tr>
    <!-- <div class="card">
        <div class="card-image">
            <figure class="image is-4by3" v-if="event.feature_image">
                <img :src="event.feature_image" alt="Placeholder image">
            </figure>
            <figure class="image is-4by3" v-else>
                <img src="../assets/ufc_placeholder.jpg" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">

            <p class="title is-4"><router-link :to="'/events/' + event.id">{{ event.base_title }}</router-link></p>
            <p class="subtitle is-6 is-italic">"{{ event.event_date | formatDate }}"</p>

            <div class="content">
                <p>{{ event.location }}</p>.
            </div>
        </div>
    </div> -->
</template>

<script>
    import moment from 'moment';
    
    export default {
        name: 'Events',
        props: ['event'],
        filters: {
            formatDate(value) {
                if (!value) return "";
                return moment(String(value)).format('MM/DD/YY')
            }
        },
    }
</script>

<style>
    .event_date, .event_location {
        vertical-align: middle !important;
    }
    .event_widget-img figure {
        display: flex;
        align-items: center;
    }
    @media screen and (max-width:500px) {
        .event_widget-info .title.is-6, .event_date .subtitle.is-6, .event_location p {
            font-size: .75rem;
        }
        .event_date .subtitle.is-6 {
            white-space: nowrap;
        }
    }
</style>