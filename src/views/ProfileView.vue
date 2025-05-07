<template>
    <div id="deelnemers-view">
        <header v-if="!player" class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed">Mijn voorspellingen</h1>
                        <h2 class="fs-6 mb-0 txt-orange">Wie ben je?</h2>
                    </div>
                </div>
            </div>
        </header>
        <PlayerHeader
            v-if="player"
            :player="player"
        />
        <main v-if="!player" class="container-lg py-3 py-md-5">
            <div class="row">
                <div class="col-12">
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder w26-condensed mb-3">Snelkoppeling</h3>
                            <p>Door de website te laten weten wie je bent, kun je een persoonlijke snelkoppeling maken.
                                Met deze snelkoppeling krijg je snel toegang tot je eigen pagina met voorspellingen. Dit
                                is handig als je snel wilt controleren wat je voorspeld hebt.</p>
                            <div class="mb-3">
                                <label class="form-label" for="isWho">Wie ben je?</label>
                                <select id="isWho" v-model="team" class="form-select">
                                    <option :value="''">Kies een speler</option>
                                    <option
                                        v-for="player in sortedPlayers"
                                        :value="player.team_name">
                                        {{ player.team_name }}
                                    </option>
                                </select>
                            </div>
                            <button
                                :disabled="!team"
                                class="btn-wc26 btn-wc26-orange-alt w-fit sm"
                                @click="selectProfile">
                                Opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <main v-else class="container-lg py-3 py-md-5">
            <button
                class="btn-wc26 sm btn-wc26-orange-alt w-fit mb-3"
                title="Wijzig snelkoppeling"
                type="button"
                @click="tournament.unsetProfile()">
                {{ $t('cta.shortcut') }}
            </button>
            <PlayerPredictions :player="player"/>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {computed, type ComputedRef, type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import PlayerPredictions from "@/components/PlayerPredictions.vue";
import type {Player} from "@/types/pool.ts";
import NumberCounter from "@/components/NumberCounter.vue";
import FloatingStars from "@/components/floatingStars.vue";
import PlayerHeader from "@/components/PlayerHeader.vue";

const tournament = useTournament();
const {
    players, profile
} = storeToRefs(tournament)

const team: Ref<string> = ref('');

/**
 * Select profile
 */
function selectProfile() {
    tournament.setProfile(team.value);
    team.value = '';
}

const player = computed(() => {
    return profile.value ? players.value.find(item => item.team_name === profile.value) : undefined
})

/**
 * Sorted list of players
 * @type {ComputedRef<*[]>}
 */
const sortedPlayers: ComputedRef<Player[]> = computed(() => {
    return [...players.value].sort((a, b) => a.team_name.localeCompare(b.team_name));
})

</script>

<style lang="sass" scoped></style>
