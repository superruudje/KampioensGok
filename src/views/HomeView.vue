<template>
    <div id="home-view" class="">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container">
                <div class="row gy-3 align-items-center">
                    <div class="col-md-4">
                        <h1 class="fs-2 text-white fw-bolder w26-condensed">WK 2026 POOL</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">Home</h2>
                    </div>
                    <div class="col-md-8">
                        <div class="card border-0 rounded-4 bg-26-ev2">
                            <div class="card-body">
                                <div v-if="!started" class="row g-3 g-md-4 justify-content-center fw-bold w26-condensed">
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
                            <img
                                alt="logo"
                                class="d-none d-md-block position-absolute start-0 top-50 translate-middle h-75"
                                src="@/assets/images/wc26.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="bg-26-ev3">
            <div class="container-md py-3 py-md-5">
                <div class="row g-4">
                    <div class="col-12 col-md-4 order-last order-md-first">
                        <div class="card rounded-4 mb-4 bg-26-ev2 text-light">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="mb-3 fw-bolder w26-condensed">Ranglijst</h3>
                                <div class="w-100 overflow-hidden overflow-x-auto mb-3">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th class="txt-orange" scope="col">#</th>
                                            <th class="txt-orange" scope="col">Teamnaam</th>
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
                                                <router-link
                                                    :to="{name: 'deelnemer', params: {id: player.team_name}}"
                                                    class="w26-condensed text-light text-decoration-none">{{
                                                        player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name
                                                    }}
                                                </router-link>
                                            </td>
                                            <td>{{ player.score }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <RouterLink :to="{name: 'ranglijst'}">
                                    <button class="btn-wc26 btn-wc26-orange w-fit">
                                        Volledige ranglijst
                                    </button>
                                </RouterLink>
                            </div>
                        </div>

                        <PredictionTable
                            :image="false"
                            :list="prediction_ned"
                            table_header="Score"
                            title="Hoe ver komt NL?"/>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="card rounded-4">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="mb-3 txt-blue fw-bolder w26-condensed">Aankomende wedstrijden</h3>
                                <div class="d-flex flex-column gap-3">
                                    <MatchDayComponent
                                        v-for="matchDay in first5UnplayedMatches"
                                        :match_day="matchDay"/>
                                    <RouterLink :to="{name: 'wedstrijden'}">
                                        <button class="btn-wc26 btn-wc26-orange-alt">
                                            Naar volledig programma<i class="bi bi-chevron-right ms-2"></i>
                                        </button>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <div class="bg-white">
            <div class="container py-3 py-md-5">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class="w26-condensed text-uppercase">Bekijk het wedstrijdschema</h1>
                        <p>Bekijk het volledige wedstrijdschema voor het WK 2026 in Canada, Mexico en de VS,
                            inclusief alle wedstrijden en uitslagen van de 104 duels in het toernooi met 48 teams.</p>
                        <div>
                            <div class="adaptive-width d-inline-block">
                                <RouterLink :to="{name: 'wedstrijden'}">
                                    <button class="btn-wc26 btn-wc26-lightblue">
                                        Naar het schema
                                    </button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 bg-cup rounded-4"></div>
                </div>
            </div>
        </div>

        <div class="bg-26-primary-light">
            <div class="container py-3 py-md-5"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.js";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {onBeforeMount, type Ref, ref} from "vue";
import PredictionTable from "@/components/PredictionTable.vue";
import type {Player} from "@/types/pool.ts";

const tournament = useTournament();
const {first5UnplayedMatches, prediction_ned} = storeToRefs(tournament)

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const started: Ref<boolean> = ref(true);
const standing_top_10: Ref<Player[]> = ref([]);
const countDownDate = new Date(2026, 5, 11, 21).getTime();

function startCountdown() {
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            started.value = true;
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
    checkCountdown();
    standing_top_10.value = tournament.getStanding(null).slice(0, 10);
})
</script>

<style lang="sass" scoped>
.bg-cup
    background-image: url("@/assets/images/graphic-cup.webp")
    background-position: center center
    background-repeat: no-repeat
    background-size: cover

.table
    --bs-table-bg: transparent
    --bs-table-color: #fff
</style>
