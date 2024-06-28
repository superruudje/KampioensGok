<template>
    <div class="card position-relative">
        <div class="card-body p-4 d-flex flex-column">
            <div class="d-flex mb-3">
                <span class="text-black-50 group-name">{{ match.group.length <= 1 ? `Groep ${match.group}` : `` }}</span>
            </div>
            <div class="d-flex gap-3">
                <div class="teams d-flex flex-column">
                    <div class="team-home d-flex align-items-center justify-content-end flex-grow-1 flex-shrink-0 flex-row-reverse gap-2">
                        <span>{{ getTeamName(match.teams[0])}}
                            <span v-if="getRedCards(match.teams[0])" class="text-light ms-2 px-1 text-center bg-danger small">
                                {{ getRedCards(match.teams[0]) }}
                            </span>
                        </span>
                        <img :src="imageA" :alt="'flag_' + props.match.teams[0]" loading="lazy" style="width: 24px">
                    </div>
                    <div class="team-away d-flex align-items-center justify-content-end flex-grow-1 flex-shrink-0 flex-row-reverse gap-2">
                        <span>{{ getTeamName(match.teams[1])}}
                            <span v-if="getRedCards(match.teams[1])" class="text-light ms-2 px-1 text-center bg-danger small">
                                {{ getRedCards(match.teams[1]) }}
                            </span>
                        </span>
                        <img :src="imageB" :alt="'flag_' + props.match.teams[1]" loading="lazy" style="width: 24px">
                    </div>
                </div>
                <div class="score d-flex flex-column fw-bold fs-4 lh-1" v-if="match.result?.length">
                    <span class="score-home">{{ match.result[0] }}</span>
                    <span class="score-home">{{ match.result[1] }}</span>
                </div>
                <div class="border-start ps-3 d-flex flex-column align-items-center gap-2">
                    <span v-if="match.result?.length" class="text-black-50 lh-1">Full time</span>
                    <span v-else class="fs-5 lh-1">{{ match.time }}</span>
                    <button class="btn btn-sm btn-orange" title="">Toon details</button>
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
import TimelineComponent from "@/components/TimelineComponent.vue";
import PredictionTable from "@/components/PredictionTable.vue";
import {faMobile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

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

const predictions = computed(() => {
    return tournament.getGroupMatchPrediction(props.match.num)
})

const started =  computed(() => {
    return matches_played.value.length
})

function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

function getRedCards(team) {
    return props.match.timeline ? props.match.timeline.filter(e => e.type === 'red' && e.team === team).length : 0
}

</script>

<style lang="sass" scoped>
.teams
    flex: 1 1 0
.teams, .score
    gap: 12px
</style>