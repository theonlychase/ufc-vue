<template>
        <div class="card hvr-underline-from-center">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="fighter.profile_image" alt="Placeholder image">
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
    [class^="hvr-"] {
        margin: .4em;
        padding: 1em;
        cursor: pointer;
        background: #e1e1e1;
        text-decoration: none;
        color: #666;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .hvr-underline-from-center {
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        position: relative;
        overflow: hidden;
    }
    .hvr-underline-from-center:hover:before, .hvr-underline-from-center:focus:before, .hvr-underline-from-center:active:before {
        left: 0;
        right: 0;
    }
    .hvr-underline-from-center:before {
        content: "";
        position: absolute;
        z-index: -1;
        left: 51%;
        right: 51%;
        bottom: 0;
        background: #d20a0a;
        height: 4px;
        -webkit-transition-property: left, right;
        transition-property: left, right;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }
</style>