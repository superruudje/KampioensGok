<template>
    <div id="deelnemers-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">{{ participant.team_name }}</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">{{ participant.name }}</h2>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <router-link :to="{name: 'ranglijst'}" tag="button" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 mb-3" type="button"><i class="bi bi-arrow-left me-2"></i>Naar de ranglijst</router-link>
            <div class="row g-3 mb-3">
                <div class="col-md-4">
                    <div class="card border-0 rounded-0 shadow-sm h-100">
                        <div
                            class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
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
                                <div class="card-body position-relative d-flex flex-column align-items-center p-4">
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
                                <div class="card-body position-relative d-flex flex-column align-items-center p-4">
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
                                <div class="card-body position-relative d-flex flex-column align-items-center p-4">
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
                        <div class="card-body p-4">
                            <h2 class="txt-blue fw-bolder">Scoreverloop</h2>
                            <div id="chart">
                                <apexchart :options="chartOptions" :series="series" type="line"/>
                            </div>
                        </div>
                    </div>
                    <!-- voorspelling -->
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body position-relative p-4">
                            <h2 class="txt-blue fw-bolder">Voorspellingen Poulefase</h2>
                            <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.</p>
                            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
                            </div>
                            <template v-else>
                                <match-day-prediction v-for="(matches, match_day) in matches_played_poule" :match_day="match_day" :matches="matches" :name="participant.name"
                                                      :played="true" class="mb-4"></match-day-prediction>
                                <match-day-prediction v-for="(matches, match_day) in matches_to_play_poule" :match_day="match_day" :matches="matches"
                                                      :name="participant.name" class="mb-4"></match-day-prediction>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <!-- bonus vragen -->
                    <div class="card border-0 rounded-0 shadow-sm mb-3">
                        <div class="card-body p-4">
                            <h2 class="txt-blue fw-bolder">Bonusvragen</h2>
                            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white mb-3">
                                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
                            </div>
                            <template v-else>
                                <div class="d-flex flex-column mb-3" v-for="(q, idx) in questions">
                                    <span class="txt-orange fs-5 fst-italic">{{ q.label }}</span>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <span class="txt-blue">
                                            <i v-if="participant.bonus[idx] === bonus[idx]" class="bi bi-check-circle-fill me-2 text-success"></i>
                                            <i v-if="bonus[idx] && participant.bonus[idx] !== bonus[idx]" class="bi bi-x-circle-fill me-2 text-danger"></i>
                                            <b>{{ getTeamName(participant.bonus[idx]) }}</b>
                                            <span v-if="q.type === 'exact'" class="small fst-italic"> ({{getPercentage(data[idx].find(i => i.id === participant.bonus[idx])?.count)}}% denkt dit ook{{ q.now ? `, nu ${q.now}` : "" }})</span>
                                            <span v-else class="small fst-italic"> (nu {{q.now}})</span>
                                        </span>
                                        <template v-if="bonus[idx]">
                                            <span v-if="q.type === 'exact'" class="badge bg-orange">+{{ participant.bonus[idx] === bonus[idx] ? q.p : 0}}</span>
                                            <span v-else class="badge bg-orange">+{{ getEstimateScore(participant.bonus[idx], bonus[idx]) }}</span>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <router-link :to="{name: 'statistieken'}"
                                         class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                         tag="button">Naar statistieken<i
                                class="bi bi-chevron-right ms-2"></i></router-link>
                        </div>
                    </div>
                    <!-- voorspelling -->
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body position-relative p-4">
                            <h2 class="txt-blue fw-bolder">Voorspellingen Knock-Out</h2>
                            <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.</p>
                            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
                            </div>
                            <template v-else>
                                <match-day-prediction v-for="(matches, match_day) in matches_played_knock_out" :match_day="match_day" :matches="matches" :name="participant.name"
                                                      :played="true" class="mb-4"></match-day-prediction>
                                <match-day-prediction v-for="(matches, match_day) in matches_to_play_knock_out" :match_day="match_day" :matches="matches"
                                                      :name="participant.name" class="mb-4"></match-day-prediction>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
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
    matches_played_by_day,
    matches_played_poule,
    matches_to_play_poule,
    matches_played_knock_out,
    matches_to_play_knock_out,
    totalGoals,
    totalCards,
    groupedGoalsAgainst,
    groupedTeamCards,
    groupedTopScorer,
    groupedAssist,
    prediction_tournament_champion,
    prediction_top_scorer,
    prediction_most_cards,
    prediction_most_against,
    prediction_first_goal_nl,
    prediction_first_card_nl,
    prediction_top_assist,
    teams, bonus} = storeToRefs(tournament)

const participant = ref(null);

const data = ref([
    prediction_tournament_champion.value,
    [],
    [],
    prediction_most_against.value,
    prediction_most_cards.value,
    prediction_top_scorer.value,
    prediction_top_assist.value,
    prediction_first_goal_nl.value,
    prediction_first_card_nl.value
])

const questions = ref([
    {label: "Welk land wordt Europees kampioen?", type: "exact", p: 75},
    {label: "Hoeveel goals worden er totaal gescoord?", type: "estimate", now: totalGoals.value},
    {label: "Hoeveel kaarten worden er in het toernooi gegeven?", type: "estimate", now: totalCards.value},
    {label: "Welk land krijgt de meeste tegengoals?", type: "exact", p: 10, now: getTeamName(groupedGoalsAgainst.value[0].id)},
    {label: "Welk land krijgt de meeste kaarten?", type: "exact", p: 10, now: getTeamName(groupedTeamCards.value[0].id)},
    {label: "Wie wordt er topscorer?", type: "exact", p: 10, now: groupedTopScorer.value[0]?.player || '-'},
    {label: "Wie wordt de koning van de assist?", type: "exact", p: 10, now: groupedAssist.value[0]?.player || '-'},
    {label: "Welke Nederlander scoort het eerste doelpunt?", type: "exact", p: 10},
    {label: "Welke Nederlander krijgt de eerste kaart?", type: "exact", p: 10},
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

function getEstimateScore(prediction, outcome) {
    if (prediction === outcome) return  40
    else if (prediction >= (outcome - 5) && prediction <= (outcome + 5)) return 25
    else if (prediction >= (outcome - 10) && prediction <= (outcome + 10)) return 15
    else return 0
}

onBeforeMount(() => {
    participant.value = tournament.getParticipant(route.params.id)
})

onBeforeRouteUpdate((to, from) => {
    participant.value = tournament.getParticipant(to.params.id)
})

const started =  computed(() => {
    return matches_played.value.length
})

/**
 * Chart data
 * @type {ComputedRef<*[]>}
 */
const series = computed(() => {
    let data = [{x: "start", y: 0}]
    Object.keys(matches_played_by_day.value).forEach((key, idx) => {
        const score = tournament.getParticipantTotalScore(participant.value.name, idx + 1)
        data.push({x: key, y: score})
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
