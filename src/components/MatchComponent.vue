<template>
    <div class="card bg-gray border-0 rounded-0">
        <div class="card-body position-relative p-2 p-md-4 pt-4 pt-md-5">
            <div class="match-group position-absolute top-0 start-50 bg-blue text-light px-3 py-1">{{match.group.length > 1 ? match.group : `Groep ${match.group}` }}</div>
            <div class="d-flex justify-content-around align-items-center">
                <div class="team-wrapper">
                    <img loading="lazy" alt="" :src="imageA">
                    <span class="pt-3">{{ getTeamName(match.teams[0]) }}</span>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <span v-if="match.result?.length" class="txt-orange fw-bold">{{ match.time }}</span>
                    <div class="text-black fw-bold fst-italic fs-1">{{ match.result?.length ? `${match.result[0]} : ${match.result[1]}` : match.time }}</div>
                </div>
                <div class="team-wrapper">
                    <img loading="lazy" alt="" :src="imageB">
                    <span class="pt-3">{{ getTeamName(match.teams[1]) }}</span>
                </div>
            </div>
            <div class="d-flex mt-3" v-if="match.timeline?.goals.length">
                <div class="time-line text-end">
                    <span class="d-block" v-for="event in match.timeline?.goals.filter(e => e.team === match.teams[0])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
                <div class="mx-4 text-center" style="width: 20px">
                    <FontAwesomeIcon :icon="faSoccerBall"/>
                </div>
                <div class="time-line">
                    <span v-for="event in match.timeline?.goals.filter(e => e.team === match.teams[1])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
            </div>
            <div class="d-flex" v-if="match.timeline?.cards?.yellow.length">
                <div class="time-line flex-grow-1 text-end">
                    <span class="d-block" v-for="event in match.timeline?.cards?.yellow.filter(e => e.team === match.teams[0])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
                <div class="mx-4 text-center" style="width: 20px">
                    <FontAwesomeIcon :icon="faMobile" class="text-warning"/>
                </div>
                <div class="time-line flex-grow-1">
                    <span class="d-block" v-for="event in match.timeline?.cards?.yellow.filter(e => e.team === match.teams[1])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
            </div>
            <div class="d-flex" v-if="match.timeline?.cards?.red.length">
                <div class="time-line flex-grow-1 text-end">
                    <span class="d-block" v-for="event in match.timeline?.cards?.red.filter(e => e.team === match.teams[0])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
                <div class="mx-4 text-center" style="width: 20px">
                    <FontAwesomeIcon :icon="faMobile" class="text-danger"/>
                </div>
                <div class="time-line flex-grow-1">
                    <span class="d-block" v-for="event in match.timeline?.cards?.red.filter(e => e.team === match.teams[1])">{{ event.player }} <span class="text-black-50">{{ event.minute }}'</span></span>
                </div>
            </div>
            <hr>
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <span class="txt-blue text-wrap"><i class="bi bi-pin-map txt-orange me-2"></i>{{ match.stadium }}, {{match.city }}</span>
                <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3 text-nowrap">Meer<i class="bi bi-chevron-right ms-2"></i></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faSoccerBall } from "@fortawesome/free-regular-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const content = useTournament()
const {teamImages, teams} = storeToRefs(content)

const props = defineProps({
    match: {type: Object, required: true},
})

const imageA = computed(() => {
    return teamImages.value[props.match.teams[0]] || teamImages.value[`default`]
})

const imageB = computed(() => {
    return teamImages.value[props.match.teams[1]] || teamImages.value[`default`]
})

function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}
</script>

<style scoped lang="sass">
.match-group
    transform: translate(-50%, -50%) skew(-8deg)
.team-wrapper
    display: flex
    flex: 1
    flex-direction: column
    justify-content: space-between
    align-items: center
.time-line
    flex: 1
</style>