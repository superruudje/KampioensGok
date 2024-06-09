<template>
    <div class="match mb-4">
        <h5 class="txt-blue fst-italic mb-4 text-capitalize">{{ localeDate }}</h5>
        <div class="row gx-3 gy-5">
            <div :class="full_width ? 'col-12' : 'col-lg-6'" v-for="(match) in matches">
                <match-component :match="match"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import MatchComponent from "@/components/MatchComponent.vue";
import {computed} from "vue";

const props = defineProps({
    match_day: {type: String, required: true},
    matches: {type: Array, required: true},
    full_width: {type: Boolean, default: false},
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

<style scoped lang="sass">

</style>