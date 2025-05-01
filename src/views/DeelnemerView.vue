<template>
    <div id="deelnemers-view">
        <header v-if="participant" class="bg-wk26-darkblue py-3 py-md-5">
            <div class="container">
                <div class="row g-3">
                    <div class="col-12">
                        <h1 class="text-white w26-condensed fw-bolder mb-4">{{ participant.team_name }}</h1>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4">
                            <h2 class="fs-5">Punten</h2>
                            <div class="num-stat-item">
                                <div class="fs-1 fw-bold">
                                    <NumberCounter
                                        :number="tournament.getParticipantTotalScore(participant.team_name, null)"/>
                                </div>
                                <div class="fw-lighter">Totale punten</div>
                            </div>
                            <hr>
                            <div class="d-flex gap-4">
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.getParticipantScoreMatches(participant.team_name) }}
                                    </div>
                                    <div class="fw-lighter">Wedstrijden</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.getParticipantScoreKnockOut(participant.team_name) }}
                                    </div>
                                    <div class="fw-lighter">Knock-out</div>
                                </div>
                                <div class="num-stat-item">
                                    <div class="fs-4 fw-bold">
                                        {{ tournament.getParticipantScoreBonus(participant.team_name) }}
                                    </div>
                                    <div class="fw-lighter">Bonusvragen</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-light bg-mix rounded-4 p-4 h-100 d-flex flex-column">
                            <h2 class="fs-5">Positie</h2>
                            <div class="flex-grow-1 d-flex justify-content-center align-items-center">
                                <h1 style="font-size: 6rem">
                                    <NumberCounter
                                        :number="playerPos"/>
                                </h1>
                            </div>
                            <FloatingStars
                                v-if="playerPos <= 3"
                                :class="{'txt-gold': playerPos === 1}"
                                class="w-100"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main v-if="participant" class="container-md py-5">
            <RouterLink :to="{name: 'ranglijst'}">
                <button class="btn-wc26 sm btn-wc26-orange-alt w-fit mb-4">
                    <i class="bi bi-arrow-left me-2"></i>Naar de ranglijst
                </button>
            </RouterLink>
            <PlayerPage :player="participant"/>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {computed, onBeforeMount, type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import router from "@/router/index.js";
import PlayerPage from "@/components/PlayerPage.vue";
import NumberCounter from "@/components/NumberCounter.vue";
import FloatingStars from "@/components/floatingStars.vue";
import type {Player} from "@/types/pool.ts";

const route = useRoute();

const tournament = useTournament();

const participant: Ref<Player | null | undefined> = ref(null);

const playerPos = computed(() => {
    return participant.value ? tournament.getPlayerStanding(participant.value.team_name) as number : 0
})

onBeforeMount(() => {
    participant.value = tournament.getParticipant(route.params.id as string);
})

onBeforeRouteUpdate((to, from) => {
    if (!tournament.getParticipant(to.params.id as string)) router.push({name: '404'})
    else participant.value = tournament.getParticipant(to.params.id as string);
})
</script>

<style lang="sass" scoped></style>
