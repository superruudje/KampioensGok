<template>
    <div class="w-100 d-flex">
        <div class="w-100 position-relative d-flex justify-content-center align-items-center">
            <div class="team-wrapper d-flex flex-nowrap align-items-center justify-content-end gap-2">
                <div class="flex-shrink-1 d-flex flex-column align-items-end">
                    <span :class="{'text-decoration-line-through' : knockout && played && player_prediction_teams[0] !== match.teams[0]}"
                          class="fs-6 flex-shrink-1">{{ knockout ? getTeamName(player_prediction_teams[0]) : getTeamName(match.teams[0]) }}</span>
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
                    <span :class="{'text-decoration-line-through' : knockout && played && player_prediction_teams[1] !== match.teams[1]}"
                        class="fs-6 flex-shrink-1">{{ knockout ? getTeamName(player_prediction_teams[1]) : getTeamName(match.teams[1]) }}</span>
                    <span v-if="knockout" class="text-black-50 small">{{ getTeamName(match.teams[1]) }}</span>
                </div>
            </div>
            <span v-if="played" class="position-absolute top-0 end-0 txt-orange fw-bold">+{{
                    tournament.getPredictionScore(player_prediction, match)
                }}</span>
        </div>
    </div>
</template>

<script setup>
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const tournament = useTournament()
const {teamImages, teams} = storeToRefs(tournament)

const props = defineProps({
    match: {type: Object, required: true},
    name: {type: String, required: true},
    played: {type: Boolean, default: false},
    knockout: {type: Boolean, default: false},
})

const player_prediction = tournament.getMatchPlayerPrediction(props.name, props.match.num)
const player_prediction_teams = tournament.getMatchPlayerPredictionTeams(props.name, props.match.num)

const imageA = computed(() => {
    const team = props.knockout ? player_prediction_teams[0] : props.match.teams[0]
    return teamImages.value[team] || teamImages.value[`default`]
})

const imageB = computed(() => {
    const team = props.knockout ? player_prediction_teams[1] : props.match.teams[1]
    return teamImages.value[team] || teamImages.value[`default`]
})

function getTeamName(team) {
    return teams.value.find((e) => e.id === team)?.name || team
}
</script>

<style lang="sass" scoped>
.team-wrapper
    flex: 1
</style>