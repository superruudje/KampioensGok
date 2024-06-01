<template>
    <main class="container-md py-2 py-md-5">
        <div class="row g-3 mb-3">
            <div class="col-md-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-3 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Meeste kaarten</h2>
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
                        <h2 class="mb-3 txt-blue fw-bolder">Top scorers</h2>
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
                        <h2 class="mb-3 txt-blue fw-bolder">Meeste tegengoals</h2>
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
        <div class="row g-3 mb-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body">
                        <h2 class="mb-3 txt-blue fw-bolder">Wat denken we?</h2>
                        <span class="text-danger fw-bold">TODO: add topscorer, assist, goals NL, card NL.</span>
                        <div class="row">
                            <div class="col-md-4">
                                <prediction-table :list="prediction_tournament_champion" title="Wie wordt kampioen?"/>
                            </div>
                            <div class="col-md-4">
                                <prediction-table :list="prediction_most_against" title="Meeste tegengoals?"/>
                            </div>
                            <div class="col-md-4">
                                <prediction-table :list="prediction_most_cards" title="Meeste kaarten?"/>
                            </div>
                        </div>
                    </div>
                </div>
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
