<template>
    <div id="statistieken-view">
        <header class="bg-wk26-darkblue py-3 py-md-5">
            <div class="container">
                <div class="row g-3">
                    <div class="col-12">
                        <h1 class="text-white w26-condensed fw-bolder mb-0">Toernooi statistieken</h1>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4">
                            <h2 class="fs-5">Goals</h2>
                            <div class="num-stat-item">
                                <div class="fs-1 fw-bold">
                                    <NumberCounter
                                        :number="tournament.totalGoals"/>
                                </div>
                                <div class="fw-lighter">Totale goals</div>
                            </div>
                            <hr>
                            <div class="d-flex gap-4">
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageGoalsPerMatch }}
                                    </div>
                                    <div class="fw-lighter">Goals per wedstrijd</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageGoalsPerMatch * tournament.matches.length }}
                                    </div>
                                    <div class="fw-lighter">Goals verwacht</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4">
                            <h2 class="fs-5">Kaarten</h2>
                            <div class="num-stat-item">
                                <div class="fs-1 fw-bold">
                                    <NumberCounter
                                        :number="total_cards"/>
                                </div>
                                <div class="fw-lighter">Totale kaarten</div>
                            </div>
                            <hr>
                            <div class="d-flex gap-4">
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageCardsPerMatch }}
                                    </div>
                                    <div class="fw-lighter">Kaarten per wedstrijd</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.averageCardsPerMatch * tournament.matches.length }}
                                    </div>
                                    <div class="fw-lighter">Kaarten verwacht</div>
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
                    <h2 class="w26-condensed">Team statistieken</h2>
                </div>
                <!-- meeste tegengoals -->
                <div class="col-md-4">
                    <TopTable
                        key="goals_against"
                        :list="tournament.goalsAgainstRanking"
                        title="Goals tegen"/>
                </div>
                <!-- meeste kaarten -->
                <div class="col-md-4">
                    <TopTable
                        key="total_cards"
                        :list="tournament.totalCardsPerTeam"
                        title="Meeste kaarten"/>
                </div>
            </div>
            <div class="row g-3 mb-3">
                <div class="col-12">
                    <h2 class="w26-condensed">Speler statistieken</h2>
                </div>
                <!-- top scorer -->
                <div class="col-md-4">
                    <TopTable
                        key="top_scorer"
                        :list="tournament.topScorers"
                        title="Top scorer"/>
                </div>
                <!-- meest assist -->
                <div class="col-md-4">
                    <TopTable
                        key="top_assist"
                        :list="tournament.topAssist"
                        title="Top assist"/>
                </div>
            </div>
        </main>
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">Wat denken we?</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-3 py-md-5">
            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
            </div>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <PredictionTable
                        :list="tournament.getBonusPrediction(0)"
                        title="Wie wordt kampioen?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :list="tournament.getBonusPrediction(3)"
                        title="Meeste tegengoals?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :list="tournament.getBonusPrediction(4)"
                        title="Meeste kaarten?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(5)"
                        table_header="Speler"
                        title="Wie wordt top scorer?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(7)"
                        table_header="Speler"
                        title="Wie wordt assist koning?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(1)"
                        table_header="Aantal"
                        title="Hoe goals worden er gescoord?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(2)"
                        table_header="Aantal"
                        title="Hoe kaarten worden er gegeven?"/>
                </div>
            </div>
        </main>
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">Hoe gaat NL het doen?</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-3 py-md-5">
            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
            </div>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(7)"
                        table_header="Speler"
                        title="Eerste goal Team NL?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="tournament.getBonusPrediction(8)"
                        table_header="Speler"
                        title="Eerste kaart Team NL?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="prediction_ned"
                        table_header="Ronde"
                        title="Hoe ver komt NL?"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="pred_pol_ned"
                        table_header="Score"
                        title="Poland - Netherlands"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="pred_ned_fra"
                        table_header="Score"
                        title="Netherlands - France"/>
                </div>
                <div class="col-md-4">
                    <PredictionTable
                        :image="false"
                        :list="pred_ned_aus"
                        table_header="Score"
                        title="Netherlands - Austria"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.js";
import NumberCounter from "@/components/NumberCounter.vue";
import PredictionTable from "@/components/PredictionTable.vue";
import {computed} from "vue";
import TopTable from "@/components/TopTable.vue";

const tournament = useTournament();
const {
    playedMatches,
    prediction_ned,
} = storeToRefs(tournament)


const started = computed(() => {
    return playedMatches.value.length
})

const pred_pol_ned = computed(() => {
    return tournament.getGroupedMatchPrediction(1);
})

const pred_ned_fra = computed(() => {
    return tournament.getGroupedMatchPrediction(1);
})

const pred_ned_aus = computed(() => {
    return tournament.getGroupedMatchPrediction(1);
})

const total_cards = computed(() => {
    return tournament.totalCards.red + tournament.totalCards.yellow;
})

</script>

<style lang="sass" scoped></style>
