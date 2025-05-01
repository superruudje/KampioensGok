<template>
    <div id="player-page">
        <div class="row g-4">
            <div class="col-md-6">
                <!-- voorspelling -->
                <div class="card rounded-4 mb-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Voorspellingen poulefase</h3>
                        <div v-if="!started" class="bg-orange rounded-2 py-2 px-3 text-light">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <MatchDayPrediction
                                v-for="match_day in tournament.playedPouleMatches"
                                :key="'played'"
                                :match_day="match_day"
                                :team_name="player.team_name"
                                full
                                played/>
                            <MatchDayPrediction
                                v-for="match_day in tournament.unplayedPouleMatches"
                                :key="'to_play'"
                                :match_day="match_day"
                                :team_name="player.team_name"
                                full/>
                        </template>
                    </div>
                </div>
                <!-- voorspelling -->
                <div class="card rounded-4 mb-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Voorspellingen knockout I</h3>
                        <div v-if="!started" class="bg-orange rounded-2 py-2 px-3 text-light">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <MatchDayPrediction
                                v-for="(matchDay) in tournament.playedMatchesByMatchDayType(MatchDayType.RoundOf32)"
                                :match_day="matchDay"
                                :team_name="player.team_name"
                                played/>
                            <MatchDayPrediction
                                v-for="matchDay in tournament.unplayedMatchesByMatchDayType(MatchDayType.RoundOf32)"
                                :match_day="matchDay"
                                :team_name="player.team_name"/>
                        </template>
                    </div>
                </div>
                <!-- voorspelling -->
                <div class="card rounded-4 mb-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Voorspellingen knockout II</h3>
                        <div v-if="!started" class="bg-orange rounded-2 py-2 px-3 text-light">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <MatchDayPrediction
                                v-for="(matchDay) in tournament.playedMatchesByMatchDayType(MatchDayType.RoundOf16)"
                                :match_day="matchDay"
                                :team_name="player.team_name"
                                played/>
                            <MatchDayPrediction
                                v-for="matchDay in tournament.unplayedMatchesByMatchDayType(MatchDayType.RoundOf16)"
                                :match_day="matchDay"
                                :team_name="player.team_name"/>
                        </template>
                    </div>
                </div>
                <!-- voorspelling -->
                <div class="card rounded-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Voorspellingen finales</h3>
                        <div v-if="!started" class="bg-orange rounded-2 py-2 px-3 text-light">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <div v-else>
                            <div v-for="round in ['quarter_final', 'semi_final', 'final']">
                                <MatchDayPrediction
                                    v-for="(matchDay) in tournament.playedMatchesByMatchDayType(round as MatchDayType)"
                                    :match_day="matchDay"
                                    :team_name="player.team_name"
                                    played/>
                                <MatchDayPrediction
                                    v-for="matchDay in tournament.unplayedMatchesByMatchDayType(round as MatchDayType)"
                                    :match_day="matchDay"
                                    :team_name="player.team_name"/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <!-- bonus vragen -->
                <div class="card rounded-4 mb-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Bonusvragen</h3>
                        <p>Punten voor de bonusvragen worden pas <u>na</u> de poulefase toegekend.</p>
                        <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white mb-3">
                            <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij
                            start toernooi.
                        </div>
                        <template v-else>
                            <div
                                v-for="(q, idx) in tournament.bonusQuestions"
                                class="d-flex flex-column mb-3">
                                <span class="txt-orange fs-6 fst-italic">{{ q.question }}</span>
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="txt-pk-elevation-01">
                                        <template v-if="getQuestionPoints(q, idx) > -1">
                                            <i v-if="getQuestionPoints(q, idx) > 0"
                                               class="bi bi-check-circle-fill me-2 text-success"></i>
                                            <i v-else-if="q.answer" class="bi bi-x-circle-fill me-2 text-danger"></i>
                                        </template>
                                        <b>{{ getTeamName(player.bonus[idx]) }}</b>
                                        <span v-if="q.type === 'exact'" class="small fst-italic"> ({{
                                                getPercentage(data[idx].find(i => i.id === player.bonus[idx])?.count || 0)
                                            }}% denkt dit ook{{ `, nu ${q.current_answer || '-'}` }})</span>
                                        <span v-if="q.type === 'estimate'" class="small fst-italic"> ({{
                                                `nu ${q.current_answer || '-'}`
                                            }})</span>
                                    </span>
                                    <span v-if="getQuestionPoints(q, idx) > -1" class="badge bg-orange">+{{
                                            getQuestionPoints(q, idx)
                                        }}</span>
                                </div>
                            </div>
                        </template>
                        <RouterLink :to="{name: 'statistieken'}">
                            <button class="btn-wc26 btn-wc26-orange-alt w-fit">
                                Naar statistieken
                            </button>
                        </RouterLink>
                    </div>
                </div>
                <!-- scoreverloop -->
                <div class="card rounded-4 mb-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Scoreverloop</h3>
                        <div style="height: 300px">
                            <EchartLine :data="LINE_CHART"/>
                        </div>
                    </div>
                </div>
                <!-- info -->
                <div class="card rounded-4">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="fw-bolder w26-condensed mb-3">Info</h3>
                        <span class="d-block"><i class="bi bi-check-circle-fill text-success me-2"></i>Team correct voorspeld.</span>
                        <span class="d-block"><i class="bi bi-exclamation-circle-fill text-warning me-2"></i>Team incorrect voorspeld, maar wel in knockout.</span>
                        <span class="d-block"><i class="bi bi-exclamation-circle-fill text-danger me-2"></i>Team incorrect voorspeld (geen punten).</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import MatchDayPrediction from "@/components/MatchDayPrediction.vue";
import {storeToRefs} from "pinia";
import {MatchDayType} from "@/types/tournament.ts";
import type {Player, Question} from "@/types/pool.ts";
import EchartLine from "@/components/charts/EchartLine.vue";

const tournament = useTournament();
const {
    players,
    playedMatchesGroupedByDay,
    teams,
} = storeToRefs(tournament)

const props = defineProps<{
    player: Player,
}>()

const matchesPlayedQuarterFinal = computed(() => tournament.playedMatchesByMatchDayType(MatchDayType.QuaterFinal));
const matchesUnplayedQuarterFinal = computed(() => tournament.unplayedMatchesByMatchDayType(MatchDayType.QuaterFinal));

const data = ref([
    tournament.getBonusPrediction(0),
    [],
    [],
    tournament.getBonusPrediction(3),
    tournament.getBonusPrediction(4),
    tournament.getBonusPrediction(5),
    tournament.getBonusPrediction(6),
    tournament.getBonusPrediction(7),
    tournament.getBonusPrediction(8),
])

const LINE_CHART = computed(() => {
    const lines: { name: string, data: { category: string, value?: number }[] }[] = [];

    const data: { category: string, value?: number }[] = [
        {category: 'start', value: 0}
    ]

    playedMatchesGroupedByDay.value.forEach((matchDay, idx) => {
        const score = tournament.getParticipantTotalScore(props.player.team_name, idx + 1);
        data.push({category: matchDay.matchDayDate, value: score})
    })

    lines.push({
        name: props.player.team_name.length > 30 ? props.player.team_name.slice(0, 30) + '...' :props.player.team_name,
        data
    })

    return lines
})

/**
 * Calculates the points for the given question based on the player's bonus and the number of played matches grouped by day.
 *
 * @param {Question} question - The question object for which points need to be calculated.
 * @param {number} idx - The index of the player's bonus associated with the question.
 * @return {number} The calculated score for the given question.
 */
function getQuestionPoints(question: Question, idx: number) {
    return tournament.getBonusScore(question, props.player.bonus[idx],
        Object.keys(playedMatchesGroupedByDay.value).length)
}

/**
 * Return team name
 * @param id
 * @returns {*}
 */
function getTeamName(id: string) {
    return teams.value.find((e) => e.id === id)?.full_name || id
}

/**
 * Return percentage of occurrence
 * @param count
 * @returns {number}
 */
function getPercentage(count: number) {
    return (Math.round((count / players.value.length * 100) * 100) / 100)
}

const started = computed(() => {
    return true
    // return playedMatches.value.length
})

/**
 * Chart data
 * @type {ComputedRef<*[]>}
 */
const series = computed(() => {
    let data = [{x: "start", y: 0}]
    Object.keys(playedMatchesGroupedByDay.value).forEach((key, idx) => {
        const score = tournament.getParticipantTotalScore(props.player.team_name, idx + 1)
        data.push({x: key, y: score})
    })
    return [{
        name: props.player.team_name,
        data: data
    }]
})

</script>

<style lang="sass" scoped></style>
