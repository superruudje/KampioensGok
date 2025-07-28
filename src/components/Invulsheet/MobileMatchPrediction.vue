<template>
    <div
        v-if="prediction"
        class="p-3 rounded-4 border">
        <h6 class="text-center mb-3">
            <i
                v-if="!completed"
                class="bi bi-exclamation-circle-fill text-warning me-1"></i>
            <i
                v-if="completed"
                class="bi bi-check-circle-fill text-success me-1"></i>
            Match {{ match.num }} - {{ dateLabel }}
        </h6>
        <div class="row gx-1">
            <div class="col-4 text-center">
                <template v-if="disableTeams">
                    <img
                        :src="getImagePred(0)"
                        alt="teamA"
                        class="border mb-2"
                        loading="lazy"
                        style="max-width: 60px">
                    <div class="fs-7">{{ prediction.teams?.[0] ? $t('countries.' + prediction.teams?.[0]) : match.teams[0] }}</div>
                </template>
                <template v-else>
                    <label :for="match.num + '_team1'" class="d-block cursor-pointer">
                        <img
                            :src="getImagePred(0)"
                            alt="teamA"
                            class="border mb-2"
                            loading="lazy"
                            style="max-width: 60px">
                    </label>

                    <select
                        :id="match.num + '_team1'"
                        :disabled="disableTeams"
                        :form="form"
                        :value="prediction.teams?.[0] || ''"
                        class="form-select form-select-sm"
                        required
                        @input="setPredictionTeam(0, $event)">
                        <option :value="''">{{ match.teams[0] }}</option>
                        <option v-for="t in getPossibleTeams(match.teams[0])" :value="t.id">
                            {{ $t('countries.' + t.id) }} ({{ t.poule_name }})
                        </option>
                    </select>
                </template>
            </div>
            <div class="col-2">
                <div
                    :class="wasValidated && (typeof prediction.result?.[0] !== 'number') ? 'border-danger' : ''"
                    class="d-flex align-items-center justify-content-center border border-2 rounded-4"
                    style="height: 60px">
                    <input
                        :id="match.num + '_result1_mob'"
                        :form="form"
                        :value="prediction.result?.[0]"
                        class="w-100 fs-2 text-center txt-pk-elevation-01 bg-transparent border-0 shadow-none"
                        inputmode="numeric"
                        maxlength="1"
                        min="0"
                        pattern="[0-9]*"
                        placeholder="+"
                        required
                        style="all: unset"
                        type="tel"
                        @input="setPredictionScore(0, $event)"
                        @keyup="gotoNext($event)"
                    />
                </div>
            </div>
            <div class="col-2">
                <div
                    :class="wasValidated && (typeof prediction.result?.[1] !== 'number') ? 'border-danger' : ''"
                    class="d-flex align-items-center justify-content-center border border-2 rounded-4"
                    style="height: 60px">
                    <input
                        :id="match.num + '_result2_mob'"
                        :form="form"
                        :value="prediction.result?.[1]"
                        class="w-100 fs-2 text-center txt-pk-elevation-01 bg-transparent border-0 shadow-none"
                        inputmode="numeric"
                        min="0"
                        pattern="[0-9]*"
                        placeholder="+"
                        required
                        style="all: unset"
                        type="text"
                        @input="setPredictionScore(1, $event)"
                        @keyup="gotoNext($event)"
                    />
                </div>
            </div>
            <div class="col-4 text-center">
                <template v-if="disableTeams">
                    <img
                        :src="getImagePred(1)"
                        alt="teamA"
                        class="border mb-2"
                        loading="lazy"
                        style="max-width: 60px">
                    <div class="fs-7">{{ prediction.teams?.[1] ? $t('countries.' + prediction.teams?.[1]) : match.teams[1] }}</div>
                </template>
                <template v-else>
                    <label :for="match.num + '_team2'" class="d-block cursor-pointer">
                        <img
                            :src="getImagePred(1)"
                            alt="teamB"
                            class="border mb-2"
                            loading="lazy"
                            style="max-width: 60px">
                    </label>
                    <select
                        :id="match.num + '_team2'"
                        :disabled="disableTeams"
                        :form="form"
                        :value="prediction.teams?.[1] || ''"
                        class="form-select form-select-sm"
                        required
                        @input="setPredictionTeam(1, $event)">
                        <option :value="''">{{ match.teams[1] }}</option>
                        <option v-for="t in getPossibleTeams(match.teams[1])" :value="t.id">
                            {{ $t('countries.' + t.id) }} - ({{ t.poule_name }})
                        </option>
                    </select>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import type {Match, Team} from "@/types/tournament.ts";
import type {MatchResult} from "@/types/pool.ts";
import {computed} from "vue";
import dayjs from "dayjs";
import {useI18n} from "vue-i18n";

const { locale } = useI18n();

const tournament = useTournament();
const {teams, teamImages} = storeToRefs(tournament);

const emit = defineEmits<{
    (e: 'update:team', payload: { match: number, teamIndex: number, value: string }): void;
    (e: 'update:score', payload: { match: number, teamIndex: number, value: number | null }): void;
}>();
const props = defineProps<{
    match: Match,
    prediction: MatchResult | undefined,
    predictions: MatchResult[],
    form: string,
    disableTeams?: boolean
    wasValidated?: boolean
}>();

/**
 * A computed boolean value that indicates if the `prediction` object passed via `props` is valid.
 * The validation relies on two conditions:
 *
 * 1. `result`: Must be an array of exactly two numeric values that are not `NaN`.
 * 2. `teams`: Must be an array of exactly two non-empty strings, where each string contains at least one non-whitespace character.
 *
 * If both conditions are met, this computed property will return `true`, otherwise `false`.
 */
const completed = computed(() => {
    const result = props.prediction?.result
    const teams = props.prediction?.teams

    const validResult = Array.isArray(result) &&
        result.length === 2 &&
        result.every(val => typeof val === 'number' && !isNaN(val))

    const validTeams = Array.isArray(teams) &&
        teams.length === 2 &&
        teams.every(val => val.trim().length > 0)

    return validResult && validTeams
})

const matchDay = computed(() => {
    return props.match ? tournament.match_days.find(matchDay => matchDay.id === props.match.match_day_id) : null;
})

const dateLabel = computed(() => {
    dayjs.locale(locale.value);
    return dayjs(matchDay.value?.date).format("D MMM");
})

/**
 * Updates the prediction team at the specified index with the value from the event's target input.
 *
 * @param {number} teamIndex - The index of the team in the prediction object to update.
 * @param {Event} event - The event triggered, typically from an input field, containing the new value.
 * @return {void}
 */
function setPredictionTeam(teamIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    emit('update:team', {
        match: props.match.num,
        teamIndex,
        value,
    })
}

/**
 * Updates the prediction score at the specified index with the value from the event's target input.
 *
 * @param {number} teamIndex - The index of the team in the prediction object to update.
 * @param {Event} event - The event triggered, typically from an input field, containing the new value.
 * @return {void}
 */
function setPredictionScore(teamIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    let value: number | null = parseInt(input.value, 10);
    if (isNaN(value)) value = null;

    emit('update:score', {
        match: props.match.num,
        teamIndex,
        value,
    })
}

/**
 * Determines possible teams based on the provided team placeholder string.
 *
 * @param {string} teamPlaceholder - A string used to identify and filter teams. It may include a 'W' followed by a number or uppercase letters.
 * @return {Array} - An array of possible teams matching the conditions dictated by the placeholder.
 */
function getPossibleTeams(teamPlaceholder: string): Team[] {
    if (teams.value.some(team => team.id === teamPlaceholder)) {
        return teams.value.filter(team => team.id === teamPlaceholder)
    } else if ((teamPlaceholder.includes('W') || teamPlaceholder.includes('L')) && teamPlaceholder.length > 1) {
        const number = parseInt(teamPlaceholder.slice(1), 10);
        const prediction = props.predictions.find(prediction => prediction.match === number)
        if (!prediction) return teams.value;
        return teams.value.filter(team => prediction.teams?.includes(team.id))
    } else {
        const matches = teamPlaceholder.match(/[A-Z]/g);
        const set = Array.from(new Set(matches));
        return teams.value.filter(team => set.includes(team.poule_name))
    }
}

/**
 * Return team image of the predicted team.
 * @returns {*}
 * @param teamIndex
 */
function getImagePred(teamIndex: number) {
    if (!props.prediction?.teams) return teamImages.value[`default`]
    return props.prediction.teams[teamIndex] ? teamImages.value[props.prediction.teams[teamIndex]] : teamImages.value[`default`];
}

/**
 * Focus on the next form input element
 * @param event
 */
function gotoNext(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const form = input.form;
    if (!form) return;

    const charCode = event.which || event.keyCode;

    // Only allow number keys (0-9)
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
        return;
    }

    // Move to the next available input
    const elements = Array.from(form.elements) as HTMLElement[];
    let currentIndex = elements.indexOf(input);

    while (++currentIndex < elements.length) {
        const next = elements[currentIndex];
        if (next instanceof HTMLInputElement && !next.disabled && !next.readOnly) {
            next.focus();
            break;
        }
    }
}

</script>

<style lang="sass" scoped>
.was-validated .form-select:valid:not([multiple]):not([size]),
.was-validated .form-select:invalid:not([multiple]):not([size])
    padding-right: 2.4rem
    background-position: right 0 center, center right 1.2rem
.form-select
    padding: 2px 1.2rem 2px 4px
    border-width: 0
    border-bottom-width: 1px
    background-position: right 0 center
</style>