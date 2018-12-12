<template>
    <div id="app">
        <Header></Header>
        <section class="section">
            <div class="container">
                <Search v-show="!$route.path.includes('events')"></Search>
                <SearchEvents v-show="$route.path.includes('events')"></SearchEvents>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <!-- <div class="columns is-multiline is-mobile" v-if="isLoading">
                    <div class="column is-12">
                        <Loading></Loading>
                    </div>
                </div> -->
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import SearchEvents from './components/SearchEvents.vue';
import Loading from './components/Loading';
import { mapGetters } from 'vuex';

export default {
    name: 'app',
    computed: {
        ...mapGetters([
            'isLoading'
        ])
    },
    components: {
        Header,
        Search, 
        SearchEvents,
        Loading
    }
}
</script>

<style>
#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

a {
    color: #d20a0a;
}
a:hover {
    color: #8D8D8D;
}
</style>
