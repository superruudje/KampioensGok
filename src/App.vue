<template>
    <div class="d-flex flex-column h-100">
        <navigation-bar></navigation-bar>
        <main class="flex-grow-1" style="padding-top: 56px">
            <router-view v-slot="{ Component }">
                <transition name="slide-fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <back-to-top/>
        <footer-component/>
    </div>
    <mobile-navigation-bar/>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {useTournament} from "@/stores/content";
import {Tooltip} from "bootstrap";
import {onMounted} from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import MobileNavigationBar from "@/components/MobileNavigationBar.vue";
const tournament = useTournament();
tournament.fetchData()

onMounted(() => {
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
    })
})
</script>

<style scoped lang="sass">
.slide-fade-enter-active
    transition: opacity .5s ease
.slide-fade-enter-from
    opacity: 0
</style>
