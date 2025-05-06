<template>
    <div id="poule-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">{{ $t('dict.group', 2) }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-lg py-3 py-md-5">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-column gap-3">
                        <div
                            v-for="poule in poules"
                            class="card rounded-4">
                            <div class="card-body p-0">
                                <div class="p-3 p-md-4">
                                    <h3 class="fw-bolder w26-condensed mb-3">{{ $t('dict.group', 1) }} {{ poule.name }}</h3>
                                    <div class="w-100 overflow-hidden overflow-x-auto mb-2">
                                        <table class="table align-middle">
                                            <thead>
                                            <tr class="text-center text-capitalize">
                                                <th class="txt-orange" scope="col"></th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.played') }}</th>
                                                <th class="txt-orange d-sm-none" scope="col">G</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.won') }}</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.drawn') }}</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.lost') }}</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.for') }}</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.against') }}</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{
                                                        $t('dict.goal_difference')
                                                    }}
                                                </th>
                                                <th class="txt-orange d-sm-none" scope="col">+/-</th>
                                                <th class="txt-orange d-none d-sm-table-cell" scope="col">{{ $t('dict.points') }}</th>
                                                <th class="txt-orange d-sm-none" scope="col">{{ $t('dict.points_abbr') }}</th>
                                                <th class="txt-orange" scope="col">{{ $t('dict.form_guide') }}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(t, idx) in poule.teams" class="text-center">
                                                <td class="text-nowrap text-start d-flex align-items-center">
                                                    <span class="me-2">{{ idx + 1 }}</span>
                                                    <img :src="getImage(t.team)" alt="team logo" class="border" loading="lazy" width="32px">
                                                    <span class="ms-2 txt-blue fw-bold">{{ t.team }}</span>
                                                </td>
                                                <td>{{ t.matches.length }}</td>
                                                <td class="d-none d-sm-table-cell">{{ t.matches.filter(g => g === "W").length }}</td>
                                                <td class="d-none d-sm-table-cell">{{ t.matches.filter(g => g === "D").length }}</td>
                                                <td class="d-none d-sm-table-cell">{{ t.matches.filter(g => g === "L").length }}</td>
                                                <td class="d-none d-sm-table-cell">{{ t.for }}</td>
                                                <td class="d-none d-sm-table-cell">{{ t.against }}</td>
                                                <td>{{ t.for - t.against }}</td>
                                                <td class="fw-bold">{{ t.points }}</td>
                                                <td>
                                                    <div class="d-flex justify-content-center gap-1">
                                                        <template v-for="i in 3">
                                                        <span v-if="t.matches[i - 1] === 'W'"
                                                              class="form-item bg-success rounded-circle">W</span>
                                                            <span v-else-if="t.matches[i - 1] === 'L'"
                                                                  class="form-item bg-danger rounded-circle">L</span>
                                                            <span v-else-if="t.matches[i - 1] === 'D'"
                                                                  class="form-item bg-secondary rounded-circle">D</span>
                                                            <span v-else class="form-item border rounded-circle"></span>
                                                        </template>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <button
                                        class="dropdown-toggle btn-wc26 btn-wc26-orange w-fit"
                                        @click="openPouleDetails(poule.name)">
                                        {{ $t('cta.view_details') }}
                                    </button>
                                </div>

                                <div v-if="openPoule === poule.name" class="border-top p-3 p-md-4 bg-body-tertiary rounded-bottom-4">
                                    <div class="d-flex flex-column gap-3">
                                        <MatchDayComponent
                                            v-for="match_day in tournament.matchesForPoule(poule.name)"
                                            :match_day="match_day"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.js";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {type Ref, ref} from "vue";
import type {Poule} from "@/types/tournament.ts";

const tournament = useTournament();
const {teamImages} = storeToRefs(tournament)
const openPoule: Ref<string | null> = ref(null);

const poules: Poule[] = tournament.getPoules();

/**
 * Return team image
 * @param teamName
 */
function getImage(teamName: string) {
    return teamImages.value[teamName] || teamImages.value[`default`]
}

/**
 * Toggle poule details.
 * @param poule
 */
function openPouleDetails(poule: string) {
    openPoule.value = openPoule.value === poule ? null : poule
}

</script>

<style lang="sass" scoped>
.form-item
    color: #fff
    font-size: 9px
    display: flex
    align-items: center
    justify-content: center
    width: 18px
    height: 18px

tr
    td
        padding-top: 12px
        padding-bottom: 12px

    th
        font-size: 12px
</style>
