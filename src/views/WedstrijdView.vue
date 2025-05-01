<template>
    <div id="wedstrijd-view">
        <header v-if="match" class="bg-26-primary py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-center g-3 text-light">
                    <div class="col-md-10 text-center">
                        <h4 class="w26-condensed mb-0">{{ label }} • {{ matchType }}</h4>
                        <hr>
                        <div class="opacity-50" :class="{'mb-3': !summary }">{{ location?.stadium }} • {{ location?.city }}</div>
                        <div v-if="summary" class="mb-3">{{ summary }}</div>
                        <div class="d-flex align-items-center justify-content-center gap-3 gap-md-4">
                            <div
                                class="d-flex flex-grow-1 flex-shrink-0 align-items-center justify-content-end gap-2"
                                style="flex-basis: 30%">
                                <h1 class="mb-0 d-none d-md-block">{{ getTeamName(match.teams[0]) }}</h1>
                                <h6 class="mb-0 d-md-none">{{ getTeamName(match.teams[0]) }}</h6>
                                <img
                                    :src="getTeamImage(match.teams[0])"
                                    alt="teamA"
                                    class="border d-none d-md-block"
                                    width="48"/>
                                <img
                                    :src="getTeamImage(match.teams[0])"
                                    alt="teamA"
                                    class="border d-md-none"
                                    width="32"/>
                            </div>
                            <div class="d-flex align-items-center fs-2">
                                <span>{{ match.result[0] != null ? match.result[0] : '?' }}</span>-
                                <span>{{ match.result[1] != null ? match.result[1] : '?' }}</span>
                            </div>
                            <div
                                class="d-flex flex-row-reverse flex-grow-1 flex-shrink-0 align-items-center justify-content-end gap-2"
                                style="flex-basis: 30%">
                                <h1 class="mb-0 d-none d-md-block">{{ getTeamName(match.teams[1]) }}</h1>
                                <h6 class="mb-0 d-md-none">{{ getTeamName(match.teams[1]) }}</h6>
                                <img
                                    :src="getTeamImage(match.teams[1])"
                                    alt="teamA"
                                    class="border d-none d-md-block"
                                    width="48"/>
                                <img
                                    :src="getTeamImage(match.teams[1])"
                                    alt="teamA"
                                    class="border d-md-none"
                                    width="32"/>
                            </div>
                        </div>
                        <div v-if="match.result_after_penalties?.length" class="small">
                            ({{ match.result_after_penalties[0] }}-{{ match.result_after_penalties[1] }}p)
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main v-if="match" class="container py-3 py-md-5">
            <div class="row">
                <div class="col-md-8">
                    <div class="card rounded-4 mb-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder w26-condensed mb-3">Timeline</h3>
                            <div v-if="!match.events?.length">
                                Nog geen timeline.
                            </div>
                            <TimelineComponent
                                v-else
                                :teams="match?.teams"
                                :timeline="match?.events"/>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getGroupedMatchPrediction(match?.num)"
                        table_header="Uitslag"
                        title="Wat denken we?"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {computed, onBeforeMount, ref, type Ref} from "vue";
import type {Match} from "@/types/tournament.ts";
import {useTournament} from "@/stores/content.ts";
import router from "@/router";
//@ts-ignore
import moment from "moment/dist/moment.js";
import {storeToRefs} from "pinia";
import TimelineComponent from "@/components/TimelineComponent.vue";
import PredictionTable from "@/components/PredictionTable.vue";

const route = useRoute();

const tournament = useTournament();
const {teamImages, teams} = storeToRefs(tournament);


const match: Ref<Match | null | undefined> = ref(null);

const location = computed(() => {
    return match.value ? tournament.getLocation(match.value.location_id) : null;
})

const matchDay = computed(() => {
    return match.value ? tournament.match_days.find(matchDay => matchDay.id === match.value?.match_day_id) : null;
})

const label = computed(() => {
    moment.updateLocale("nl")
    return moment(matchDay.value?.date, "DD-MM-YYYY").format("D MMM");
})

const matchType = computed(() => {
    if (match.value?.poule_name.length === 1)
        return `Groep ${match.value?.poule_name}`;
    else
        return match.value?.poule_name.replaceAll("_", " ");
})

const summary = computed(() => {
    if (!match.value || !match.value.result_after_extra_time) return ''
    const final_score = match.value.result_after_penalties || match.value.result_after_extra_time
    const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
    if (final_winner === null) return 'Draw';
    return `${getTeamName(match.value.teams[final_winner])} wint na ${match.value.result_after_penalties ? 'penalties' : 'extra tijd'}`
})

/**
 * Retrieves the image URL associated with a given team name.
 *
 * @param {string} teamName - The name of the team whose image is being requested.
 * @return {string} The image URL corresponding to the team name, or the default image URL if the team name is not found.
 */
function getTeamImage(teamName: string) {
    return teamImages.value[teamName] || teamImages.value[`default`]
}

/**
 * Retrieves the full team name corresponding to the given short name.
 *
 * @param {string} teamName - The short name of the team to search for.
 * @return {string} The full team name if found; otherwise, returns the provided short name.
 */
function getTeamName(teamName: string) {
    return teams.value.find((e) => e.short_name === teamName)?.full_name || teamName
}

onBeforeMount(() => {
    match.value = tournament.getMatch(parseInt(route.params.id as string));
})

onBeforeRouteUpdate((to, from) => {
    if (!tournament.getMatch(parseInt(route.params.id as string))) router.push({name: '404'})
    else match.value = tournament.getMatch(parseInt(route.params.id as string));

})

</script>

<style lang="sass" scoped>

</style>