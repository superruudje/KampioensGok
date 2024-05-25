<template>
    <main class="container py-5">
        <div class="row">
            <div class="col-4">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Pool stand</h2>
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="txt-orange" scope="col">#</th>
                                <th class="txt-orange" scope="col">Speler</th>
                                <th class="txt-orange" scope="col">P</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(player, idx) in standing">
                                <th v-if="idx > 0" scope="row">{{ player.score === standing[idx - 1].score ? '-' : idx + 1 }}</th>
                                <th v-else scope="row">{{ idx + 1 }}</th>
                                <td>{{ player.name }}</td>
                                <td>{{ player.score }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Programma</h2>
                        <div class="matches-wrapper">
                            <div class="match mb-4" v-for="(match_day, idx) in schema" :key="idx">
                                <h5 class="txt-blue fst-italic mb-3">{{ match_day.date }}</h5>
                                <div class="card bg-gray border-0 rounded-0 mb-5" v-for="(match) in match_day.matches">
                                    <div class="card-body position-relative p-4 pt-5">
                                        <div class="match-group position-absolute top-0 start-50 bg-blue text-light px-3 py-1">Groep {{ match.group }}</div>
                                        <div class="d-flex justify-content-around">
                                            <div class="team-wrapper">
                                                {{ match.teams[0] }}
                                            </div>
                                            <div>{{ match.time }}</div>
                                            <div class="team-wrapper">
                                                {{ match.teams[1] }}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <span><i class="bi bi-pin-map me-2"></i>{{ match.stadium }}, {{match.city }}</span>
                                            <button class="btn btn-sm btn-primary">Meer<i class="bi bi-chevron-right ms-2"></i></button>
                                        </div>
                                    </div>
                                </div>
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
const tournament = useTournament();
const {schema, standing} = storeToRefs(tournament)
</script>

<style scoped lang="sass">
.match-group
    transform: translate(-50%, -50%) skew(-8deg)
</style>
