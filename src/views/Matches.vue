<template>
    <div id="uitslagen-view">
        <header class="sticky-top z-3 bg-26-primary py-3">
            <div class="container">
                <div class="row gy-3 text-light">
                    <div class="col-12">
                        <div class="d-flex flex-column">
                            <h1 class="d-none d-md-block w26-condensed">{{ $t('heading.fixtures_results') }}</h1>
                            <div class="d-none d-md-block mb-4">
                                <a
                                    href="/docs/FWC26_Match_Schedule.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button
                                        class="btn-wc26 btn-wc26-orange w-fit">
                                        {{ $t('cta.view_schedule') }}
                                    </button>
                                </a>
                            </div>
                            <div class="d-md-none mb-4">
                                <a
                                    href="/docs/FWC26_Match_Schedule.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button
                                        class="btn-wc26 sm btn-wc26-orange">
                                        {{ $t('cta.view_schedule') }}
                                    </button>
                                </a>
                            </div>
                            <div class="d-flex justify-content-center align-items-center position-relative">
                                <div class="me-2">
                                    <button class="btn btn-sm rounded-pill text-light" style="background-color: rgba(255, 255, 255, 0.1);"
                                            type="button" @click="prev">
                                        <i class="bi bi-chevron-left"></i>
                                    </button>
                                </div>
                                <div class="flex-grow-1 py-1 swiper">
                                    <div id="swiper" class="swiper-wrapper w-100 h-100 d-flex gap-3 position-relative z-1">
                                        <div v-for="date in playDates" :id="'chip_' + date"
                                             class="swiper-slide flex-shrink-0 w-auto h-100 position-relative">
                                            <button :class="{'active' : date === activeChip}"
                                                    class="btn btn-sm btn-trans w-100 rounded-pill px-4 py-2"
                                                    type="button" @click="selectDay(date)">
                                                <span class="text-capitalize">{{ localeDate(date) }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="ms-2">
                                    <button class="btn btn-sm rounded-pill text-light" style="background-color: rgba(255, 255, 255, 0.1);"
                                            type="button" @click="next">
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                </div>
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
                            <div class="d-flex flex-column gap-3">
                                <MatchDayComponent
                                    v-for="matchDay in matchesGroupedByDay"
                                    :match_day="matchDay"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.js";
import MatchDayComponent from "@/components/MatchDayComponent.vue";
import {computed, type ComputedRef, onBeforeMount, ref, watch} from "vue";
import dayjs from 'dayjs';
import {useI18n} from "vue-i18n";

const tournament = useTournament();
const {matchesGroupedByDay} = storeToRefs(tournament)
const {locale} = useI18n();

const activeChip = ref('')

/**
 * Get a list of play dates.
 */
const playDates: ComputedRef<string[]> = computed(() => {
    return [...new Set(tournament.matchesGroupedByDay.map(matchDay => matchDay.matchDayDate))];
})

/**
 * Scroll to previous day
 */
function prev() {
    const idx = playDates.value.findIndex(d => d === activeChip.value)
    if (idx > 0)
        activeChip.value = playDates.value[idx - 1] as string
}

/**
 * Scroll to next day
 */
function next() {
    const idx = playDates.value.findIndex(d => d === activeChip.value)
    if (idx !== playDates.value.length - 1)
        activeChip.value = playDates.value[idx + 1] as string
}

/**
 * Select a day 'chip' and scroll to the matches.
 * @param dateString
 */
function selectDay(dateString: string) {
    activeChip.value = dateString;
    document.getElementById('day_' + dateString)?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
}

/**
 * Return tha date in readable format.
 * @param dateString
 */
function localeDate(dateString: string) {
    dayjs.locale(locale.value);
    return dayjs(dateString).format('dd D MMM');
}

/**
 * Scrol the 'chip' to the center after clicking.
 */
async function scrollParentToChild() {
    const parent = document.getElementById('swiper');
    const child = document.getElementById('chip_' + activeChip.value);

    // Check if a parent or child is null and return early if so
    if (!parent || !child) {
        console.warn('Parent or child element not found');
        return;
    }

    // Get the parent and child dimensions
    const parentWidth = parent.offsetWidth;
    const childRect = child.getBoundingClientRect();
    const childWidth = child.offsetWidth;

    // Calculate the scroll position to center the child in the parent
    const to = (childRect.left - childWidth) - (parentWidth / 2);

    // Smooth scrolling using requestAnimationFrame
    function smoothScroll() {
        if (!parent) return;
        const start = parent.scrollLeft;  // Initial scroll position
        const end = start + to;           // Target scroll position
        const duration = 300;             // Duration of the animation in ms
        let startTime: number | null = null;  // Will hold the start time of the animation

        // This function is called on each frame to update the scroll position
        function scrollStep(timestamp: number) {
            if (!parent) return;
            if (!startTime) startTime = timestamp;  // Set the start time on the first frame

            const progress = timestamp - startTime;  // Calculate the elapsed time since the start
            const distance = end - start;            // Total scroll distance
            const scrollPosition = start + (distance * Math.min(progress / duration, 1));  // Calculate new scroll position

            parent.scrollLeft = scrollPosition;      // Update the scroll position

            if (progress < duration) {
                requestAnimationFrame(scrollStep);  // Continue to the next frame if the animation is not done
            } else {
                parent.scrollLeft = end;           // Ensure the scroll position exactly matches the target
            }
        }

        requestAnimationFrame(scrollStep);  // Start the animation
    }

    smoothScroll();
}

async function scrollToSection() {
    setTimeout(() => {
        document.getElementById('day_' + activeChip.value)?.scrollIntoView({block: 'center', inline: 'center'});
    }, 200)
}

watch(activeChip, () => {
    scrollParentToChild()
    scrollToSection()
})

onBeforeMount(() => {
    activeChip.value = tournament.first5UnplayedMatches[0]?.matchDayDate || '';
})

</script>

<style lang="sass" scoped>
#uitslagen-view
    header
        top: 54px

    @media (min-width: 768px)
        header
            top: 80px
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
