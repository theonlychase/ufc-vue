<template>
    <div>
        <div v-if="loadMedia">
            <Loading></Loading>
        </div>
        <div v-else-if="fighterMedia.length">
            <h3 class="media_name" v-if="getFighter">Latest {{ getFighter.full_name }} Media</h3>
            <h3 class="media_name" v-else-if="getEventFighter1">
                Latest {{ getEventFighter1.fighter1_first_name }} {{ getEventFighter1.fighter1_last_name }} Media
            </h3>
            <h3 class="media_name" v-else-if="getEventFighter2">
                Latest {{ getEventFighter2.fighter2_first_name }} {{ getEventFighter2.fighter2_last_name }} Media
            </h3>
            <h3 class="media_name" v-else-if="getTitleHolders">
                Latest {{ getTitleHolders.first_name }} {{ getTitleHolders.last_name }} Media
            </h3>
            <div class="grid-container">
                <!-- <div class="" v-for="(media,i) in fighterMedia" :key="'media' + i"> -->
                <!-- <div class="grid-item" v-for="(media,i) in fighterMedia" :key="'media' + i">
                    <img :src="media.thumbnail" alt="">
                </div> -->
                <div class="card hvr-underline-from-center" v-for="(media,i) in fighterMedia" :key="'media' + i">
                    <div class="card-image">
                        <figure class="image" v-if="media.thumbnail">
                            <img :src="media.thumbnail" alt="Placeholder image">
                        </figure>
                        <figure class="image" v-else>
                            <img src="../assets/fighter_placeholder.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <p class="weight_class has-text-left">{{ media.published_start_date | formatDate }}</p>
                        <p class="subtitle is-6 has-text-weight-bold has-text-left" v-if="media.type === 'EMBEDDEDVIDEO'">
                            <a :href="'https://youtube.com/watch?v=' + media.embedded_id" target="_blank">{{ media.title }}</a> 
                        </p>
                        <p class="subtitle is-6 has-text-weight-bold has-text-left" v-else-if="media.type === 'INTERNALVIDEO'">
                            <a :href="'http://pdvid.ufc.tv' + media.internal_url" target="_blank">{{ media.title }}</a> 
                        </p>
                        <p class="has-text-left media-desc">
                            {{ media.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="noMedia">
            <h3>There is currently no media for this fighter.</h3>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Loading from './Loading.vue';
    import moment from 'moment';

    export default {
        name: 'Fighter',
        created() {
            this.getFighterMedia(this.id)
        },
        watch: {
            '$route': 'getFighterMedia'
        },
        props: ['id'],
        filters: {
            upperCase(value) {
                if (!value) return "";
                return _.upperCase(value);
            },
            formatDate(value) {
                if (!value) return "";
                return moment(String(value)).format('MM/DD/YY')
            }
        },
        computed: {
            ...mapGetters([
                'fighterMedia',
                'loadMedia',
                'noMedia'
            ]),
            getFighter() {
                return this.$store.getters.getFighter(Number(this.id));
            },
            getEventFighter1() {
                return this.$store.getters.getEventFighter1(Number(this.id));
            },
            getEventFighter2() {
                return this.$store.getters.getEventFighter2(Number(this.id));
            },
            getTitleHolders() {
                return this.$store.getters.getTitleHolders(Number(this.id));
            }
        },
        methods: {
            ...mapActions([
                'getFighterMedia'
            ])
        },
        components: {
            Loading
        }
    }
</script>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
    }
    .media_name {
        text-transform: capitalize;
        font-size: 1.5rem;
        padding-bottom: 10px;
    }
    .media-desc {
        font-size: .9rem;
    }
</style>