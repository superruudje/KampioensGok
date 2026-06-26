<template>
    <div class="d-flex justify-content-around align-items-center w-100 mb-3">
        <div class="time-line text-end">
            <img :src="getTeamImage(teams[0])" :alt="teams[0]" class="team-flag border">
        </div>
        <div class="mx-3 icon"></div>
        <div class="time-line">
            <img :src="getTeamImage(teams[1])" :alt="teams[1]" class="team-flag border">
        </div>
    </div>

    <div class="position-relative d-flex flex-column align-items-center gap-3">
        <span class="position-absolute h-100 d-inline-block line"></span>

        <div
            v-for="e in ordered_timeline"
            :key="`${e.minute}-${e.extraMinute ?? 0}-${e.player}`"
            class="position-relative z-1 d-flex justify-content-around align-items-center w-100"
        >
            <div class="time-line text-end">
                <template v-if="e.team === teams[0]">
                    <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                    <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                    <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                </template>
                <span v-else class="text-black-50">{{ formatMinute(e) }}</span>
            </div>
            <div class="mx-3 text-center icon bg-white">
                <FontAwesomeIcon v-if="e.type === 'goal'" :icon="faSoccerBall"/>
                <FontAwesomeIcon v-else-if="e.type === 'own_goal'" :icon="faSoccerBall"/>
                <FontAwesomeIcon v-else-if="e.type === 'substitution'" :icon="faArrowsTurnToDots"/>
                <FontAwesomeIcon
                    v-else
                    :class="{
                        'text-yellow' : e.type === 'yellow_card',
                        'text-red' : e.type === 'red_card'
                    }"
                    :icon="faMobile"
                />
            </div>

            <div class="time-line">
                <template v-if="e.team === teams[1]">
                    <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                    <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                    <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                </template>
                <span v-else class="text-black-50">{{ formatMinute(e) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {faSoccerBall} from "@fortawesome/free-regular-svg-icons";
import {faArrowsTurnToDots, faMobile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import type {MatchEvent} from "@/types/tournament.ts";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";

const props = defineProps<{
    teams: string[],
    timeline: MatchEvent[]
}>()

const tournament = useTournament();
const {teamImages} = storeToRefs(tournament);

const ordered_timeline = computed(() => {
    return props.timeline
        ? [...props.timeline].sort((a, b) => getSortMinute(b) - getSortMinute(a))
        : [];
});

function getTeamImage(teamName: string) {
    return teamImages.value[teamName] || teamImages.value[`default`]
}

function getSortMinute(event: MatchEvent): number {
    return event.minute + (event.extraMinute ?? 0) / 100;
}

function formatMinute(event: MatchEvent): string {
    return event.extraMinute != null
        ? `${event.minute}+${event.extraMinute}'`
        : `${event.minute}'`;
}
</script>

<style lang="sass" scoped>
.time-line
    flex: 1

.icon
    width: 24px

.line
    border-color: rgba(0, 0, 0, 0.5) !important
    border-top-width: 0
    border-bottom-width: 0
    border-left-width: 0
    border-right-width: 1px
    border-style: dotted

.team-flag
    width: 48px
    object-fit: contain
</style>