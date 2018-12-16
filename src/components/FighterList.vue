<template>
    <div class="columns is-multiline is-mobile" v-if="loading">
        <div class="column is-12">
            <Loading></Loading>
        </div>
    </div>
    <div class="columns is-multiline is-mobile" v-else-if="getFighters.length">
        <div class="column is-one-quarter-fullhd is-one-third-desktop is-one-third-tablet is-full-mobile is-flex" v-for="(fighter, i) in getFighters" :key="'fighter' + i">
            <Fighters :fighter="fighter"></Fighters>
        </div>
    </div>
    <div class="columns is-multiline is-mobile" v-else-if="noResults">
        <div class="column is-12">
            <h3>No Fighter Found. Please search again</h3>
        </div>
    </div>
    <div class="columns is-multiline is-mobile" v-else-if="error">
        <div class="column is-12">
            <h3>Error Connecting to API. Please try again!</h3>
        </div>
    </div>
    <div class="columns is-multiline is-mobile" v-else>
        <div class="column is-12">
            <h3>Search for a fighter!</h3>
        </div>
    </div>
</template>

<script>
    import Fighters from './Fighters';
    import Loading from './Loading';
    import { mapGetters } from 'vuex';

    export default {
        name: 'FighterList',
        computed: {
            ...mapGetters([
                'loading',
                'getFighters',
                'noResults',
                'error'
            ])
        },
        components: {
            Fighters,
            Loading
        }
    }
</script>

<style>
    h3 {
        font-size: 20px;
    }
</style>