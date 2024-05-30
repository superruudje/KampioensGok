<template>
    <div class="w-100 d-flex">
        <div class="w-100 position-relative d-flex justify-content-center align-items-center">
            <div class="team-wrapper d-flex flex-nowrap align-items-center justify-content-end gap-2">
                <span class="fs-5">{{ getTeamName(match.teams[0]) }}</span>
                <img loading="lazy" alt="" :src="imageA">
            </div>
            <div class="d-flex flex-column align-items-center">
                <span class="mx-3 fw-bold fs-4">{{ player_prediction.join(' : ') }}</span>
                <span v-if="match.result" class="mx-3 fw-bold small">{{ match.result.join(' : ') }}</span>
            </div>
            <div class="team-wrapper d-flex flex-nowrap align-items-center gap-2">
                <img loading="lazy" alt="" :src="imageB">
                <span class="fs-5">{{ getTeamName(match.teams[1]) }}</span>
            </div>
            <span v-if="played" class="position-absolute top-0 end-0 txt-orange fw-bold">+{{ tournament.getPredictionScore(player_prediction, match) }}</span>
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
})

const player_prediction = tournament.getMatchPlayerPrediction(props.name, props.match.num)

const imageA = computed(() => {
    return teamImages.value[props.match.teams[0]] || teamImages.value[`default`]
})

const imageB = computed(() => {
    return teamImages.value[props.match.teams[1]] || teamImages.value[`default`]
})

function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}
</script>

<style scoped lang="sass">
.team-wrapper
    flex: 1
</style>