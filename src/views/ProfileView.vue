<template>
    <div id="deelnemers-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">Mijn voorspellingen</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">{{ participant?.name || 'Wie ben je? ' }}</h2>
                    </div>
                </div>
            </div>
        </header>
        <main v-if="!profileSet" class="container-md py-2 py-md-5">
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body p-4">
                            <h2 class="mb-3 txt-blue fw-bolder">Snelkoppeling</h2>
                            <p>Door de website te laten weten wie je bent, kun je een persoonlijke snelkoppeling maken.
                                Met deze snelkoppeling krijg je snel toegang tot je eigen pagina met voorspellingen. Dit
                                is handig als je snel wilt controleren wat je voorspeld hebt.</p>
                            <div class="mb-3">
                                <label class="form-label">Wie ben je?</label>
                                <select v-model="team" class="form-select">
                                    <option :value="null">Kies een speler</option>
                                    <option v-for="(player, idx) in sortedPlayers" :value="player.team_name">
                                        {{ player.team_name }}
                                    </option>
                                </select>
                            </div>
                            <button :disabled="!team" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                    @click="selectProfile">Opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <main v-else class="container-md py-2 py-md-5">
            <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 mb-3"
                    type="button" @click="tournament.unsetProfile()">Wijzig snelkoppeling
            </button>
            <player-page :participant="participant"></player-page>
        </main>
    </div>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import PlayerPage from "@/components/PlayerPage.vue";

const tournament = useTournament();
const {
    players, profile
} = storeToRefs(tournament)

const participant = ref(null);
const team = ref(null);

/**
 * Select profile
 */
function selectProfile() {
    tournament.setProfile(team.value)
    team.value = null
    initialize()
}

function initialize() {
    if (profile.value)
        participant.value = tournament.getParticipant(profile.value)
}

onBeforeMount(() => {
    initialize()
})

const profileSet = computed(() => {
    return !!profile.value
})

/**
 * Sorted list of players
 * @type {ComputedRef<*[]>}
 */
const sortedPlayers = computed(() => {
    return [...players.value].sort((a, b) => a.team_name.localeCompare(b.team_name));
})
</script>

<style lang="sass" scoped></style>
