<template>
    <div class="card bg-gray border-0 rounded-0">
        <div class="card-body position-relative p-3 p-md-4 pt-4 pt-md-5 d-flex flex-column">
            <div class="match-group position-absolute top-0 start-50 bg-blue text-light px-3 py-1">
                {{ match.group.length > 1 ? match.group : `Groep ${match.group}` }}
            </div>
            <div class="d-flex justify-content-around align-items-center">
                <div class="team-wrapper">
                    <img :src="imageA" alt="" loading="lazy">
                    <span class="pt-1">{{ getTeamName(match.teams[0]) }}</span>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <span v-if="match.result?.length" class="txt-orange fw-bold">{{ match.time }}</span>
                    <div class="text-black fw-bold fst-italic fs-1">
                        {{ match.result?.length ? `${match.result[0]} : ${match.result[1]}` : match.time }}
                    </div>
                    <span v-if="match.result_pen" class="mx-3 fw-bold">{{ `(${match.result_pen[0]}) : (${match.result_pen[1]})` }}</span>
                    <span v-else-if="match.result_nvl" class="mx-3 fw-bold">{{ match.result_nvl.join(' : ') }}</span>

                </div>
                <div class="team-wrapper">
                    <img :src="imageB" alt="" loading="lazy">
                    <span class="pt-1">{{ getTeamName(match.teams[1]) }}</span>
                </div>
            </div>

            <transition name="collapse">
                <div v-if="openTimeline" class="overflow-hidden">
                    <hr>
                    <span v-if="!match.timeline.length">Geen data beschikbaar</span>
                    <timeline-component :teams="match.teams" :timeline="match.timeline"/>
                </div>
            </transition>
            <div class="spacer flex-grow-1"></div>
            <hr>
            <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <span class="txt-blue text-wrap"><i class="bi bi-pin-map txt-orange me-2"></i>{{
                        match.stadium
                    }}, {{ match.city }}</span>
                <button v-if="match.timeline" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 text-nowrap"
                        @click="openTimeline = !openTimeline">Toon
                    {{ openTimeline ? 'minder' : 'meer' }}
                    <i :class="openTimeline ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi ms-2"></i>
                </button>
                <button v-else-if="started" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 text-nowrap"
                        @click="openPrediction = !openPrediction">Wat denken we?
                    <i :class="openPrediction ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi ms-2"></i>
                </button>
            </div>
            <transition name="collapse">
                <div v-if="openPrediction" class="overflow-hidden">
                    <hr>
                    <prediction-table :image="false" :list="predictions" title="" table_header="Score"/>
                </div>
            </transition>
            <i class="position-absolute top-0 end-0 bi p-2 bi-question-circle ms-2"
               data-bs-title="Uitslag na 90 minuten wordt gebruikt voor voorspelling"
               data-bs-toggle="tooltip"></i>
        </div>
    </div>
</template>

<script setup>
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import TimelineComponent from "@/components/TimelineComponent.vue";
import PredictionTable from "@/components/PredictionTable.vue";

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

</script>

<style lang="sass" scoped>
.collapse-enter-active
    animation: collapse reverse 500ms ease

.collapse-leave-active
    animation: collapse 500ms ease

@keyframes collapse
    from
        max-height: 400px
    to
        max-height: 0

.match-group
    transform: translate(-50%, -50%) skew(-8deg)

.team-wrapper
    display: flex
    flex: 1
    flex-direction: column
    justify-content: space-between
    align-items: center

.time-line
    flex: 1
</style>