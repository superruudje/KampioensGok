<template>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-md-6" v-for="p in tournament.getPoules()">
                <div  class="card border-0 rounded-0 shadow-sm mb-3 mb-md-5">
                    <div class="card-body p-3 p-md-4">
                        <h2 class="txt-blue fw-bolder">Groep {{ p.poule }}</h2>
                        <div class="w-100 overflow-hidden overflow-x-auto mb-2">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="txt-orange" style="width: 99%" scope="col"></th>
                                    <th class="txt-orange" scope="col">G</th>
                                    <th class="txt-orange" scope="col">W</th>
                                    <th class="txt-orange" scope="col">GL</th>
                                    <th class="txt-orange" scope="col">V</th>
                                    <th class="txt-orange" scope="col">P</th>
                                    <th class="txt-orange" scope="col">+</th>
                                    <th class="txt-orange" scope="col">-</th>
                                    <th class="txt-orange" scope="col">+-</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(t, idx) in p.teams">
                                    <td class="text-nowrap" style="width: 99%">
                                        <span class="me-2">{{ idx + 1 }}</span>
                                        <img :src="getImage(t.team)" alt="" loading="lazy" width="30px">
                                        <span class="ms-2 txt-blue fw-bold">{{ t.team }}</span>
                                    </td>
                                    <td>{{ t.matches.length }}</td>
                                    <td>{{ t.matches.filter(g => g === "W").length }}</td>
                                    <td>{{ t.matches.filter(g => g === "D").length }}</td>
                                    <td>{{ t.matches.filter(g => g === "L").length }}</td>
                                    <th>{{ t.points }}</th>
                                    <td>{{ t.for }}</td>
                                    <td>{{ t.against }}</td>
                                    <td>{{ t.for - t.against }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                @click="openPouleDetails(p.poule)">Groep details<i
                            :class="openPoule === p.poule ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi ms-2"></i>
                        </button>
                        <div v-if="openPoule === p.poule" class="mt-5">
                            <match-day-component v-for="match_day in tournament.matches_by_poule(p.poule)" :full_width="true" :match_day="match_day"></match-day-component>
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
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {ref} from "vue";

const tournament = useTournament();
const {teamImages} = storeToRefs(tournament)
const openPoule = ref(null)

/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name) {
    return teamImages.value[name] || teamImages.value[`default`]
}

/**
 * Toggle poule details
 * @param poule
 */
function openPouleDetails(poule) {
    openPoule.value = openPoule.value === poule ? null : poule
}

</script>

<style lang="sass" scoped>

</style>
