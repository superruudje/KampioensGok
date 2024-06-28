<template>
    <div class="w-100 d-flex">
        <div class="w-100 position-relative d-flex justify-content-center align-items-center">
            <div class="team-wrapper d-flex flex-nowrap align-items-center justify-content-end gap-2">
                <div class="flex-shrink-1 d-flex flex-column align-items-end">
                    <span class="fs-6 flex-shrink-1">
                        {{ knockout ? getTeamName(player_prediction_teams[0]) : getTeamName(match.teams[0]) }}
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

                    </span>
                    <span v-if="knockout" class="text-black-50 small">{{ getTeamName(match.teams[0]) }}</span>
                </div>
                <img :src="imageA" alt="" class="d-none d-lg-block" loading="lazy" width="40"/>
                <img :src="imageA" alt="" class="d-lg-none" loading="lazy" width="26">
            </div>
            <div class="d-flex flex-column align-items-center flex-shrink-0">
                <span class="mx-2 mx-lg-3 fw-bold">{{ player_prediction.join(' : ') }}</span>
                <span v-if="match.result" class="fw-bold text-black-50 small">{{ match.result.join(' : ') }}</span>
            </div>
            <div class="team-wrapper d-flex flex-nowrap align-items-center gap-2">
                <img :src="imageB" alt="" class="d-none d-lg-block" loading="lazy" width="40">
                <img :src="imageB" alt="" class="d-lg-none" loading="lazy" width="26">
                <div class="flex-shrink-1 d-flex flex-column align-items-start">
                    <span class="fs-6 flex-shrink-1">
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
                        {{ knockout ? getTeamName(player_prediction_teams[1]) : getTeamName(match.teams[1]) }}
                    </span>
                    <span v-if="knockout" class="text-black-50 small">{{ getTeamName(match.teams[1]) }}</span>
                </div>
            </div>
            <span v-if="played" :data-bs-title="score.reason.join(', ') + '.'"
                  class="position-absolute top-0 end-0 badge bg-orange" data-bs-html="true"
                  data-bs-toggle="tooltip">+{{
                    score.score
                }}</span>
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

const imageA = computed(() => {
    const team = isTeam(props.match.teams[0]) ? props.match.teams[0] : player_prediction_teams[0]
    return teamImages.value[team] || teamImages.value[`default`]
})

const imageB = computed(() => {
    const team = isTeam(props.match.teams[1]) ? props.match.teams[1] : player_prediction_teams[1]
    return teamImages.value[team] || teamImages.value[`default`]
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

/**
 * Check if team is in knockout
 * @param team
 */
function inKnockOut(team) {
    console.log(team)
    return knock_out.value.round_of_16.some(t => t === team)
}
</script>

<style lang="sass" scoped>
.team-wrapper
    flex: 1
</style>