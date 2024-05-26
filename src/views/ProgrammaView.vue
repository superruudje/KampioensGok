<template>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Programma</h2>
                        <div class="matches-wrapper">
                            <match-day-component v-for="(match_day, idx) in matches_to_play" :match_day="match_day"/>
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
const {matches_to_play} = storeToRefs(tournament)
</script>

<style scoped lang="sass">

</style>
