<template>
    <div id="player-page">
        <div class="row g-3 mb-3">
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm h-100">
                    <div
                        class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
                            <span class="txt-orange fw-bold lh-1" style="font-size: 4rem">
                                <number-counter
                                    :number="tournament.getParticipantTotalScore(participant.team_name, null)"></number-counter>
                            </span>
                        <span class="txt-blue fw-bold text-center">Totale punten</span>
                        <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                           data-bs-title="Totaal behaalde punten"
                           data-bs-toggle="tooltip"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row g-3">
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div
                                class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
                                <floating-stars v-if="playerPos < 4"
                                                :color="playerPos === 1 ? 'txt-gold' : playerPos === 2 ? 'txt-silver' : 'txt-bronze'"
                                                class="w-100"/>
                                <span
                                    :class="{ 'txt-gold' : playerPos === 1, 'txt-silver' : playerPos === 2, 'txt-bronze' : playerPos === 3}"
                                    class="txt-orange fw-bold lh-1"
                                    style="font-size: 4rem">
                                    <number-counter
                                        :number="playerPos"></number-counter>
                            </span>
                                <span class="txt-blue fw-bold text-center">Positie</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Huidige positie in de ranglijst"
                                   data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div
                                class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
                            <span class="txt-orange fw-bold lh-1" style="font-size: 4rem">
                                <number-counter
                                    :number="tournament.getParticipantScoreMatches(participant.team_name)"></number-counter>
                            </span>
                                <span class="txt-blue fw-bold text-center">Punten uit wedstrijden</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Totaal aantal punten verkregen uit wedstrijden"
                                   data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div
                                class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
                            <span class="txt-orange fw-bold lh-1" style="font-size: 4rem">
                                <number-counter
                                    :number="tournament.getParticipantScoreKnockOut(participant.team_name)"></number-counter>
                            </span>
                                <span class="txt-blue fw-bold text-center">Knock-out teams</span>
                                <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
                                   data-bs-title="Punten verkregen vanuit teams in knock-out"
                                   data-bs-toggle="tooltip"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card border-0 rounded-0 shadow-sm h-100">
                            <div
                                class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-4">
                            <span class="txt-orange fw-bold lh-1" style="font-size: 4rem">
                                <number-counter
                                    :number="tournament.getParticipantScoreBonus(participant.team_name)"></number-counter>
                            </span>
                                <span class="txt-blue fw-bold text-center">Bonuspunten</span>
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
                <!-- voorspelling -->
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body position-relative p-4">
                        <h2 class="txt-blue fw-bolder">Voorspellingen Poulefase</h2>
                        <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde
                            wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.
                        </p>
                        <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <match-day-prediction v-for="(matches, match_day) in matches_to_play_poule"
                                                  :match_day="match_day" :matches="matches"
                                                  :name="participant.team_name" class="mb-4"></match-day-prediction>
                            <match-day-prediction v-for="(matches, match_day) in matches_played_poule"
                                                  :match_day="match_day" :matches="matches"
                                                  :name="participant.team_name"
                                                  :played="true" class="mb-4"></match-day-prediction>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <!-- bonus vragen -->
                <div class="card border-0 rounded-0 shadow-sm mb-3">
                    <div class="card-body p-4">
                        <h2 class="txt-blue fw-bolder">Bonusvragen</h2>
                        <p>Punten voor de bonusvragen worden pas <u>na</u> de poulefase toegekend.</p>
                        <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white mb-3">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <div v-for="(q, idx) in bonus_vragen" class="d-flex flex-column mb-3">
                                <span class="txt-orange fs-5 fst-italic">{{ q.q }}</span>
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="txt-blue">
                                        <template v-if="getQuestionPoints(q, idx) > -1">
                                            <i v-if="getQuestionPoints(q, idx) > 0"
                                               class="bi bi-check-circle-fill me-2 text-success"></i>
                                            <i v-else-if="q.a" class="bi bi-x-circle-fill me-2 text-danger"></i>
                                        </template>
                                        <b>{{ getTeamName(participant.bonus[idx]) }}</b>
                                        <span v-if="q.t === 'exact'" class="small fst-italic"> ({{
                                                getPercentage(data[idx].find(i => i.id === participant.bonus[idx])?.count)
                                            }}% denkt dit ook{{
                                                q.n ? `, nu ${q.n}` : ""
                                            }})</span>
                                        <span v-if="q.t === 'est'" class="small fst-italic"> ({{
                                                q.n ? `nu ${q.n}` : ""
                                            }})</span>
                                    </span>
                                    <span v-if="getQuestionPoints(q, idx) > -1" class="badge bg-orange">+{{
                                            getQuestionPoints(q, idx)
                                        }}</span>
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
                <div class="card border-0 rounded-0 shadow-sm mb-3">
                    <div class="card-body position-relative p-4">
                        <h2 class="txt-blue fw-bolder">Voorspellingen Knock-Out</h2>
                        <p>Bekijk de voorspellingen van <b>{{ participant.name }}</b> Bij reeds gespeelde
                            wedstrijden wordt de stand na 90 minuten speeltijd getoond <u>onder</u> de voorspelling.
                            Punten voor de knock-out fase worden pas <u>na</u> de poulefase toegekend.
                        </p>
                        <span class="d-block"><i class="bi bi-check-circle-fill text-success me-2"></i>Team correct voorspeld.</span>
                        <span class="d-block"><i class="bi bi-exclamation-circle-fill text-warning me-2"></i>Team incorrect voorspeld, maar wel in knockout.</span>
                        <span class="d-block mb-3"><i class="bi bi-exclamation-circle-fill text-danger me-2"></i>Team incorrect voorspeld (geen punten).</span>
                        <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <match-day-prediction v-for="(matches, match_day) in matches_played_knock_out"
                                                  :match_day="match_day" :matches="matches"
                                                  :name="participant.team_name"
                                                  :played="true" class="mb-4"></match-day-prediction>
                            <match-day-prediction v-for="(matches, match_day) in matches_to_play_knock_out"
                                                  :match_day="match_day" :matches="matches"
                                                  :name="participant.team_name" class="mb-4"></match-day-prediction>
                        </template>
                    </div>
                </div>
                <!-- scoreverloop -->
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-4">
                        <h2 class="txt-blue fw-bolder">Scoreverloop</h2>
                        <div id="chart">
                            <apexchart :options="chartOptions" :series="series" type="line"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useTournament} from "@/stores/content.js";
import NumberCounter from "@/components/NumberCounter.vue";
import MatchDayPrediction from "@/components/MatchDayPrediction.vue";
import {storeToRefs} from "pinia";
import FloatingStars from "@/components/floatingStars.vue";

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
    estTotalGoals,
    estTotalCards,
    prediction_tournament_champion,
    prediction_top_scorer,
    prediction_most_cards,
    prediction_most_against,
    prediction_first_goal_nl,
    prediction_first_card_nl,
    prediction_top_assist,
    teams,
    bonus_vragen
} = storeToRefs(tournament)

const props = defineProps({
    participant: Object
})

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

function getQuestionPoints(q, idx) {
    return tournament.getBonusScore(q, props.participant.bonus[idx],
        Object.keys(matches_played_by_day.value).length)
}

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

/**
 * Calculate score for estimate questions
 * @param prediction
 * @param outcome
 * @returns {number}
 */
function getEstimateScore(prediction, outcome) {
    if (prediction === outcome) return 40
    else if (prediction >= (outcome - 5) && prediction <= (outcome + 5)) return 25
    else if (prediction >= (outcome - 10) && prediction <= (outcome + 10)) return 15
    else return 0
}

const playerPos = computed(() => {
    return tournament.getPlayerStanding(props.participant.team_name)
})

const started = computed(() => {
    return matches_played.value.length
})

/**
 * Chart data
 * @type {ComputedRef<*[]>}
 */
const series = computed(() => {
    let data = [{x: "start", y: 0}]
    Object.keys(matches_played_by_day.value).forEach((key, idx) => {
        const score = tournament.getParticipantTotalScore(props.participant.team_name, idx + 1)
        data.push({x: key, y: score})
    })
    return [{
        name: props.participant.team_name,
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
    colors: ['#f36c21'],
    dataLabels: {enabled: false},
    markers: {size: 5},
    xaxis: {title: {text: 'Speeldag'}},
    yaxis: {title: {text: 'Score'}},
    plotOptions: {
        line: {
            isSlopeChart: true,
        },
    },
    tooltip: {
        fixed: {
            enabled: true,
            position: "topLeft",
        },
        custom: function ({series, seriesIndex, dataPointIndex, w}) {
            const score = series[seriesIndex][dataPointIndex]
            const name = w.globals.seriesNames[seriesIndex]
            const color = w.globals.colors[seriesIndex]

            let html = ''
            html += `<div class="d-flex align-items-center">`
            html += `<i class="bi bi-circle-fill me-2" style="color:` + color + `"></i>`
            html += `<div class="player">` + name + `: <b>` + score + `</b>` + `</div>`
            html += `</div>`


            return '<div class="card border-0 rounded-0 shadow-sm">' +
                '<div class="card-body">' +
                '<div class="txt-blue fw-bolder">' + w.globals.categoryLabels[dataPointIndex] + '</div>' +
                '<div>' +
                html +
                '</div>' +
                '</div> ' +
                '</div>'
        }
    },
    annotations: {
        xaxis: [
            {
                x: "14-06-2024",
                x2: "26-06-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Poule"
                }
            },
            {
                x: "26-06-2024",
                x2: "02-07-2024",
                fillColor: "#253780",
                opacity: .05,
                label: {
                    borderColor: "#253780",
                    style: {
                        color: "#fff",
                        background: "#253780"
                    },
                    text: "Round of 16"
                }
            },
            {
                x: "02-07-2024",
                x2: "06-07-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Quarter-finals"
                }
            },
            {
                x: "06-07-2024",
                x2: "10-07-2024",
                fillColor: "#253780",
                opacity: .05,
                label: {
                    borderColor: "#253780",
                    style: {
                        color: "#fff",
                        background: "#253780"
                    },
                    text: "Semi-finals"
                }
            },
            {
                x: "10-07-2024",
                x2: "14-07-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Final"
                }
            }
        ]
    }
}

</script>

<style lang="sass" scoped>
.team-wrapper
    flex: 1

</style>
