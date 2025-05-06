<template>
    <div id="deelnemers-view">
        <PlayerHeader
            v-if="participant"
            :participant="participant" />
        <main v-if="participant" class="container-md py-5">
            <RouterLink :to="{name: 'ranking'}">
                <button class="btn-wc26 sm btn-wc26-orange-alt w-fit mb-4">
                    {{ $t('cta.to_rankings') }}
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
import {capitalize} from "../helpers/magic.ts";
import PlayerHeader from "@/components/PlayerHeader.vue";

const route = useRoute();

const tournament = useTournament();

const participant: Ref<Player | null | undefined> = ref(null);

onBeforeMount(() => {
    let id = route.params.id as string;
    participant.value = tournament.getParticipant(id.replace(/-/g, ' ') as string);
})

onBeforeRouteUpdate((to, from) => {
    let id = route.params.id as string;
    if (!tournament.getParticipant(id.replace(/-/g, ' ') as string)) router.push({name: '404'})
    else participant.value = tournament.getParticipant(to.params.id as string);
})
</script>

<style lang="sass" scoped></style>
