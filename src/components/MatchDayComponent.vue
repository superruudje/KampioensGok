<template>
    <div :id="'day_' + match_day" class="match mb-5">
        <h5 class="txt-blue mb-4 text-capitalize">{{ localeDate }}</h5>
        <div class="row g-3">
            <div class="col-12 col-xl-6 col-xxl-4" v-for="(match) in matches">
<!--                <match-component :match="match"/>-->
                <match-component-new :match="match"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import MatchComponent from "@/components/MatchComponent.vue";
import {computed, onMounted} from "vue";
import MatchComponentNew from "@/components/MatchComponentNew.vue";

const props = defineProps({
    match_day: {type: String, required: true},
    matches: {type: Array, required: true},
    full_width: {type: Boolean, default: false},
})

const localeDate = computed(() => {
    const dateParts = props.match_day.split("-");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return date ? new Date(date).toLocaleString('nl-NL', {
        weekday: 'long',
        day: "2-digit",
        month: "long",
        year: "numeric"
    }) : '-'
})
</script>

<style scoped lang="sass">

</style>