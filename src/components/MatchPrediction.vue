<template>
    <div id="match_card" class="card position-relative w-100">
        <div class="card-body">
            <div class="d-flex align-items-center gap-3 mb-3">
                <span class="fw-lighter group-name">{{
                        match.group.length <= 1 ? `Groep ${match.group}` : summary
                    }}</span>
                <span v-if="played" :data-bs-title="score.reason.join(', ') + '.'"
                      class="ms-auto badge bg-orange" data-bs-html="true"
                      data-bs-toggle="tooltip">+{{
                        score.score
                    }}
                </span>
                <span v-if="score.score === 0">😭</span>
                <span v-if="score.score === 2">😔</span>
                <span v-if="score.score === 5">&#128517;</span>
                <span v-if="score.score === 7">&#128079;</span>
                <span v-if="score.score === 10">&#127881;</span>
            </div>
            <div class="d-flex gap-3">
                <div class="teams d-flex flex-column">
                    <div
                        class="team-home d-flex align-items-center justify-content-end flex-grow-1 flex-shrink-0 flex-row-reverse gap-2">
                        <span>{{ getTeamName(match.teams[0]) }}
                            <span v-if="getRedCards(match.teams[0])"
                                  class="text-light ms-2 px-1 text-center bg-danger small">
                                {{ getRedCards(match.teams[0]) }}
                            </span>
                        </span>
                        <img :alt="'flag_' + match.teams[0]" :src="imageA" loading="lazy" style="width: 24px">
                    </div>
                    <div
                        class="team-away d-flex align-items-center justify-content-end flex-grow-1 flex-shrink-0 flex-row-reverse gap-2">
                        <span>{{ getTeamName(match.teams[1]) }}
                            <span v-if="getRedCards(match.teams[1])"
                                  class="text-light ms-2 px-1 text-center bg-danger small">
                                {{ getRedCards(match.teams[1]) }}
                            </span>
                        </span>
                        <img :alt="'flag_' + match.teams[1]" :src="imageB" loading="lazy" style="width: 24px">
                    </div>
                </div>
                <div v-if="match.result_pen?.length"
                     class="score-pen d-flex flex-column justify-content-around align-items-center fs-5 lh-1">
                    <span class="score-home">({{ match.result_pen[0] }})</span>
                    <span class="score-home">({{ match.result_pen[1] }})</span>
                </div>
                <div class="score d-flex flex-column justify-content-around align-items-center fw-bold fs-4 lh-1">
                    <span class="score-home">{{ match.result ? match.result[0] : '-'}}</span>
                    <span class="score-home">{{ match.result ? match.result[1] : '-'}}</span>
                </div>
                <div class="border-start"></div>
                <div v-if="knockout" class="d-flex flex-column justify-content-between align-items-center">
                    <div
                        class="team-home d-flex align-items-center flex-shrink-0 gap-2">
                        <i v-if="knockout && isTeam(match.teams[0]) && player_prediction_teams[0] !== match.teams[0] && !inKnockOut(player_prediction_teams[0])"
                           class="bi bi-exclamation-circle-fill text-danger"
                           data-bs-title="Team incorrect voorspeld."
                           data-bs-toggle="tooltip"></i>
                        <i v-else-if="knockout && isTeam(match.teams[0]) && player_prediction_teams[0] !== match.teams[0] && inKnockOut(player_prediction_teams[0])"
                           class="bi bi-exclamation-circle-fill text-warning"
                           data-bs-title="Team incorrect voorspeld. Wel in knock-out."
                           data-bs-toggle="tooltip"></i>
                        <i v-else-if="knockout && isTeam(match.teams[0])"
                           class="bi bi-check-circle-fill text-success"
                           data-bs-title="Team correct voorspeld."
                           data-bs-toggle="tooltip"></i>
                        <img :alt="'flag_' + player_prediction_teams[0]" :src="getImage(player_prediction_teams[0])" loading="lazy" style="width: 24px">
                    </div>
                    <div
                        class="team-away d-flex align-items-center flex-shrink-0 gap-2">
                        <i v-if="knockout && isTeam(match.teams[1]) && player_prediction_teams[1] !== match.teams[1]  && !inKnockOut(player_prediction_teams[1])"
                           class="bi bi-exclamation-circle-fill text-danger"
                           data-bs-title="Team incorrect voorspeld."
                           data-bs-toggle="tooltip"></i>
                        <i v-else-if="knockout && isTeam(match.teams[1]) && player_prediction_teams[1] !== match.teams[1] && inKnockOut(player_prediction_teams[1])"
                           class="bi bi-exclamation-circle-fill text-warning"
                           data-bs-title="Team incorrect voorspeld. Wel in knock-out."
                           data-bs-toggle="tooltip"></i>
                        <i v-else-if="knockout && isTeam(match.teams[1])"
                           class="bi bi-check-circle-fill text-success"
                           data-bs-title="Team correct voorspeld."
                           data-bs-toggle="tooltip"></i>
                        <img :alt="'flag_' + player_prediction_teams[1]" :src="getImage(player_prediction_teams[1])" loading="lazy" style="width: 24px">
                    </div>
                </div>
                <div class="score d-flex flex-column justify-content-around align-items-center fw-bold fs-4 lh-1">
                    <span class="score-home">{{ player_prediction[0] }}</span>
                    <span class="score-home">{{ player_prediction[1] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const tournament = useTournament()
const {teamImages, teams, knock_out} = storeToRefs(tournament)

const props = defineProps({
    match: {type: Object, required: true},
    name: {type: String, required: true},
    played: {type: Boolean, default: false},
    knockout: {type: Boolean, default: false},
})

const player_prediction = tournament.getMatchPlayerPrediction(props.name, props.match.num)
const player_prediction_teams = tournament.getMatchPlayerPredictionTeams(props.name, props.match.num)

/**
 * Return image based on team
 * @param team
 * @returns {*}
 */
function getImage(team) {
    return teamImages.value[team] || teamImages.value[`default`]
}

const imageA = computed(() => {
    const team = isTeam(props.match.teams[0]) ? props.match.teams[0] : `default`
    return teamImages.value[team]
})

const imageB = computed(() => {
    const team = isTeam(props.match.teams[1]) ? props.match.teams[1] : `default`
    return teamImages.value[team]
})

const summary = computed(() => {
    if (!props.match.result_nvl) return '-'
    const final_score = props.match.result_pen || props.match.result_nvl
    const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
    return `${getTeamName(props.match.teams[final_winner])} win after ${props.match.result_pen ? 'penalties' : 'extra time'}`
})

const score = computed(() => {
    return props.played ? tournament.getPredictionScore(player_prediction, props.match) : {}
})

/**
 * Check if is valid team id
 * @param string
 * @returns {boolean}
 */
function isTeam(string) {
    return teams.value.some(t => t.id === string)
}

function getTeamName(team) {
    return teams.value.find((e) => e.id === team)?.name || team
}

function getRedCards(team) {
    return props.match.timeline ? props.match.timeline.filter(e => e.type === 'red' && e.team === team).length : 0
}

/**
 * Check if team is in knockout
 * @param team
 */
function inKnockOut(team) {
    switch (props.match.group) {
        case 'Round of 16':
            return knock_out.value.round_of_16.some(t => t === team)
        case 'Quarter-finals':
            return knock_out.value.quarter_finals.some(t => t === team)
        case 'Semi-finals':
            return knock_out.value.semi_finals.some(t => t === team)
        case 'Final':
            return knock_out.value.finals.some(t => t === team)
        default:
            return false
    }
}
</script>

<style lang="sass" scoped>
.teams
    flex: 1 1 0
    gap: 12px
</style>