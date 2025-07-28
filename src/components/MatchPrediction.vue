<template>
    <div id="match_card" class="card rounded-4 position-relative w-100">
        <div class="card-body p-0">
            <div class="p-3 p-md-4">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="fw-lighter text-secondary">#{{ match.num }}</span>
                    <span class="fw-lighter text-secondary">{{ tournament.getMatchSummary(match) }}</span>
                    <template v-if="played">
                        <span
                            :data-bs-title="score.reason?.join(', ') + '.'"
                            class="ms-auto badge bg-orange"
                            data-bs-html="true"
                            data-bs-toggle="tooltip">
                            +{{ score.score }}
                        </span>
                        <span v-if="score.score === 0">😭</span>
                        <span v-if="score.score === 2">😔</span>
                        <span v-if="score.score === 5">&#128517;</span>
                        <span v-if="score.score === 7">&#128079;</span>
                        <span v-if="score.score === 10">&#127881;</span>
                    </template>
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
                            <span class="me-auto text-truncate">{{ isTeam(match.teams[n - 1]) ? $t('countries.' + match.teams[n - 1]) : match.teams[n - 1] }}</span>
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
                    <div class="flex-shrink-0 d-flex flex-column gap-2">
                        <div v-for="n in 2" class="d-flex gap-2 align-items-center">
                            <template v-if="isKnockout">
                                <i
                                    v-if="isTeam(match.teams[n - 1]) && player_prediction_teams[n - 1] !== match.teams[n - 1] && !inKnockOut(player_prediction_teams[n - 1])"
                                    class="bi bi-exclamation-circle-fill text-red lh-1"
                                    data-bs-title="Team incorrect voorspeld."
                                    data-bs-toggle="tooltip"></i>
                                <i
                                    v-else-if="isTeam(match.teams[n - 1]) && player_prediction_teams[n - 1] !== match.teams[n - 1] && inKnockOut(player_prediction_teams[n - 1])"
                                    class="bi bi-exclamation-circle-fill text-yellow lh-1"
                                    data-bs-title="Team incorrect voorspeld. Wel in knock-out."
                                    data-bs-toggle="tooltip"></i>
                                <i
                                    v-else-if="isTeam(match.teams[n - 1])"
                                    class="bi bi-exclamation-circle-fill text-green lh-1"
                                    data-bs-title="Team correct voorspeld."
                                    data-bs-toggle="tooltip"></i>
                                <img
                                    :alt="`team${n}_prediction`"
                                    :src="getTeamImage(player_prediction_teams[n - 1])"
                                    class="border"
                                    loading="lazy"
                                    width="30px"/>
                            </template>
                            <span class="fs-4 fw-bold lh-1">{{ player_prediction[n - 1] }}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        class="btn-wc26 sm btn-wc26-orange w-fit"
                        :class="{ active: viewPredictions }"
                        @click="viewPredictions = !viewPredictions">
                        Pool
                    </button>
                </div>

            </div>
            <div
                v-if="viewPredictions"
                class="border-top p-3 p-md-4 bg-body-tertiary rounded-bottom-4">
                <PredictionTable
                    :list="tournament.getGroupedMatchPrediction(match.num)"
                    :table_header="$t('dict.result')"
                    :image="false"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import type {Match, MatchDayType} from "@/types/tournament.ts";
import PredictionTable from "@/components/PredictionTable.vue";
import {i18n} from "@/i18n";

const tournament = useTournament()
const {teamImages, teams, knock_out} = storeToRefs(tournament)

const props = defineProps<{
    match: Match,
    matchDayType: MatchDayType
    teamName: string,
    played?: boolean,
    isKnockout?: boolean,
}>()

const player_prediction = tournament.getMatchPlayerPrediction(props.teamName, props.match.num)
const player_prediction_teams = tournament.getMatchPlayerPredictionTeams(props.teamName, props.match.num)
const viewPredictions = ref(false);

const score = computed(() => {
    return props.played ? tournament.getPredictionScore(player_prediction, props.match) : {score: 0, reason: []}
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

function getRedCards(teamName: string) {
    return props.match.events ? props.match.events.filter(event => event.type === 'red_card' && event.team === teamName).length : 0
}

/**
 * Check if the team is in knockout
 * @param teamName
 */
function inKnockOut(teamName: string) {
    switch (props.matchDayType) {
        case 'round_of_32':
            return knock_out.value.round_of_32.some(t => t === teamName)
        case 'round_of_16':
            return knock_out.value.round_of_16.some(t => t === teamName)
        case 'quarter_finals':
            return knock_out.value.quarter_final.some(t => t === teamName)
        case 'semi_finals':
            return knock_out.value.semi_final.some(t => t === teamName)
        case 'bronze_final':
            return knock_out.value.bronze_final.some(t => t === teamName)
        case 'final':
            return knock_out.value.final.some(t => t === teamName)
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