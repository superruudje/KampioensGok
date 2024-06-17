<template>
    <div id="deelnemers-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">{{ participant.team_name }}</h1>
                        <h2 class="fs-6 mb-0 txt-orange fw-bolder">{{ participant.name }}</h2>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <router-link :to="{name: 'ranglijst'}" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 mb-3"
                         tag="button" type="button"><i
                class="bi bi-arrow-left me-2"></i>Naar de ranglijst
            </router-link>
            <player-page :participant="participant"></player-page>
        </main>
    </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {useTournament} from "@/stores/content.js";
import router from "@/router/index.js";
import PlayerPage from "@/components/PlayerPage.vue";

const route = useRoute();

const tournament = useTournament();

const participant = ref(null);

onBeforeMount(() => {
    participant.value = tournament.getParticipant(route.params.id)
})

onBeforeRouteUpdate((to, from) => {
    if (!tournament.getParticipant(to.params.id)) router.push({name: '404'})
    else participant.value = tournament.getParticipant(to.params.id)
})
</script>

<style lang="sass" scoped></style>
