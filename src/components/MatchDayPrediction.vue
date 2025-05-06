<template>
    <div id="accordionExample" class="accordion">
        <div v-if="matchDay" class="accordion-item border-0">
            <h2 class="accordion-header">
                <button
                    :id="`${match_day.matchDayDate}`"
                    :aria-controls="'matchday_' + match_day.matchDayId"
                    :data-bs-target="'#matchday_' + match_day.matchDayId"
                    aria-expanded="false"
                    class="accordion-button p-2 txt-pk-elevation-01 text-capitalize collapsed d-flex gap-2 align-items-center"
                    data-bs-toggle="collapse"
                    type="button">
                    {{ localeDate }}
                    <span
                        :class="{'text-decoration-line-through': played}"
                        class="badge ms-auto fs-9 bg-26-interaction txt-pk-elevation-01">{{ matchDay.type.replaceAll('_', ' ') }}</span>
                </button>
            </h2>
            <div :id="'matchday_' + match_day.matchDayId" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body px-0">
                    <div class="d-flex flex-column gap-3">
                        <div v-for="(match) in matches">
                            <MatchPrediction
                                :isKnockout="matchDay.stage === 'knockout'"
                                :match="match"
                                :match-day-type="matchDay.type"
                                :teamName="team_name"
                                :played="played"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MatchPrediction from "@/components/MatchPrediction.vue";
import {computed, onMounted} from "vue";
import type {MatchesByDay} from "@/types/tournament.js";
//@ts-ignore
import moment from "moment/dist/moment.js";
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();

import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";

const tournament = useTournament();
const {first5UnplayedMatches} = storeToRefs(tournament);

const props = defineProps<{
    match_day: MatchesByDay,
    team_name: string,
    played?: boolean
}>()

const matches = computed(() => props.match_day.matches)

const localeDate = computed(() => {
    moment.updateLocale(locale.value);
    return moment(props.match_day.matchDayDate, "DD-MM-YYYY").format("dddd D MMMM");
})

const matchDay = computed(() => {
    return tournament.matchDay(props.match_day.matchDayId);
})

const upcomingMatchDay = computed(() => {
    return first5UnplayedMatches.value[0]?.matchDayDate || null;
})

onMounted(() => {
    if(upcomingMatchDay.value) {
        const date_element = document.getElementById(upcomingMatchDay.value)
        if(date_element) {
            date_element.click();
        }
    }
})

</script>

<style lang="sass" scoped>
.accordion
    --bs-accordion-btn-focus-box-shadow: 0

.match-group
    transform: skew(-8deg)

.accordion-button:not(.collapsed)
    background-color: transparent !important
    box-shadow: none
.accordion-button::after
    margin-left: 0
</style>