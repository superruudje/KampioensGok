<template>
    <div id="statistieken-view">
        <header class="bg-wk26-darkblue py-3 py-md-5">
            <div class="container">
                <div class="row g-3">
                    <div class="col-12">
                        <h1 class="text-white w26-condensed fw-bolder mb-0">{{ $t('heading.tournament_stats') }}</h1>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4">
                            <h2 class="fs-5 text-capitalize">{{ $t('dict.goal', 2) }}</h2>
                            <div class="num-stat-item">
                                <div class="fs-1 fw-bold">
                                    <NumberCounter
                                        :number="tournament.totalGoals"/>
                                </div>
                                <div class="fw-lighter">{{ capitalize($t('dict.total')) }} {{ $t('dict.goal', 2) }}</div>
                            </div>
                            <hr>
                            <div class="d-flex gap-4">
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageGoalsPerMatch }}
                                    </div>
                                    <div class="fw-lighter">{{ capitalize($t('dict.goal', 2)) }} {{ $t('dict.per_match') }}</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageGoalsPerMatch * tournament.matches.length }}
                                    </div>
                                    <div class="fw-lighter">{{ capitalize($t('dict.goal', 2)) }} {{ $t('dict.expected') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4">
                            <h2 class="fs-5">{{ capitalize($t('dict.card', 2)) }}</h2>
                            <div class="num-stat-item">
                                <div class="fs-1 fw-bold">
                                    <NumberCounter
                                        :number="total_cards"/>
                                </div>
                                <div class="fw-lighter">{{ capitalize($t('dict.total')) }} {{ $t('dict.card', 2) }}</div>
                            </div>
                            <hr>
                            <div class="d-flex gap-4">
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageCardsPerMatch }}
                                    </div>
                                    <div class="fw-lighter">{{ capitalize($t('dict.card', 2)) }} {{ $t('dict.per_match') }}</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageCardsPerMatch * tournament.matches.length }}
                                    </div>
                                    <div class="fw-lighter">{{ capitalize($t('dict.card', 2)) }} {{ $t('dict.expected') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-3 py-md-5">
            <div class="row g-3 mb-5">
                <div class="col-12">
                    <h2 class="w26-condensed">{{ $t('stats.team_stats') }}</h2>
                </div>
                <!-- meeste tegengoals -->
                <div class="col-md-4">
                    <TopTable
                        key="goals_against"
                        :list="tournament.goalsAgainstRanking"
                        :title="$t('stats.goals_against')"
                        isTeam/>
                </div>
                <!-- meeste kaarten -->
                <div class="col-md-4">
                    <TopTable
                        key="total_cards"
                        :list="tournament.totalCardsPerTeam"
                        :title="capitalize($t('dict.card', 2))"
                        isTeam/>
                </div>
            </div>
            <div class="row g-3 mb-3">
                <div class="col-12">
                    <h2 class="w26-condensed">{{ $t('stats.player_stats') }}</h2>
                </div>
                <!-- top scorer -->
                <div class="col-md-4">
                    <TopTable
                        key="top_scorer"
                        :list="tournament.topScorers"
                        :title="capitalize($t('dict.goal', 2))"/>
                </div>
                <!-- meest assist -->
                <div class="col-md-4">
                    <TopTable
                        key="top_assist"
                        :list="tournament.topAssist"
                        :title="capitalize($t('dict.assist', 2))"/>
                </div>
            </div>
        </main>
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">{{ $t('stats.predictions_insight') }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-3 py-md-5">
            <NotStarted v-if="!started"/>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <PredictionTableCard
                        :list="tournament.getBonusPrediction(0)"
                        :table_header="$t('dict.country')"
                        :title="$t('questions.champion')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :list="tournament.getBonusPrediction(3)"
                        :table_header="$t('dict.country')"
                        :title="$t('questions.goals_against')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :list="tournament.getBonusPrediction(4)"
                        :table_header="$t('dict.country')"
                        :title="$t('questions.most_cards')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPrediction(5)"
                        :table_header="$t('dict.player')"
                        :title="$t('questions.top_scorer')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPrediction(7)"
                        :table_header="$t('dict.player')"
                        :title="$t('questions.top_assist')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPredictionGrouped(1)"
                        :table_header="$t('dict.amount')"
                        :title="$t('questions.goals_amount')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPredictionGrouped(2)"
                        :table_header="$t('dict.amount')"
                        :title="$t('questions.cards_amount')"/>
                </div>
            </div>
        </main>
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">{{ $t('stats.nl_predictions') }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-3 py-md-5">
            <NotStarted v-if="!started"/>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPrediction(7)"
                        :table_header="$t('dict.player')"
                        :title="$t('questions.first_goal_nl')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="tournament.getBonusPrediction(8)"
                        :table_header="$t('dict.player')"
                        :title="$t('questions.first_card_nl')"/>
                </div>
                <div class="col-md-4">
                    <PredictionTableCard
                        :image="false"
                        :list="prediction_ned"
                        :table_header="$t('dict.round')"
                        :title="$t('questions.nl_result')"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.js";
import NumberCounter from "@/components/NumberCounter.vue";
import PredictionTableCard from "@/components/PredictionTableCard.vue";
import {computed} from "vue";
import TopTable from "@/components/TopTable.vue";
import NotStarted from "@/components/NotStarted.vue";
import {capitalize} from "../helpers/magic.ts";

const tournament = useTournament();
const {
    playedMatches,
    prediction_ned,
} = storeToRefs(tournament)


const started = computed(() => {
    return playedMatches.value.length
})

const total_cards = computed(() => {
    return tournament.totalCards.red + tournament.totalCards.yellow;
})

</script>

<style lang="sass" scoped></style>
