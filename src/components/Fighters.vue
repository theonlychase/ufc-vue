<template>
        <div class="card hvr-underline-from-center">
            <div class="card-image">
                <figure class="image is-4by3" v-if="fighter.profile_image">
                    <img :src="fighter.profile_image" alt="Placeholder image">
                </figure>
                <figure class="image is-4by3" v-else>
                    <img src="../assets/fighter_placeholder.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <p class="subtitle is-6 has-text-weight-bold" v-if="fighter.nickname">"{{ fighter.nickname | capitalize }}"</p>
                <p class="title is-4 m-b-10"><router-link :to="'/fighters/' + fighter.id">{{ fighter.first_name | capitalize }} {{ fighter.last_name | capitalize }}</router-link></p>
                <p class="weight_class">{{ fighter.weight_class | capitalize }}</p>
                <p class="record">{{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }} {W-L-D}</p>
            </div>
        </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'Fighters',
        props: ['fighter'],
        filters: {
            capitalize(value) {
                if (!value) return "";
                return _.startCase(value);
            }
        }
    }
</script>

<style>
    .card {
        width: 100%;
    }
    .m-b-10 {
        margin-bottom: 10px !important;
    }
    .record, .weight_class {
        font-weight: 300;
        font-size: 13px;
    }
</style>