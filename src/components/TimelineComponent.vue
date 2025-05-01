<template>
    <div class="position-relative d-flex flex-column align-items-center gap-3">
        <span class="position-absolute h-100 d-inline-block line"></span>
        <div v-for="e in ordered_timeline"
             class="position-relative z-1 d-flex justify-content-around align-items-center w-100">
            <div class="time-line text-end">
                <template v-if="e.team === teams[0]">
                    <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                    <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                    <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                </template>
                <span v-else class="text-black-50">{{ e.minute }}'</span>
            </div>
            <div class="mx-3 text-center icon bg-white">
                <FontAwesomeIcon v-if="e.type === 'goal'" :icon="faSoccerBall"/>
                <FontAwesomeIcon v-else-if="e.type === 'substitution'" :icon="faArrowsTurnToDots"/>
                <FontAwesomeIcon v-else :class="{'text-yellow' : e.type === 'yellow_card', 'text-red' : e.type === 'red_card'}"
                                 :icon="faMobile"/>
            </div>
            <div class="time-line">
                <template v-if="e.team === teams[1]">
                    <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                    <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                    <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                </template>
                <span v-else class="text-black-50">{{ e.minute }}'</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {faSoccerBall} from "@fortawesome/free-regular-svg-icons";
import {faMobile, faArrowsTurnToDots} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import type {MatchEvent} from "@/types/tournament.ts";

const props = defineProps<{
    teams: string[],
    timeline: MatchEvent[]
}>()

const ordered_timeline = computed(() => {
    return props.timeline ? props.timeline.sort((a, b) => a.minute - b.minute) : []
})
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
</style>