<template>
    <div class="columns is-multiline is-mobile">
        <div class="column is-12-desktop">
            <h3>Fighter Info Coming Soon</h3>
            <iframe :src="`https://ufc-data-api.ufc.com/api/v1/us/fighters/${id}`"></iframe>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Loading from './Loading.vue';

    export default {
        name: 'Fighter',
        created() {
            this.getFighterStats(this.id)
        },
        watch: {
            '$route': 'getFighterStats'
        },
        props: ['id'],
        computed: {
            ...mapGetters([
                'fighterStats',
            ])
        },
        methods: {
            ...mapActions([
                'getFighterStats'
            ])
        },
        components: {
            Loading
        }
    }
</script>

<style>

</style>