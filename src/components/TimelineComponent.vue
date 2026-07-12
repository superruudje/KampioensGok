<template>
    <div class="d-flex justify-content-around align-items-center w-100 mb-3">
        <div class="time-line text-end">
            <img :alt="teams[0]" :src="getTeamImage(teams[0])" class="team-flag border">
        </div>
        <div class="mx-3 icon">
            <div class="d-flex align-items-center fs-4">
                <template v-if="displayResult.showPenalties">
                    <span class="fs-7">({{ displayResult.team1Penalties }})</span>
                    <span class="mx-1">{{ displayResult.score1 }} - {{ displayResult.score2 }}</span>
                    <span class="fs-7">({{ displayResult.team2Penalties }})</span>
                </template>
                <template v-else>
                    <span>{{ displayResult.score1 }}</span>-
                    <span>{{ displayResult.score2 }}</span>
                </template>
            </div>
        </div>
        <div class="time-line">
            <img :alt="teams[1]" :src="getTeamImage(teams[1])" class="team-flag border">
        </div>
    </div>

    <div class="position-relative d-flex flex-column align-items-center gap-3">
        <span class="position-absolute h-100 d-inline-block line"></span>

        <WhistleEvent label="Full Time" type="full_time"/>

        <div
            v-for="e in ordered_timeline"
            :key="`${e.minute}-${e.extraMinute ?? 0}-${e.kind}`"
            class="position-relative z-1 d-flex justify-content-around align-items-baseline w-100"
        >
            <template v-if="e.kind === 'event'">
                <div class="time-line text-end">
                    <template v-if="e.team === teams[0]">
                        <div class="d-flex gap-1 justify-content-end">
                            <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                            <FontAwesomeIcon v-if="['goal', 'penalty_goal'].includes(e.type)" :icon="faSoccerBall"/>
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
                        <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                        <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                    </template>
                </div>
                <div class="mx-3 text-center bg-white minute">
                    <span v-if="e.type !== 'penalty_goal'" class="text-black small">{{ formatMinute(e) }}</span>
                    <span v-else class="text-black small">PSO</span>
                </div>
                <div class="time-line">
                    <template v-if="e.team === teams[1]">
                        <div class="d-flex gap-1 justify-content-start">
                            <FontAwesomeIcon v-if="['goal', 'penalty_goal'].includes(e.type)" :icon="faSoccerBall"/>
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
                            <span class="txt-blue fw-semibold d-block lh-1">{{ e.player }}</span>
                        </div>
                        <span class="small text-black-50 lh-1">{{ e.assist }}</span>
                        <span v-if="e.note" class="small text-black-50 lh-1">{{ e.note }}</span>
                    </template>
                </div>
            </template>
            <WhistleEvent v-else :label="e.label"/>
        </div>

        <WhistleEvent label="MATCH START"/>
    </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {faSoccerBall} from "@fortawesome/free-regular-svg-icons";
import {faArrowsTurnToDots, faMobile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import type {Match, MatchEvent} from "@/types/tournament.ts";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import WhistleEvent from "@/components/WhistleEvent.vue";

const props = defineProps<{
    teams: string[],
    timeline: MatchEvent[],
    match: Match
}>()

const tournament = useTournament();
const {teamImages} = storeToRefs(tournament);

type MarkerEvent = {
    kind: 'marker',
    label: string,
    minute: number,
    extraMinute?: number,
    sortOrder: number;
}
interface TimeLineEvent extends MatchEvent {
    kind: 'event'
}

type TimelineItem = TimeLineEvent | MarkerEvent;

const ordered_timeline = computed(() => {
    const items: TimelineItem[] = [];

    // Match events
    items.push(
        ...props.timeline.map(e => ({
            ...e,
            kind: 'event'
        } as TimeLineEvent))
    );

    items.push(createMarker('Half Time', 45, 999, 0));
    items.push(createMarker('START SECOND HALF', 45, 999, 1));
    items.push(createMarker('END SECOND HALF', 90, 999, 0));

    if (matchWentToExtraTime.value) {
        items.push(createMarker('START EXTRA TIME FIRST HALF', 90, 999, 1));
        items.push(createMarker('END EXTRA TIME FIRST HALF', 105, 999, 0));
        items.push(createMarker('START EXTRA TIME SECOND HALF', 105, 999, 1));
        items.push(createMarker('END EXTRA TIME SECOND HALF', 120, 999, 0));
    }

    if (wentToPenalties.value) {
        items.push(createMarker('START PENALTY SHOOT-OUT', 120, 999, 1));
        items.push(createMarker('END PENALTY SHOOT-OUT', 999, 999, 0));
    }

    return items.length
        ? items.sort((a, b) => getSortKey(b) - getSortKey(a))
        : [];
});

const matchWentToExtraTime = computed(() =>
    props.match.result_after_extra_time != null
);

const wentToPenalties = computed(() =>
    props.match.result_after_penalties != null
);

const displayResult = computed(() => {
    let result = props.match.result;
    let showPenalties = false;
    let team1Penalties = 0;
    let team2Penalties = 0;

    if (props.match.result_after_penalties) {
        result = props.match.result_after_extra_time;
        showPenalties = true;

        team1Penalties = props.match.result_after_penalties[0];
        team2Penalties = props.match.result_after_penalties[1];
    } else if (props.match.result_after_extra_time) {
        result = props.match.result_after_extra_time;
    }

    const score1 = result?.[0] != null ? result[0] : '?';
    const score2 = result?.[1] != null ? result[1] : '?';

    return {
        score1,
        score2,
        showPenalties,
        team1Penalties,
        team2Penalties
    };
});

function createMarker(label: string, minute: number, extraMinute?: number, sortOrder?: number) {
    return {
        kind: 'marker',
        label,
        minute,
        extraMinute,
        sortOrder
    } as MarkerEvent;
}

function getTeamImage(teamName: string) {
    return teamImages.value[teamName] || teamImages.value[`default`]
}

function getSortKey(item: TimelineItem): number {
    return (
        item.minute * 10000 +
        (item.extraMinute ?? 0) * 10 +
        (item.kind === 'marker' ? item.sortOrder : 0)
    );
}

function formatMinute(event: MatchEvent | MarkerEvent): string {
    return event.extraMinute != null
        ? `${event.minute}+${event.extraMinute}'`
        : `${event.minute}'`;
}
</script>

<style lang="sass" scoped>
.time-line
    flex: 1

.minute
    width: 56px

.line
    border-color: rgba(0, 0, 0, 0.5) !important
    border-top-width: 0
    border-bottom-width: 0
    border-left-width: 0
    border-right-width: 1px
    border-style: dotted

.team-flag
    width: 42px
    object-fit: contain
</style>