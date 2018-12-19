<template>
    <div>
        <div v-if="loadMedia">
            <Loading></Loading>
        </div>
        <div class="grid-container" v-else-if="fighterMedia.length">
            <!-- <div class="" v-for="(media,i) in fighterMedia" :key="'media' + i"> -->
            <div class="grid-item" v-for="(media,i) in fighterMedia" :key="'media' + i">
                <img :src="media.thumbnail" alt="">
            </div>
        </div>
        <div class="grid-container" v-else>
            <h3>Please Search Again</h3>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Loading from './Loading.vue';

    export default {
        name: 'Fighter',
        created() {
            this.getFighterMedia(this.id)
        },
        watch: {
            '$route': 'getFighterMedia'
        },
        props: ['id'],
        computed: {
            ...mapGetters([
                'fighterMedia',
                'loadMedia'
            ])
            // getFighter() {
            //     return this.$store.getters.getFighter(Number(this.id));
            // }
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
</style>