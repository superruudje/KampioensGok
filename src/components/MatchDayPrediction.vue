<template>
    <div class="d-flex flex-column align-items-center">
        <span class="text-capitalize" :class="{'text-decoration-line-through': played}">{{ localeDate }}</span>
        <div v-if="label.length > 1" class="match-group bg-blue text-light px-3 py-1">{{label}}</div>
        <hr class="mt-1 w-100">
        <match-prediction v-for="(match) in matches" :knockout="label.length > 1" :played="played" :name="name" :match="match" class="mb-3"/>
    </div>
</template>

<script setup>
import MatchPrediction from "@/components/MatchPrediction.vue";
import {computed} from "vue";

const props = defineProps({
    match_day: {type: String, required: true},
    matches: {type: Array, required: true},
    name: {type: String, required: true},
    played: {type: Boolean, required: false, default: false},
})

const label = computed(() => {
    return props.matches.length ? props.matches[0].group : '-'
})

const localeDate = computed(() => {
    const dateParts = props.match_day.split("-");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return date ? new Date(date).toLocaleString('nl-NL', {
        weekday: 'short',
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : '-'
})


</script>

<style lang="sass" scoped>
.match-group
    transform: skew(-8deg)
</style>