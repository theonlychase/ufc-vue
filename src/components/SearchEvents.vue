<template>
   <div class="box">
       <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" placeholder="Find an Event" @keyup.enter="searchEvents(event)" v-model="event" :class="{ 'input-error': $v.event.$error }">
                <p class="error-text" v-if="!$v.event.valAlphaSpace">Only Accepts Alphabet Characters and/or Numbers</p>
                <p class="error-text" v-if="submitStatus === 'ERROR'">This Field Is Required</p>
                 <p class="error-text" v-if="minLength === 'ERROR'">A minimum of three characters is required</p>
            </div>
            <div class="control">
                <a class="button is-info" @click="searchEvents(event)">Search</a>
            </div>
        </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators';
    const valAlphaSpace = value => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^(?:[A-Za-z0-9]+)(?:[A-Za-z0-9 _]*)$/.test(value);
    };

    export default {
        name: 'SearchEvents',
        data() {
            return {
                event: '',
                error: false,
                submitStatus: null,
                notAlpha: null,
                minLength: null
            }
        },
        validations: {
            event: {
                required,
                minLength: minLength(3),
                valAlphaSpace
            }
        },
        methods: {
            searchEvents(event) {
                this.$v.$touch();
                if (this.$v.event.required === false) {
                    this.submitStatus = 'ERROR'
                } else if (this.$v.event.minLength === false) {
                    this.minLength = 'ERROR'
                } else if (this.$v.event.valAlphaSpace === false) {
                   this.notAlpha = 'ERROR'
                } else {
                    this.submitStatus = null
                    this.event = '';
                    this.$v.$reset();
                    this.$store.dispatch("searchEvents", event).then(() => {
                        this.$router.push({ path: '/events'});
                    });
                    // this.$store.dispatch("searchEvents", event).then(() => {
                    //     if (this.$store.state.events.events.length > 1) {
                    //         this.$router.push({ path: `/events` });
                    //     } 
                    //     else if (this.$store.state.events.events.length === 1) {
                    //         const id = this.$store.state.events.events[0].id;
                    //         console.log("id",id);
                    //         this.$router.push({ path: `/events/${id}` });
                    //     } 
                    //     else {
                    //         console.log("No Event Found");
                    //     }
                    // });
                }
            }
        }
    }
</script>

<style>
    .box {
        max-width: 650px;
        margin: 0 auto;
        justify-content: center;
        display: flex;
    }
    a.button.is-info {
        background: #d20a0a;
    }
    a.button.is-info:hover {
        background: #bf0909;
    }
</style>