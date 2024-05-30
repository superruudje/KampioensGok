<template>
    <div class="d-flex flex-column align-items-center">
        <span :class="{'text-decoration-line-through': played}">{{ localeDate }}</span>
        <hr class="mt-1 w-100">
        <match-prediction v-for="(match) in match_day.matches" :played="played" :name="name" :match="match" class="mb-3"/>
    </div>
</template>

<script setup>
import MatchPrediction from "@/components/MatchPrediction.vue";
import {computed} from "vue";

const props = defineProps({
    match_day: {type: Object, required: true},
    name: {type: String, required: true},
    played: {type: Boolean, required: false, default: false},
})

const localeDate = computed(() => {
    const dateParts = props.match_day.date.split("-");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return date ? new Date(date).toLocaleString('nl-NL', {
        weekday: 'short',
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : '-'
})


</script>

<style lang="sass" scoped></style>