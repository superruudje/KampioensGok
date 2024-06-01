<template>
    <header class="bg-blue py-3 py-md-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-white fw-bolder">{{ participant.name }}</h2>
                    <span class="txt-orange fw-bolder">{{ participant.team_name }}</span>
                </div>
            </div>
        </div>
    </header>
    <main class="container-md py-2 py-md-5">
        <div class="row g-3 mb-3">
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm h-100">
                    <div
                        class="card-body  position-relative d-flex flex-column align-items-center justify-content-center p-2 p-md-4">
                        <span class="txt-orange fw-bold" style="font-size: 5rem">
                            <number-counter :number="tournament.getParticipantTotalScore(participant.name)"></number-counter>
                        </span>
                        <span class="txt-blue fw-bold">Punten</span>
                        <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2" data-bs-title="Totaal behaalde punten"
                           data-bs-toggle="tooltip"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row g-3">
                    <div class="col-12">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div class="card-body position-relative d-flex flex-column align-items-center p-2 p-md-4">
                        <span class="txt-orange fw-bold" style="font-size: 5rem">
                            <number-counter :number="tournament.getParticipantScoreMatches(participant.name)"></number-counter>
                        </span>
                                <span class="txt-blue fw-bold">Punten uit wedstrijden</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Totaal aantal punten verkregen uit wedstrijden" data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div class="card-body position-relative d-flex flex-column align-items-center p-2 p-md-4">
                        <span class="txt-orange fw-bold" style="font-size: 5rem">
                            <number-counter :number="tournament.getParticipantScoreKnockOut(participant.name)"></number-counter>
                        </span>
                                <span class="txt-blue fw-bold">Knock-out teams</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Aantal teams goed voorspeld in knock-out fases" data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div class="card-body position-relative d-flex flex-column align-items-center p-2 p-md-4">
                        <span class="txt-orange fw-bold" style="font-size: 5rem">
                            <number-counter :number="tournament.getParticipantScoreBonus(participant.name)"></number-counter>
                        </span>
                                <span class="txt-blue fw-bold">Bonuspunten</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Punten verkregen vanuit bonusvragen" data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <!-- scoreverloop -->
                <div class="card border-0 rounded-0 shadow-sm mb-3">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="txt-blue fw-bolder">Scoreverloop</h2>
                        <div id="chart">
                            <apexchart :options="chartOptions" :series="series" type="line"/>
                        </div>
                    </div>
                </div>
                <!-- voorspelling -->
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body position-relative p-2 p-md-4">
                        <h2 class="txt-blue fw-bolder">Voorspellingen Poulefase</h2>
                        <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.</p>
                        <match-day-prediction v-for="match_day in matches_played_poule" :match_day="match_day" :name="participant.name"
                                              :played="true" class="mb-4"></match-day-prediction>
                        <match-day-prediction v-for="match_day in matches_to_play_poule" :match_day="match_day"
                                              :name="participant.name" class="mb-4"></match-day-prediction>
                    </div>
                </div>
            </div>
            <!-- bonus vragen -->
            <div class="col-md-6">
                <div class="card border-0 rounded-0 shadow-sm mb-3">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="txt-blue fw-bolder">Bonusvragen</h2>
                        <div class="d-flex flex-column mb-3" v-for="(q, idx) in questions">
                            <span class="txt-orange fs-5 fst-italic">{{ q }}</span>
                            <span class="txt-blue"><b>{{ getTeamName(participant.bonus[idx]) || '-' }}</b>
                                <span v-if="idx === 0" class="small fst-italic"> ({{getPercentage(prediction_tournament_champion.find(i => i.id === participant.bonus[idx]).count)}}% denkt dit ook)</span>
                                <span v-if="idx === 1" class="small fst-italic"> (nu {{totalGoals}})</span>
                                <span v-if="idx === 2" class="small fst-italic"> (nu {{totalCards}})</span>
                                <span v-if="idx === 3" class="small fst-italic"> ({{getPercentage(prediction_most_against.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{getTeamName(groupedGoalsAgainst[0].id)}})</span>
                                <span v-if="idx === 4" class="small fst-italic"> ({{getPercentage(prediction_most_cards.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{getTeamName(groupedTeamCards[0].id)}})</span>
                                <span v-if="idx === 5" class="small fst-italic"> ({{getPercentage(prediction_top_scorer.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{groupedTopScorer[0]?.player || '?'}})</span>
                                <span v-if="idx === 6" class="small fst-italic"> ({{getPercentage(prediction_top_assist.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{'?'}})</span>
                                <span v-if="idx === 7" class="small fst-italic"> ({{getPercentage(prediction_first_goal_nl.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{bonus[7]}})</span>
                                <span v-if="idx === 8" class="small fst-italic"> ({{getPercentage(prediction_first_card_nl.find(i => i.id === participant.bonus[idx]).count)}}% denk dit ook, nu {{bonus[8]}})</span>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- voorspelling -->
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body position-relative p-2 p-md-4">
                        <h2 class="txt-blue fw-bolder">Voorspellingen Knock-Out</h2>
                        <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.</p>
                        <match-day-prediction v-for="match_day in matches_played_knock_out" :match_day="match_day" :name="participant.name"
                                              :played="true" :knockout="true" class="mb-4"></match-day-prediction>
                        <match-day-prediction v-for="match_day in matches_to_play_knock_out" :match_day="match_day"
                                              :name="participant.name" :knockout="true" class="mb-4"></match-day-prediction>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import {useTournament} from "@/stores/content.js";
import NumberCounter from "@/components/NumberCounter.vue";
import MatchDayPrediction from "@/components/MatchDayPrediction.vue";
import {storeToRefs} from "pinia";

const route = useRoute();

const tournament = useTournament();
const {
    players,
    matches_played,
    matches_played_poule,
    matches_to_play_poule,
    matches_played_knock_out,
    matches_to_play_knock_out,
    totalGoals,
    totalCards,
    groupedGoalsAgainst,
    groupedTeamCards,
    groupedTopScorer,
    prediction_tournament_champion,
    prediction_top_scorer,
    prediction_most_cards,
    prediction_most_against,
    prediction_first_goal_nl,
    prediction_first_card_nl,
    prediction_top_assist,
    teams, bonus} = storeToRefs(tournament)

const participant = ref(null);

const questions = ref([
    "Welk land wordt Europees kampioen?",
    "Hoeveel goals worden er totaal gescoord?",
    "Hoeveel kaarten worden er in het toernooi gegeven?",
    "Welk land krijgt de meeste tegengoals?",
    "Welk land krijgt de meeste kaarten?",
    "Wie wordt er topscorer?",
    "Wie wordt de koning van de assist?",
    "Welke Nederlander scoort het eerste doelpunt?",
    "Welke Nederlander krijgt de eerste kaart?"
])

/**
 * Return team name
 * @param id
 * @returns {*}
 */
function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

/**
 * Return percentage of occurrence
 * @param count
 * @returns {number}
 */
function getPercentage(count) {
    return (Math.round((count / players.value.length * 100) * 100) / 100)
}

onBeforeMount(() => {
    participant.value = tournament.getParticipant(route.params.id)
})

onBeforeRouteUpdate((to, from) => {
    participant.value = tournament.getParticipant(to.params.id)
})

/**
 * Chart data
 * @type {ComputedRef<*[]>}
 */
const series = computed(() => {
    let data = [{x: "start", y: 0}]
    matches_played.value.forEach((s, idx) => {
        const score = tournament.getParticipantTotalScore(participant.value.name, idx + 1)
        data.push({x: s.date, y: score})
    })
    return [{
        name: participant.value.name,
        data: data
    }]
})

/**
 * Chart options
 * @type {{plotOptions: {line: {isSlopeChart: boolean}}, dataLabels: {enabled: boolean}, xaxis: {title: {text: string}}, markers: {size: number}, chart: {animations: {enabled: boolean}, zoom: {enabled: boolean}, type: string}, yaxis: {title: {text: string}}}}
 */
const chartOptions = {
    chart: {
        animations: {enabled: false},
        zoom: {enabled: false},
        type: 'line',
    },
    dataLabels: {enabled: false},
    markers: {size: 1},
    xaxis: {title: {text: 'Speeldag'}},
    yaxis: {title: {text: 'Score'}},
    plotOptions: {
        line: {
            isSlopeChart: true,
        },
    }
}

</script>

<style lang="sass" scoped>
.team-wrapper
    flex: 1

</style>
