<template>
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="fighter.profile_image" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">

                <p class="title is-4"><router-link :to="'/fighters/' + fighter.id">{{ fighter.first_name | capitalize }} {{ fighter.last_name | capitalize }}</router-link></p>
                <p class="subtitle is-6 is-italic">"{{ fighter.nickname | capitalize }}"</p>


                <div class="content">
                    <p>{{ fighter.wins }} - {{ fighter.losses }} - {{ fighter.draws }}</p>.
                    <p>Rank - {{ fighter.rank }}</p>
                </div>
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
    .is-italic {
        font-style: italic;
    }
    /* .card {
        height: 100%;
    } */
</style>