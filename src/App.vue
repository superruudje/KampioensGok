<template>
    <div class="d-flex flex-column h-100">
        <navigation-bar></navigation-bar>
        <main class="flex-grow-1" style="padding-top: 56px">
            <router-view></router-view>
        </main>
        <back-to-top/>
        <footer-component/>
    </div>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {useTournament} from "@/stores/content";
import {Tooltip} from "bootstrap";
import {onMounted} from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
const tournament = useTournament();
tournament.fetchData()

onMounted(() => {
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
    })
})
</script>

<style scoped lang="sass"></style>
