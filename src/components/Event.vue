<template>
    <div class="columns is-multiline is-mobile">
        <div class="column is-12-desktop" v-if="fightsLoading">
            <Loading></Loading>
        </div>
        <div class="column is-12-desktop" v-else-if="getFightsData.length">
            <div class="columns is-multiline is-mobile">
                <div class="column is-4-desktop is-6-tablet is-12-mobile is-flex" v-for="(fight,i) in getFightsData" :key="'fight' + i">
                    <div class="columns is-multiline is-mobile box">
                        <div class="column is-6-desktop">
                            <figure class="image is-4by3" v-if="fight.fighter1_profile_image">
                                <img :src="fight.fighter1_profile_image" alt="Placeholder image">
                            </figure>
                            <figure class="image is-4by3" v-else>
                                <img src="../assets/fighter_placeholder.png" alt="Placeholder image">
                            </figure>
                            <p class="subtitle is-6 nickname" v-if="fight.fighter1_nickname">"{{ fight.fighter1_nickname | trim }}"</p>
                            <p class="title is-6">{{ fight.fighter1_first_name }} {{ fight.fighter1_last_name }}</p>
                        </div>
                        <div class="column is-6-desktop">
                            <figure class="image is-4by3" v-if="fight.fighter2_profile_image">
                                <img :src="fight.fighter2_profile_image" alt="Placeholder image">
                            </figure>
                            <figure class="image is-4by3" v-else>
                                <img src="../assets/fighter_placeholder.png" alt="Placeholder image">
                            </figure>
                            <p class="subtitle is-6 nickname" v-if="fight.fighter2_nickname">"{{ fight.fighter2_nickname | trim }}"</p>
                            <p class="title is-6">{{ fight.fighter2_first_name }} {{ fight.fighter2_last_name }}</p>
                        </div>
                        <div class="column is-12 fighter_stats">
                            <div class="columns is-multiline is-mobile">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_wins }} - {{ fight.fighter1_losses }} - {{ fight.fighter1_draws }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Record</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_wins }} - {{ fight.fighter2_losses }} - {{ fight.fighter2_draws }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_kdaverage }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Knockdown Avg</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_kdaverage }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_submissionsaverage }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Sub</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_submissionsaverage }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1height }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Height</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2height }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1weight }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Weight</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2weight }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1reach }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Reach</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2reach }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                </div>
                                <div class="column is-4">
                                    <span>Significant Strikes</span>
                                </div>
                                <div class="column is-4">
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_slpm }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Landed Per Minute</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_slpm }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_strikingaccuracy }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Accuracy</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_strikingaccuracy }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_sapm }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Absorbed P/M</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_sapm }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_strikingdefense }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Defense</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_strikingdefense }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                </div>
                                <div class="column is-4">
                                    <span>Grappling</span>
                                </div>
                                <div class="column is-4">
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_takedownaverage }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Takedown Avg</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_takedownaverage }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_takedownaccuracy }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Accuracy</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_takedownaccuracy }}</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-mobile is-centered">
                                <div class="column is-4">
                                    <span>{{ fight.fighter1_takedowndefense }}</span>
                                </div>
                                <div class="column is-4">
                                    <span>Defense</span>
                                </div>
                                <div class="column is-4">
                                    <span>{{ fight.fighter2_takedowndefense }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import Loading from './Loading.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Event',
        created() {
            this.getFights(this.id)
        },
        watch: {
            '$route': 'getFights'
        },
        props: ['id'],
        filters: {
            formatDate(value) {
                if (!value) return "";
                return moment(String(value)).format('MM/DD/YYYY')
            },
            trim(value) {
                if (!value) return "";
                return value.trim();
            }
        },
        computed: {
            ...mapGetters([
                'getEvent',
                'getFightsData',
                'fightsLoading'
            ])
            // getEvent() {
            //     return this.$store.getters.getEvent(Number(this.id));
            // }
        },
        methods: {
            ...mapActions([
                'getFights'
            ])
        },
        components: {
            Loading
        }
    }
</script>

<style>
    /* .fight_container {
        margin: 0 auto;
    } */
    .m-r {
        margin-right: 5px;
    }
    .m-l {
        margin-left: 5px;
    }
    .nickname {
        font-size: 13px !important;
        font-weight: 600;
    }
    .fighter_stats .column.is-4 {
        padding: 0;
    }
    .fighter_stats .column.is-4 span {
        font-size: 13px;
    }
    .fighter_stats .columns .column.is-4:nth-child(2) span {
        font-weight: 600;
    }
    .is-flex .box {
        width: 100%;
    }
</style>