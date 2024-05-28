<template>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                TODO: playerpage, matchpage, statistics dashboard, automatic scoring, standing pagination
            </div>
            <div class="col-12 col-md-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Top 10</h2>
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="txt-orange" scope="col">#</th>
                                <th class="txt-orange" scope="col">Deelnemer</th>
                                <th class="txt-orange" scope="col">Punten</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(player, idx) in standing_top_10">
                                <th v-if="idx > 0" scope="row">{{ player.score === standing_top_10[idx - 1].score ? '-' : idx + 1 }}</th>
                                <th v-else scope="row">{{ idx + 1 }}</th>
                                <td>{{ player.name }}</td>
                                <td>{{ player.score }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <router-link :to="{name: 'ranglijst'}" tag="button" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3">Naar ranglijst<i class="bi bi-chevron-right ms-2"></i></router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Aankomende wedstrijden</h2>
                        <div class="matches-wrapper">
                            <match-day-component v-for="(match_day, idx) in upcoming_matches" :match_day="match_day"/>
                            <router-link :to="{name: 'programma'}" tag="button" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3">Naar volledig programma<i class="bi bi-chevron-right ms-2"></i></router-link>
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
const {standing_top_10, upcoming_matches} = storeToRefs(tournament)
</script>

<style scoped lang="sass">

</style>
