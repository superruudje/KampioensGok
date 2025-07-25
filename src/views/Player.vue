<template>
    <div id="deelnemers-view">
        <PlayerHeader
            v-if="player"
            :player="player" />
        <main v-if="player" class="container-md py-5">
            <RouterLink :to="{name: 'ranking'}">
                <button class="btn-wc26 sm btn-wc26-orange-alt w-fit mb-4">
                    {{ $t('cta.to_rankings') }}
                </button>
            </RouterLink>
            <PlayerPredictions :player="player"/>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onBeforeMount, type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import router from "@/router/index.js";
import PlayerPredictions from "@/components/PlayerPredictions.vue";
import type {Player} from "@/types/pool.ts";
import PlayerHeader from "@/components/PlayerHeader.vue";

const route = useRoute();

const tournament = useTournament();

const player: Ref<Player | null | undefined> = ref(null);

onBeforeMount(() => {
    let id = route.params.id as string;
    player.value = tournament.getParticipant(id.replace(/\+/g, ' ') as string);
})

onBeforeRouteUpdate((to, from) => {
    let id = route.params.id as string;
    if (!tournament.getParticipant(id.replace(/\+/g, ' ') as string)) router.push({name: '404'})
    else player.value = tournament.getParticipant(to.params.id as string);
})
</script>

<style lang="sass" scoped></style>
