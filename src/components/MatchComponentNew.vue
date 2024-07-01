<template>
    <div id="match_card" class="card position-relative">
        <div class="card-body p-4 d-flex flex-column justify-content-center">
            <div v-if="match.group.length <= 1 || summary" class="d-flex mb-3">
                <span class="fw-lighter group-name">{{
                        match.group.length <= 1 ? `Groep ${match.group}` : summary
                    }}</span>
            </div>
            <div class="d-flex gap-2">
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
                     class="score-pen d-flex flex-column justify-content-around fs-5 lh-1">
                    <span class="score-home">({{ match.result_pen[0] }})</span>
                    <span class="score-home">({{ match.result_pen[1] }})</span>
                </div>
                <div v-if="match.result?.length"
                     class="score d-flex flex-column justify-content-around fw-bold fs-4 lh-1">
                    <span class="score-home">{{ match.result[0] }}</span>
                    <span class="score-home">{{ match.result[1] }}</span>
                </div>
                <div class="border-start ps-3 d-flex flex-column align-items-center justify-content-center gap-2">
                    <span v-if="match.result?.length" class="fw-lighter lh-1">Full time</span>
                    <span v-else class="fs-5 lh-1">{{ match.time }}</span>
                    <button v-if="isTeam(match.teams[0])" class="btn btn-sm btn-orange" title="">Toon details</button>
                </div>
            </div>
        </div>
        <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
           data-bs-title="Uitslag na 90 minuten wordt gebruikt voor voorspelling"
           data-bs-toggle="tooltip"></i>
    </div>
</template>

<script setup>
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";

const tournament = useTournament()
const {matches_played, teamImages, teams} = storeToRefs(tournament)
const openTimeline = ref(false)
const openPrediction = ref(false)

const props = defineProps({
    match: {type: Object, required: true},
})

const imageA = computed(() => {
    return teamImages.value[props.match.teams[0]] || teamImages.value[`default`]
})

const imageB = computed(() => {
    return teamImages.value[props.match.teams[1]] || teamImages.value[`default`]
})

const summary = computed(() => {
    if (!props.match.result_nvl) return ''
    const final_score = props.match.result_pen || props.match.result_nvl
    const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
    return `${getTeamName(props.match.teams[final_winner])} win after ${props.match.result_pen ? 'penalties' : 'extra time'}`
})

const predictions = computed(() => {
    return tournament.getGroupMatchPrediction(props.match.num)
})

const started = computed(() => {
    return matches_played.value.length
})

/**
 * Check if is valid team id
 * @param string
 * @returns {boolean}
 */
function isTeam(string) {
    return teams.value.some(t => t.id === string)
}

function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

function getRedCards(team) {
    return props.match.timeline ? props.match.timeline.filter(e => e.type === 'red' && e.team === team).length : 0
}

</script>

<style lang="sass" scoped>
#match_card
    height: 144px
.teams
    flex: 1 1 0
    gap: 12px
</style>