<template>
    <div id="match_card" class="card rounded-4">
        <div class="card-body p-3 p-md-4">
            <div class="d-flex gap-2 mb-3 fw-lighter text-secondary">
                <span>#{{ match.num }}</span>
                <span>{{ tournament.getMatchSummary(match) }}</span>
            </div>
            <div class="d-flex align-items-center gap-2 gap-md-3 flex-nowrap mb-3">
                <div class="flex-grow-1 d-flex flex-column gap-2 overflow-hidden">
                    <div v-for="n in 2" class="d-flex gap-2 align-items-center">
                        <img
                            :alt="`team${n}`"
                            :src="getTeamImage(match.teams[n-1])"
                            class="border"
                            loading="lazy"
                            width="30px"/>
                        <span class="me-auto">{{ isTeam(match.teams[n - 1]) ? $t('countries.' + match.teams[n - 1]) : match.teams[n - 1] }}</span>
                        <span
                            v-if="match.result_after_penalties"
                            class="fs-6 lh-1">({{ match.result_after_penalties[n - 1] }})</span>
                        <span
                            v-if="match.result_after_extra_time"
                            class="fs-6 lh-1">({{ match.result_after_extra_time[n - 1] }})</span>
                        <span class="fs-4 fw-bold lh-1">{{ match.result[n - 1] != null ? match.result[n - 1] : '?' }}</span>
                    </div>
                </div>
                <div class="vr"></div>
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <span v-if="match.result?.length" class="fw-lighter lh-1">{{ $t('dict.full_time') }}</span>
                    <span v-else class="fw-lighter lh-1">{{ match.time }}</span>
                </div>
            </div>

            <div class="d-flex flex-wrap gap-1 justify-content-between align-items-center">
                <RouterLink :to="{name: 'wedstrijd', params: {id: match.num}}" class="flex-shrink-0">
                    <button class="btn-wc26 sm btn-wc26-orange-alt w-fit">{{ $t('cta.view_details') }}</button>
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
const {teamImages, teams} = storeToRefs(tournament)

const props = defineProps<{
    match: Match
}>()

const location = computed(() => {
    return tournament.getLocation(props.match.location_id)
})

/**
 * Retrieves the image associated with the specified team name.
 * If no specific image is found for the given team name, returns the default team image.
 *
 * @param {string} teamName - The name of the team whose image is to be retrieved.
 * @return {string} The URL or identifier of the team's image, or the default image if no match is found.
 */
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

</script>

<style lang="sass" scoped></style>
