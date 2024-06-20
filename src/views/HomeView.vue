<template>
    <div id="home-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">EK 2024</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">Home</h2>
                    </div>
                </div>
                <div v-if="!started" class="row justify-content-center mb-3 fw-bold">
                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-center">
                            <span class="fs-1 mb-0 text-white">{{ days }}</span>
                            <span class="text-white">dagen</span>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-center">
                            <span class="fs-1 mb-0 text-white">{{ hours }}</span>
                            <span class="text-white">uur</span>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-center">
                            <span class="fs-1 mb-0 text-white">{{ minutes }}</span>
                            <span class="text-white">minuten</span>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-center">
                            <span class="fs-1 mb-0 text-white">{{ seconds }}</span>
                            <span class="text-white">seconden</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <div class="row gy-3">
                <div class="col-12 col-md-4 order-last order-md-first">
                    <div class="card border-0 rounded-0 shadow-sm mb-3">
                        <div class="card-body p-4">
                            <h2 class="mb-3 txt-blue fw-bolder">Top 10</h2>
                            <div class="w-100 overflow-hidden overflow-x-auto">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="txt-orange" scope="col">#</th>
                                        <th class="txt-orange" scope="col">Team</th>
                                        <th class="txt-orange" scope="col">Punten</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(player, idx) in standing_top_10">
                                        <th v-if="idx > 0" scope="row">
                                            {{ player.score === standing_top_10[idx - 1].score ? '-' : idx + 1 }}
                                        </th>
                                        <th v-else scope="row">{{ idx + 1 }}</th>
                                        <td>
                                            <router-link :to="{name: 'deelnemer', params: {id: player.team_name}}">{{
                                                    player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name
                                                }}
                                            </router-link>
                                        </td>
                                        <td>{{ player.score }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <router-link :to="{name: 'ranglijst'}"
                                         class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                         tag="button">Naar ranglijst<i
                                class="bi bi-chevron-right ms-2"></i></router-link>
                        </div>
                    </div>

                    <top-table :list="groupedTopScorer" :table_header="['Speler', 'Goals']" class="mb-3"
                               title="Top scorers"/>
                    <prediction-table :image="false" :list="prediction_ned" table_header="Score"
                                      title="Hoe ver komt NL?"/>
                </div>
                <div class="col-12 col-md-8">
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body p-4">
                            <h2 class="mb-3 txt-blue fw-bolder">Aankomende wedstrijden</h2>
                            <div class="matches-wrapper">
                                <match-day-component v-for="(matches, match_day, idx) in upcoming_matches"
                                                     :match_day="match_day" :matches="matches"/>
                                <router-link :to="{name: 'programma'}"
                                             class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                             tag="button">Naar volledig
                                    programma<i class="bi bi-chevron-right ms-2"></i></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {onBeforeMount, ref} from "vue";
import TopTable from "@/components/TopTable.vue";
import PredictionTable from "@/components/PredictionTable.vue";

const tournament = useTournament();
const {standing_top_10, upcoming_matches, groupedTopScorer, teamImages, prediction_ned} = storeToRefs(tournament)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const started = ref(true)
const countDownDate = new Date("Jun 14, 2024 21:00:00").getTime();

/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name) {
    return teamImages.value[name] || teamImages.value[`default`]
}

function startCountdown() {
    const x = setInterval(function () {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is finished, write some text
        if (distance < 0) {
            started.value = true
            clearInterval(x);
        }
    }, 1000);
}


function checkCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (distance > 0) {
        started.value = false
        startCountdown()
    }
}

onBeforeMount(() => {
    checkCountdown()
})
</script>

<style lang="sass" scoped>

</style>
