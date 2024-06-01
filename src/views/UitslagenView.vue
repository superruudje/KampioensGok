<template>
    <header class="bg-blue py-3 py-md-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="fs-2 text-white fw-bolder">EK 2024</h1>
                    <h2 class="fs-6 mb-0 txt-orange fw-bolder">De uitslagen</h2>
                </div>
            </div>
        </div>
    </header>
    <main class="container-md py-3 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <div class="matches-wrapper">
                            <span v-if="!matches_played.length">Geen uitslagen bekend. Bekijk <router-link :to="{name: 'programma'}">hier</router-link> het programma.</span>
                            <match-day-component v-for="(match_day, idx) in matches_played" :match_day="match_day"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
const tournament = useTournament();
const {matches_played} = storeToRefs(tournament)
</script>

<style scoped lang="sass">

</style>
