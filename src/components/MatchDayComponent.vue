<template>
    <div :id="'day_' + match_day.matchDayDate">
        <h4 class="txt-blue text-capitalize w26-condensed">{{ label }}</h4>
        <div
            v-if="matchDay"
            class="text-body-secondary mb-2 mb-md-4 w26-condensed">
            {{ matchDay.stage ? `${matchDay.stage} - ` : '' }}{{ matchDay.type.replaceAll('_', ' ') }}
        </div>
        <div class="row g-3">
            <div v-for="(match) in matches" class="col-12 col-lg-6">
                <MatchComponentNew
                    :match="match"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import MatchComponentNew from "@/components/MatchComponentNew.vue";
import type {MatchesByDay} from "@/types/tournament.js";
//@ts-ignore
import moment from "moment/dist/moment.js";

import {useTournament} from "@/stores/content.ts";

const tournament = useTournament();

const props = defineProps<{
    match_day: MatchesByDay
}>()

const matches = computed(() => props.match_day.matches)

const label = computed(() => {
    moment.updateLocale("nl")
    return moment(props.match_day.matchDayDate, "DD-MM-YYYY").format("dddd D MMMM YYYY");
})

const matchDay = computed(() => {
    return tournament.matchDay(props.match_day.matchDayId);
})
</script>

<style lang="sass" scoped>

</style>