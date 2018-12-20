<template>
    <div class="">
        <div v-if="loadingGirls">
            <Loading></Loading>
        </div>
        <div v-else-if="getOctagonGirls.length">
            <h3 class="header_th">UFC Octagon Girls</h3>
            <div class="girl-container">
                <div class="card hvr-underline-from-center" v-for="(girl,i) in getOctagonGirls" :key="'girl' + i">
                    <div>
                        <div class="content-overlay"></div>
                        <div class="girl_img">
                            <img :src="girl.large_profile_picture" alt="Placeholder image">
                        </div>
                        <div class="card-content-custom fadeIn-bottom">
                            <p class="has-text-left weight_class"></p>
                            <p class="title is-5 girl_name" v-if="girl.websiteurl">
                                <a target="_blank" :href="girl.websiteurl">{{ girl.first_name | upperCase }} {{ girl.last_name | upperCase }}</a>
                            </p>
                            <p class="title is-5 girl_name" v-else>
                                <a target="_blank" href="https://www.instagram.com/ufcoctagongirls/">{{ girl.first_name | upperCase }} {{ girl.last_name | upperCase }}</a>
                            </p>
                            <!-- <p class="has-text-left champion">Champion</p>
                            <p class="has-text-left record"></p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Loading from './Loading.vue';

    export default {
        name: 'OctagonGirlsList',
        created() {
            this.setOctagonGirls()
        },
        watch: {
            '$route': 'setOctagonGirls'
        },
        filters: {
            upperCase(value) {
                if (!value) return "";
                return _.upperCase(value);
            }
        },
        computed: {
            ...mapGetters([
                'getOctagonGirls',
                'loadingGirls'
            ])
        }, 
        methods: {
            ...mapActions([
                'setOctagonGirls'
            ])
        },
        components: {
            Loading
        }
    }
</script>

<style>
    .girl-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 20px;
        margin-bottom: 30px;
    }
    .weight_class {
        font-weight: 700;
    }
    .header_th {
        text-transform: capitalize;
        font-size: 1.5rem;
        padding-bottom: 10px;
    }
    .tbd {
        color: #d20a0a;
        margin-bottom: 0 !important;
    }
    .tholder_name {
        margin-bottom: 0 !important;
    }
    .champion {
        text-transform: uppercase;
        font-size: .7rem;
        color: #abadb1;
    }
    .record {
        text-transform: uppercase;
        font-size: .6rem !important;
        color: #abadb1;
        padding-top: 0 !important;
    }
    .card .content-overlay {
        background: rgba(0,0,0,0.7);
        position: absolute;
        height: 99%;
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        -webkit-transition: all 0.4s ease-in-out 0s;
        -moz-transition: all 0.4s ease-in-out 0s;
        transition: all 0.4s ease-in-out 0s;
    }
    .card:hover .content-overlay {
        opacity: 1;
    }
    .card-content-custom {
        position: absolute;
        text-align: center;
        padding-left: 1em;
        padding-right: 1em;
        width: 100%;
        top: 50%;
        left: 50%;
        opacity: 0;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }
    .fadeIn-bottom {
        top: 80%;
    }
    .card:hover .card-content-custom {
        top: 50%;
        left: 50%;
        opacity: 1;
    }
    .girl_img img {
        width: 100%;
    }
    .girl_name a {
        color: #fff;
    }
</style>