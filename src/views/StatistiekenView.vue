<template>
    <div id="statistieken-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">EK 2024</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">De statistieken</h2>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <div class="row g-3 mb-3">
                <!-- meeste tegengoals -->
                <div class="col-md-4">
                    <top-table title="Meeste tegengoals" :list="groupedGoalsAgainst"/>
                </div>
                <!-- meeste kaarten -->
                <div class="col-md-4">
                    <top-table title="Meeste kaarten" :list="groupedTeamCards" :table_header="['Land', 'Kaarten']"/>
                </div>
                <!-- top scorer -->
                <div class="col-md-4">
                    <top-table title="Top scorer" :list="groupedTopScorer" :table_header="['Speler', 'Goals']"/>
                </div>
                <!-- meest assist -->
                <div class="col-md-4">
                    <top-table title="Top assist" :list="groupedAssist" :table_header="['Speler', 'Assists']"/>
                </div>
                <!-- goals -->
                <div class="col-md-4">
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-3 p-md-4">
                                            <span class="txt-orange fw-bold" style="font-size: 5rem">
                                                <number-counter :number="totalGoals"></number-counter>
                                            </span>
                            <span class="txt-blue fw-bold">Goals gescoord</span>
                        </div>
                    </div>
                </div>
                <!-- kaarten gegeven -->
                <div class="col-md-4">
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-3 p-md-4">
                            <span class="txt-orange fw-bold" style="font-size: 5rem">
                                <number-counter :number="totalCards"></number-counter>
                            </span>
                            <span class="txt-blue fw-bold">Kaarten gegeven</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">Wat denken we?</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">De statistieken</h2>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
            </div>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <prediction-table class="mb-3" :list="prediction_tournament_champion" title="Wie wordt kampioen?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table class="mb-3" :list="prediction_most_against" title="Meeste tegengoals?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table class="mb-3" :list="prediction_most_cards" title="Meeste kaarten?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" class="mb-3" :list="prediction_top_scorer" title="Wie wordt top scorer?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="prediction_top_assist" title="Wie wordt assist koning?"/>
                </div>
            </div>
        </main>
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">Hoe gaat NL het doen?</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">De statistieken</h2>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <div v-if="!started" class="bg-orange fw-bolder py-2 px-3 text-white">
                <i class="bi bi-exclamation-circle me-2"></i>Voorspellingen worden bekend gemaakt bij start toernooi.
            </div>
            <div v-else class="row g-3 mb-3">
                <div class="col-md-4">
                    <prediction-table :image="false" :list="prediction_first_goal_nl" title="Eerste goal Team NL?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="prediction_first_card_nl" title="Eerste kaart Team NL?"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="prediction_ned" title="Hoe ver komt NL?" table_header="Score"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="pred_pol_ned" title="Poland - Netherlands" table_header="Score"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="pred_ned_fra" title="Netherlands - France" table_header="Score"/>
                </div>
                <div class="col-md-4">
                    <prediction-table :image="false" :list="pred_ned_aus" title="Netherlands - Austria" table_header="Score"/>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import NumberCounter from "@/components/NumberCounter.vue";
import PredictionTable from "@/components/PredictionTable.vue";
import {computed} from "vue";
import TopTable from "@/components/TopTable.vue";

const tournament = useTournament();
const {
    matches_played,
    prediction_tournament_champion,
    prediction_most_against,
    prediction_most_cards,
    prediction_first_goal_nl,
    prediction_first_card_nl,
    prediction_ned,
    prediction_top_scorer,
    prediction_top_assist,
    totalGoals,
    totalCards,
    groupedTeamCards,
    groupedTopScorer,
    groupedAssist,
    groupedGoalsAgainst
} = storeToRefs(tournament)


const started =  computed(() => {
    return matches_played.value.length
})

const pred_pol_ned = computed(() => {
    return tournament.getGroupMatchPrediction(5)
})

const pred_ned_fra = computed(() => {
    return tournament.getGroupMatchPrediction(21)
})

const pred_ned_aus = computed(() => {
    return tournament.getGroupMatchPrediction(29)
})

</script>

<style lang="sass" scoped></style>
