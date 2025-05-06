<template>
    <div id="match_card" class="card rounded-4">
        <div class="card-body p-3 p-md-4">
            <div class="d-flex mb-3">
                <span class="fw-lighter text-secondary">#{{ match.num }}&emsp;</span>
                <span
                    v-if="match.poule_name || summary"
                    class="fw-lighter text-secondary">
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
import {i18n} from "@/i18n";

const tournament = useTournament()
const {teamImages, teams} = storeToRefs(tournament)

const props = defineProps<{
    match: Match
}>()

const location = computed(() => {
    return tournament.getLocation(props.match.location_id)
})

/**
 * Computes a summary of the match results based on extra time and penalty details.
 *
 * If there is no result after extra time, it returns an empty string.
 * It determines the match outcome (win, loss, or draw) based on the scores and
 * calculates the final winner (team or draw). Depending on the match result,
 * it provides a localized string indicating whether the match ended in a draw,
 * was won after penalties, or was won after extra time.
 *
 * @constant {Function} summary
 * @returns {string} A localized string summarizing the match result.
 */
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
 * Retrieves the full name of the team based on its short name.
 *
 * @param {string} teamName - The short name of the team to search for.
 * @return {string} The full name of the team if found; otherwise, the original short name provided.
 */
function getTeamName(teamName: string) {
    return teams.value.find((e) => e.short_name === teamName)?.full_name || teamName
}

</script>

<style lang="sass" scoped>
.teams
    flex: 1 1 0
    gap: 12px
</style>