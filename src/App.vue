<template>
    <div id="app">
        <Header></Header>
        <section class="section">
            <div class="container">
                <Search v-show="!$route.path.includes('events')"></Search>
                <SearchEvents v-show="$route.path.includes('events')"></SearchEvents>
            </div>
        </section>
        <section class="section main-content">
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
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
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
        Footer
    }
}
</script>

<style>
#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
.main-content {
    flex: 1;
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
    color: #4a4a4a;
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
