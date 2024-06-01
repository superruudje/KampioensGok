<template>
    <main class="container-md py-3 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Uitslagen</h2>
                        <span class="text-danger fw-bold">TODO: timeline in/uitklap.</span>
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
