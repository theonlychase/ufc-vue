<template>
   <div class="box">
       <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" placeholder="Find a fighter" @keyup.enter="searchFighter(fighter)" v-model="fighter" :class="{ 'input-error': $v.fighter.$error }">
                <p class="error-text" v-if="!$v.fighter.valAlphaSpace">Only Accepts Alphabet Characters</p>
                <p class="error-text" v-if="submitStatus === 'ERROR'">This Field Is Required</p>
            </div>
            <div class="control">
                <a class="button is-info" @click="searchFighter(fighter)">Search</a>
            </div>
        </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { required, alpha } from 'vuelidate/lib/validators';
    const valAlphaSpace = value => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^[A-Za-z\s]+$/.test(value);
    };

    export default {
        name: 'Search',
        data() {
            return {
                fighter: '',
                error: false, 
                submitStatus: null,
                notAlpha: null
            }
        },
        validations: {
            fighter: {
                required,
                valAlphaSpace
            }
        },
        methods: {
            searchFighter(fighter) {
                this.$v.$touch()
                if (this.$v.fighter.required === false) {
                    this.submitStatus = 'ERROR'
                } else if (this.$v.fighter.valAlphaSpace === false) {
                   this.notAlpha = 'ERROR'
                } else {
                    this.submitStatus = null
                    this.fighter = "";
                    this.$v.$reset();
                    this.$router.push({ path: '/fighters'});
                    this.$store.dispatch("searchFighter", fighter);
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
    .input-error {
        border: 1px solid #bf0909;
    }
    .error-text {
        font-size: .7rem;
        color: #bf0909;
    }
</style>