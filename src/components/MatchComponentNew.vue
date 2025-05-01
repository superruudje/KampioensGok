<template>
    <div id="match_card" class="card rounded-4">
        <div class="card-body p-3 p-md-4">
            <div class="d-flex mb-3">
                <span class="fw-lighter text-secondary">#{{ match.num }}&emsp;</span>
                <span v-if="match.poule_name || summary" class="fw-lighter text-secondary">
                    {{ summary ? summary : `${match.poule_name.replaceAll('_', ' ')}` }}
                </span>
            </div>
            <div class="d-flex gap-2 gap-md-3 mb-3">
                <div class="flex-grow-1 d-flex flex-column gap-2 justify-content-center">
                    <div v-for="n in 2" class="d-flex align-items-center gap-2">
                        <img
                            :alt="`team${n}`"
                            :src="getTeamImage(match.teams[n-1])"
                            class="border"
                            loading="lazy"
                            width="30px"/>
                        <span>{{ getTeamName(match.teams[n - 1]) }}</span>
                    </div>
                </div>
                <div
                    v-if="match.result_after_penalties?.length"
                    class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                    <span class="fs-5 lh-1">({{ match.result_after_penalties[0] }})</span>
                    <span class="fs-5 lh-1">({{ match.result_after_penalties[1] }})</span>
                </div>
                <div
                    v-if="match.result_after_extra_time?.length"
                    class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                    <span class="fs-4 fw-bold lh-1">{{
                            match.result_after_extra_time[0] != null ? match.result_after_extra_time[0] : '?'
                        }}</span>
                    <span class="fs-4 fw-bold lh-1">{{
                            match.result_after_extra_time[1] != null ? match.result_after_extra_time[1] : '?'
                        }}</span>
                </div>
                <div
                    v-else
                    class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                    <span class="fs-4 fw-bold lh-1">{{ match.result[0] != null ? match.result[0] : '?' }}</span>
                    <span class="fs-4 fw-bold lh-1">{{ match.result[1] != null ? match.result[1] : '?' }}</span>
                </div>
                <div class="vr"></div>
                <div class="d-flex flex-column gap-2 justify-content-center align-items-center">
                    <span v-if="match.result?.length" class="fw-lighter lh-1">Full time</span>
                    <span v-else class="fw-lighter lh-1">{{ match.time }}</span>
                </div>
            </div>

            <div class="d-flex flex-wrap gap-1 justify-content-between align-items-center">
                <RouterLink :to="{name: 'wedstrijd', params: {id: match.num}}" class="flex-shrink-0">
                    <button class="btn-wc26 sm btn-wc26-orange-alt w-fit">Toon details</button>
                </RouterLink>
                <span class="fw-lighter small group-name">
                    {{ location?.city }}, {{ location?.country }}
                    <i class="bi bi-pin-map ms-1"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import type {Match} from "@/types/tournament.ts";

const tournament = useTournament()
const {playedMatches, teamImages, teams} = storeToRefs(tournament)

const props = defineProps<{
    match: Match
}>()

const location = computed(() => {
    return tournament.getLocation(props.match.location_id)
})

const summary = computed(() => {
    if (!props.match.result_after_extra_time) return ''
    const final_score = props.match.result_after_penalties || props.match.result_after_extra_time
    const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
    if (final_winner === null) return 'Draw';
    return `${getTeamName(props.match.teams[final_winner])} wint na ${props.match.result_after_penalties ? 'penalties' : 'extra tijd'}`
})

const predictions = computed(() => {
    return tournament.getGroupedMatchPrediction(props.match.num)
})

const started = computed(() => {
    return playedMatches.value.length
})

function getTeamImage(teamName: string) {
    return teamImages.value[teamName] || teamImages.value[`default`]
}

/**
 * Check if is valid team id
 * @param teamName
 */
function isTeam(teamName: string) {
    return teams.value.some(t => t.short_name === teamName)
}

function getTeamName(teamName: string) {
    return teams.value.find((e) => e.short_name === teamName)?.full_name || teamName
}

function getRedCards(teamName: string) {
    return props.match.events ? props.match.events.filter(event => event.type === 'red_card' && event.team === teamName).length : 0
}

</script>

<style lang="sass" scoped>
.teams
    flex: 1 1 0
    gap: 12px
</style>