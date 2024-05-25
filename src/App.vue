<template>
    <div>
        <navigation-bar></navigation-bar>
        <router-view></router-view>
    </div>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {useTournament} from "@/stores/content";
const tournament = useTournament();
tournament.fetchData()
</script>

<style scoped lang="sass"></style>
