<template>
    <div id="uitslagen-view">
        <header class="sticky-top bg-blue py-3" style="top: 56px">
            <div class="container">
                <div class="row gy-3 text-light">
                    <div class="col-12">
                        <div class="d-flex justify-content-center align-items-center position-relative">
                            <div class="me-2">
                                <button class="btn btn-sm rounded-pill text-light" type="button"
                                        @click="prev" style="background-color: rgba(255, 255, 255, 0.1);">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                            </div>
                            <div class="flex-grow-1 py-1 swiper">
                                <div id="swiper" class="swiper-wrapper w-100 h-100 d-flex gap-1 position-relative z-1">
                                    <div v-for="i in playDates" :id="'chip_' + i"
                                         class="swiper-slide flex-shrink-0 w-auto h-100 position-relative">
                                        <button :class="{'active' : i === activeChip}"
                                                class="btn btn-sm btn-trans w-100 rounded-pill px-3"
                                                type="button" @click="selectDay(i)">
                                            <span class="text-capitalize">{{ localeDate(i) }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-2">
                                <button class="btn btn-sm rounded-pill text-light" type="button"
                                        @click="next" style="background-color: rgba(255, 255, 255, 0.1);">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="container py-3 py-md-5">
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 bg-transparent">
                        <div class="card-body p-0">
                            <div class="matches-wrapper">
                                <span v-if="!Object.keys(matches_by_day).length">Geen uitslagen bekend. Bekijk <router-link
                                    :to="{name: 'programma'}">hier</router-link> het programma.</span>
                                <match-day-component v-for="(matches, match_day, idx) in matches_by_day"
                                                     :match_day="match_day" :matches="matches"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {computed, onMounted, ref, watch} from "vue";

const tournament = useTournament();
const {matches_by_day, matches_to_play, matches} = storeToRefs(tournament)

const activeChip = ref('')

const playDates = computed(() => {
    const dates = matches.value.map(m => m.date)
    return [...new Set(dates)];
})

const upcomingPlayDay = computed(() => {
    return matches_to_play.value[0].date
})

/**
 * Scroll to previous day
 */
function prev() {
    const idx = playDates.value.findIndex(d => d === activeChip.value)
    if (idx > 0)
        activeChip.value = playDates.value[idx - 1]
}

/**
 * Scroll to next day
 */
function next() {
    const idx = playDates.value.findIndex(d => d === activeChip.value)
    if (idx !== playDates.value.length - 1)
        activeChip.value = playDates.value[idx + 1]
}

function selectDay(day) {
    activeChip.value = day
    document.getElementById('day_' + day).scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
}

function localeDate(d) {
    const dateParts = d.split("-");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return date ? new Date(date).toLocaleString('nl-NL', {
        weekday: 'short',
        day: "2-digit",
        month: "short",
    }) : '-'
}

async function scrollParentToChild() {
    const parent = document.getElementById('swiper')
    const child = document.getElementById('chip_' + activeChip.value)
    let parentWidth = parent.offsetWidth
    const childRect = child.getBoundingClientRect();
    let childWidth = child.offsetWidth

    const to = (childRect.left - childWidth) - (parentWidth / 2)
    parent.scrollLeft += to
}

async function scrollToSection() {
    setTimeout(() => {
        document.getElementById('day_' + activeChip.value).scrollIntoView({block: 'center', inline: 'center'});
    }, 200)
}

watch(activeChip, () => {
    scrollParentToChild()
    scrollToSection()
})

onMounted(() => {
    activeChip.value = upcomingPlayDay.value
})

</script>

<style lang="sass" scoped>
.swiper
    overflow: hidden
    list-style: none

    .swiper-wrapper
        overflow-x: auto
        transition-property: transform
        box-sizing: content-box

        &::-webkit-scrollbar
            display: none

        .swiper-slide
            min-width: 100px
</style>
