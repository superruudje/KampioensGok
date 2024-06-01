<template>
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
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="mb-3 txt-blue fw-bolder">Meeste kaarten</h3>
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="txt-orange" scope="col">Land</th>
                                <th class="txt-orange" scope="col">Kaarten</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(team, idx) in groupedTeamCards.slice(0, 5)">
                                <td>
                                    <img :src="getImage(team.id)" alt="" loading="lazy" width="30px">
                                    <span class="ms-2 txt-blue fw-bold">{{ getTeamName(team.id) }}</span>
                                </td>
                                <td>{{ team.count }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="mb-3 txt-blue fw-bolder">Top scorers</h3>
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="txt-orange" scope="col">Speler</th>
                                <th class="txt-orange" scope="col">Goals</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(goal, idx) in groupedTopScorer.slice(0, 5)">
                                <td>
                                    <img :src="getImage(goal.team)" alt="" loading="lazy" width="30px">
                                    <span class="ms-2 txt-blue fw-bold">{{ goal.player }}</span>
                                </td>
                                <td>{{ goal.count }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card border-0 rounded-0 shadow-sm mt-3">
                    <div
                        class="card-body position-relative d-flex flex-column align-items-center justify-content-center p-3 p-md-4">
                                        <span class="txt-orange fw-bold" style="font-size: 5rem">
                                            <number-counter :number="totalGoals"></number-counter>
                                        </span>
                        <span class="txt-blue fw-bold">Goals gescoord</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <h3 class="mb-3 txt-blue fw-bolder">Meeste tegengoals</h3>
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="txt-orange" scope="col">Speler</th>
                                <th class="txt-orange" scope="col">Goals</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(team, idx) in groupedGoalsAgainst.slice(0, 5)">
                                <td>
                                    <img :src="getImage(team.id)" alt="" loading="lazy" width="30px">
                                    <span class="ms-2 txt-blue fw-bold">{{ getTeamName(team.id) }}</span>
                                </td>
                                <td>{{ team.count }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card border-0 rounded-0 shadow-sm mt-3">
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
        <div class="row g-3 mb-3">
            <div class="col-md-4">
                <prediction-table class="mb-3" :list="prediction_tournament_champion" title="Wie wordt kampioen?"/>
                <prediction-table class="mb-3" :list="prediction_top_scorer" title="Wie wordt top scorer?"/>
                <prediction-table :list="prediction_first_card_nl" title="Eerste kaart Team NL?"/>
            </div>
            <div class="col-md-4">
                <prediction-table class="mb-3" :list="prediction_most_against" title="Meeste tegengoals?"/>
                <prediction-table :list="prediction_top_assist" title="Wie wordt assist koning?"/>
            </div>
            <div class="col-md-4">
                <prediction-table class="mb-3" :list="prediction_most_cards" title="Meeste kaarten?"/>
                <prediction-table :list="prediction_first_goal_nl" title="Eerste goal Team NL?"/>
            </div>
        </div>
    </main>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import NumberCounter from "@/components/NumberCounter.vue";
import PredictionTable from "@/components/PredictionTable.vue";

const tournament = useTournament();
const {
    teamImages,
    teams,
    prediction_tournament_champion,
    prediction_most_against,
    prediction_most_cards,
    prediction_first_goal_nl,
    prediction_first_card_nl,
    prediction_top_scorer,
    prediction_top_assist,
    totalGoals,
    totalCards,
    groupedTeamCards,
    groupedTopScorer,
    groupedGoalsAgainst
} = storeToRefs(tournament)

/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name) {
    return teamImages.value[name] || teamImages.value[`default`]
}

/**
 * Return team name
 * @param id
 * @returns {*}
 */
function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

</script>

<style lang="sass" scoped></style>
