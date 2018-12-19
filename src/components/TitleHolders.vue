<template>
    <div class="">
        <div v-if="loading">
            <Loading></Loading>
        </div>
        <div v-else-if="getMensTH.length">
            <h3 class="header_th">Men's UFC Title Holders</h3>
            <div class="th-container">
                <div class="card hvr-underline-from-center" v-for="(tholder,i) in getMensTH" :key="'tholder' + i">
                    <div class="card-content">
                        <p class="has-text-left weight_class">{{ tholder.weight_class | upperCase }}</p>
                        <p class="title is-5 has-text-left tholder_name" v-if="tholder.id !== null">
                            <router-link :to="'/fighters/' + tholder.id">{{ tholder.first_name | upperCase }} {{ tholder.last_name | upperCase }}</router-link>
                        </p>
                        <p class="title is-5 has-text-left tbd" v-else>
                            {{ tholder.first_name | upperCase }} {{ tholder.last_name | upperCase }}
                        </p>
                        <p class="has-text-left champion">Champion</p>
                        <p class="has-text-left record">{{ tholder.wins }}-{{ tholder.losses }}-{{ tholder.draws }}</p>
                    </div>
                    <div class="card-image">
                        <figure class="image fighter_img" v-if="tholder.left_full_body_image">
                            <img :src="tholder.left_full_body_image" alt="Placeholder image">
                        </figure>
                        <figure class="image fighter_img" v-else>
                            <img src="../assets/shadow_fighter_full.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                    </div>
                </div>
            </div>
            <h3 class="header_th">Women's UFC Title Holders</h3>
            <div class="th-container">
                <div class="card hvr-underline-from-center" v-for="(tholder,i) in getWomensTH" :key="'tholder' + i">
                    <div class="card-content">
                        <p class="has-text-left weight_class">{{ tholder.weight_class | upperCase }}</p>
                        <p class="title is-5 has-text-left tholder_name" v-if="tholder.id !== null">
                            <router-link :to="'/fighters/' + tholder.id">{{ tholder.first_name | upperCase }} {{ tholder.last_name | upperCase }}</router-link>
                        </p>
                        <p class="title is-5 has-text-left tbd" v-else>
                            {{ tholder.first_name | upperCase }} {{ tholder.last_name | upperCase }}
                        </p>
                        <p class="has-text-left champion">Champion</p>
                        <p class="has-text-left record">{{ tholder.wins }}-{{ tholder.losses }}-{{ tholder.draws }}</p>
                    </div>
                    <div class="card-image">
                        <figure class="image fighter_img" v-if="tholder.left_full_body_image">
                            <img :src="tholder.left_full_body_image" alt="Placeholder image">
                        </figure>
                        <figure class="image fighter_img" v-else>
                            <img src="../assets/shadow_fighter_full.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
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
        name: 'TitleHolders',
        created() {
            this.setTitleHolders()
        },
        watch: {
            '$route': 'setTitleHolders'
        },
        filters: {
            upperCase(value) {
                if (!value) return "";
                return _.upperCase(value);
            }
        },
        computed: {
            ...mapGetters([
                'getMensTH',
                'getWomensTH',
                'loading'
            ])
        }, 
        methods: {
            ...mapActions([
                'setTitleHolders'
            ])
        },
        components: {
            Loading
        }
    }
</script>

<style>
    .th-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
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
</style>