<template>
    <div id="match_card" class="card rounded-4 position-relative w-100">
        <div class="card-body p-0">
            <div class="p-3 p-md-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <span class="fw-lighter text-secondary">{{ summary || `#${match.num}`}}</span>
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
                        <span class="fs-6 lh-1">({{ match.result_after_penalties[0] }})</span>
                        <span class="fs-6 lh-1">({{ match.result_after_penalties[1] }})</span>
                    </div>
                    <div class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                        <span class="fs-4 fw-bold lh-1">{{ match.result[0] != null ? match.result[0] : '?' }}</span>
                        <span class="fs-4 fw-bold lh-1">{{ match.result[1] != null ? match.result[1] : '?' }}</span>
                    </div>
                    <div class="vr"></div>
                    <div
                        v-if="isKnockout"
                        class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                        <template v-for="n in 2">
                            <div class="d-flex gap-2 align-items-center">
                                <i
                                    v-if="isTeam(match.teams[n-1]) && player_prediction_teams[n-1] !== match.teams[n-1] && !inKnockOut(player_prediction_teams[n-1])"
                                    class="bi bi-exclamation-circle-fill text-red lh-1"
                                    data-bs-title="Team incorrect voorspeld."
                                    data-bs-toggle="tooltip"></i>
                                <i
                                    v-else-if="isTeam(match.teams[n-1]) && player_prediction_teams[n-1] !== match.teams[n-1] && inKnockOut(player_prediction_teams[n-1])"
                                    class="bi bi-exclamation-circle-fill text-yellow lh-1"
                                    data-bs-title="Team incorrect voorspeld. Wel in knock-out."
                                    data-bs-toggle="tooltip"></i>
                                <i
                                    v-else-if="isTeam(match.teams[n-1])"
                                    class="bi bi-exclamation-circle-fill text-green lh-1"
                                    data-bs-title="Team correct voorspeld."
                                    data-bs-toggle="tooltip"></i>
                                <img
                                    :alt="`team${n}_prediction`"
                                    :src="getTeamImage(player_prediction_teams[n-1])"
                                    class="border"
                                    loading="lazy"
                                    width="30px"/>
                            </div>
                        </template>
                    </div>
                    <div class="flex-shrink-0 d-flex flex-column gap-2 justify-content-center">
                        <span class="fs-4 fw-bold lh-1">{{ player_prediction[0] }}</span>
                        <span class="fs-4 fw-bold lh-1">{{ player_prediction[1] }}</span>
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

const summary = computed(() => {
    const { result_after_extra_time, result_after_penalties, teams } = props.match;
    if (!result_after_extra_time) return '';

    const final_score = result_after_penalties || result_after_extra_time;
    const [scoreA, scoreB] = final_score;
    const final_winner = scoreA === scoreB ? null : scoreA > scoreB ? 0 : 1;

    if (final_winner === null) {
        return i18n.global.t('dict.draw');
    }

    const winnerName = getTeamName(teams[final_winner]);

    if (result_after_penalties) {
        return i18n.global.t('dict.wins_on_penalties', { team: winnerName });
    }

    return i18n.global.t('dict.wins_after_extra_time', { team: winnerName });
})

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

function getTeamName(teamName: string) {
    return teams.value.find((e) => e.short_name === teamName)?.full_name || teamName
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
        case 'quarter_final':
            return knock_out.value.quarter_final.some(t => t === teamName)
        case 'semi_final':
            return knock_out.value.semi_final.some(t => t === teamName)
        case 'final_bronze':
            return knock_out.value.final_bronze.some(t => t === teamName)
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