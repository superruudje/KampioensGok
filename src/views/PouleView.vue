<template>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm mb-3 mb-md-5" v-for="poule in poules">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Groep {{ poule.name }}</h2>
                        <div class="w-100 overflow-hidden overflow-x-auto mb-2">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="txt-orange" scope="col"></th>
                                    <th class="txt-orange" scope="col">G</th>
                                    <th class="txt-orange" scope="col">W</th>
                                    <th class="txt-orange" scope="col">GL</th>
                                    <th class="txt-orange" scope="col">V</th>
                                    <th class="txt-orange" scope="col">+</th>
                                    <th class="txt-orange" scope="col">-</th>
                                    <th class="txt-orange" scope="col">+-</th>
                                    <th class="txt-orange" scope="col">P</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(team, idx) in getPouleStandings(poule.teams)">
                                    <th class="text-nowrap">{{ idx + 1 }} {{ team.name }}</th>
                                    <th>{{ team.score.games.length}}</th>
                                    <th>{{ team.score.games.filter(g => g === "W").length}}</th>
                                    <th>{{ team.score.games.filter(g => g === "D").length}}</th>
                                    <th>{{ team.score.games.filter(g => g === "L").length}}</th>
                                    <th>{{ team.score.for}}</th>
                                    <th>{{ team.score.against}}</th>
                                    <th>{{ team.score.for - team.score.against}}</th>
                                    <th>{{ team.score.points}}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button @click="openPouleDetails(poule.name)" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3">Groep details<i class="bi ms-2" :class="openPoule === poule.name ? 'bi-chevron-up' : 'bi-chevron-down'"></i></button>
                        <div class="mt-5" v-if="openPoule === poule.name">
                            <match-day-component v-for="match_day in tournament.matches_by_poule(poule.name)" :match_day="match_day"></match-day-component>
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
import {ref} from "vue";
const tournament = useTournament();
const {poules} = storeToRefs(tournament)
const openPoule = ref(null)

function openPouleDetails(poule) {
    openPoule.value = openPoule.value === poule ? null : poule
}

function getPouleStandings(teams) {
    return teams.sort((a, b) => {
        if (b.score.points === a.score.points ) {
            const diffA = a.score.for - a.score.against
            const diffB = b.score.for - b.score.against
            return diffB - diffA
        } else
           return b.score.points - a.score.points
    })
}

</script>

<style scoped lang="sass">

</style>
