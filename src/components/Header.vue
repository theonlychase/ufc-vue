<template>
   <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="../assets/ufc-logo.png" width="112" height="28">
                </router-link>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" @click.native="closeMenu" class="navbar-item">Home</router-link>
                    <router-link to="/fighters" @click.native="closeMenu" class="navbar-item">Fighters</router-link>
                    <router-link to="/events" @click.native="closeMenu" class="navbar-item">Events</router-link>
                    <!-- <a class="navbar-item">Documentation</a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">More</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">About</a>
                            <a class="navbar-item">Jobs</a>
                            <a class="navbar-item">Contact</a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">Report an issue</a>
                        </div>
                    </div> -->
                </div>

                <div class="navbar-end">
                    <!-- <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary"><strong>Sign up</strong></a>
                            <a class="button is-light">Log in</a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
    name: 'Header',
    methods: {
        toggleMenu() {
                // Get all "navbar-burger" elements
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach( el => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            }
        },
        closeMenu() {
            document.querySelector('.navbar-burger').classList.remove('is-active');
            document.querySelector('.navbar-menu').classList.remove('is-active');
        }
    }
}
</script>

<style>
    a.navbar-burger, a.navbar-burger:hover {
        color: #fff !important;
    }
</style>