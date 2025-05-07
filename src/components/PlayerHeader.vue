<template>
    <header class="bg-wk26-darkblue py-3 py-md-5">
        <div class="container">
            <div class="row g-3">
                <div class="col-12">
                    <h1 class="text-white w26-condensed fw-bolder mb-4">{{ player.team_name }}</h1>
                </div>
                <div class="col-md-6">
                    <div class="text-light bg-mix rounded-4 p-4">
                        <h2 class="fs-5 text-capitalize">{{ $t('dict.points') }}</h2>
                        <div class="num-stat-item">
                            <div class="fs-1 fw-bold">
                                <NumberCounter
                                    :number="tournament.getParticipantTotalScore(player.team_name, null)"/>
                            </div>
                            <div class="fw-lighter">{{ capitalize($t('dict.total')) }} {{ $t('dict.points') }}</div>
                        </div>
                        <hr>
                        <div class="d-flex gap-4">
                            <div class="num-stat-item">
                                <div class="fs-4 fw-bold">
                                    {{ tournament.getParticipantScoreMatches(player.team_name) }}
                                </div>
                                <div class="fw-lighter">{{ $t('menu.matches') }}</div>
                            </div>
                            <div class="num-stat-item">
                                <div class="fs-4 fw-bold">
                                    {{ tournament.getParticipantScoreKnockOut(player.team_name) }}
                                </div>
                                <div class="fw-lighter">Knock-out</div>
                            </div>
                            <div class="num-stat-item">
                                <div class="fs-4 fw-bold">
                                    {{ tournament.getParticipantScoreBonus(player.team_name) }}
                                </div>
                                <div class="fw-lighter">{{ capitalize($t('dict.bonus_questions')) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="text-light bg-mix rounded-4 p-4 h-100 d-flex flex-column">
                        <h2 class="fs-5 text-capitalize">{{ $t('dict.position') }}</h2>
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
</template>

<script setup lang="ts">

import {capitalize} from "@/helpers/magic.ts";
import NumberCounter from "@/components/NumberCounter.vue";
import FloatingStars from "@/components/floatingStars.vue";
import type {Player} from "@/types/pool.ts";
import {useTournament} from "@/stores/content.ts";
import {computed} from "vue";

const tournament = useTournament();

const props = defineProps<{
    player: Player
}>()

const playerPos = computed(() => {
    return props.player ? tournament.getPlayerStanding(props.player.team_name) as number : 0
})
</script>

<style scoped lang="sass">

</style>