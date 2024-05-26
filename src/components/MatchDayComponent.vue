<template>
    <div class="match mb-4">
        <h5 class="txt-blue fst-italic mb-3">{{ match_day.date }}</h5>
        <div class="d-flex gap-5 flex-wrap">
            <match-component v-for="(match) in match_day.matches" :match="match"/>
        </div>
    </div>
</template>

<script setup>
import MatchComponent from "@/components/MatchComponent.vue";

defineProps({
    match_day: {type: Object, required: true},
    flex: {type: Boolean, default: false},
})
</script>

<style scoped lang="sass">

</style>