<template>
    <div class="position-relative d-flex flex-column align-items-center gap-3">
        <span class="position-absolute h-100 d-inline-block line"></span>
        <div v-for="e in ordered_timeline"
             class="position-relative z-1 d-flex justify-content-around align-items-center w-100">
            <div class="time-line text-end">
                <span v-if="e.team === teams[0]" class="txt-blue fw-semibold">{{ e.player }}</span>
                <span v-else class="text-black-50">{{ e.minute }}'</span>
            </div>
            <div class="mx-3 text-center icon bg-gray">
                <FontAwesomeIcon v-if="e.type === 'assist'" :icon="faHandshakeAngle"/>
                <FontAwesomeIcon v-else-if="e.type === 'goal'" :icon="faSoccerBall"/>
                <FontAwesomeIcon v-else :class="{'text-warning' : e.type === 'yellow', 'text-danger' : e.type === 'red'}"
                                 :icon="faMobile"/>
            </div>
            <div class="time-line">
                <span v-if="e.team === teams[1]" class="txt-blue fw-semibold">{{ e.player }}</span>
                <span v-else class="text-black-50">{{ e.minute }}'</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue";
import {faSoccerBall} from "@fortawesome/free-regular-svg-icons";
import {faMobile} from "@fortawesome/free-solid-svg-icons";
import {faHandshakeAngle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
    teams: {type: Array, required: true},
    timeline: {type: Object, required: true},
})

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
    border-color: black
    border-top-width: 0
    border-bottom-width: 0
    border-left-width: 0
    border-right-width: 2px
    border-style: dotted
</style>