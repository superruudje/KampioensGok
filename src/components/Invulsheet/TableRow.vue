<template>
    <tr v-if="prediction">
        <td>{{ match.num }}</td>
        <td>
            <select
                :id="match.num + '_team1'"
                :disabled="disableTeams"
                :form="form"
                :value="prediction.teams?.[0] || ''"
                class="form-select form-select-sm"
                required
                @input="setPredictionTeam(0, $event)">
                <option :value="''">{{ match.teams[0] }}</option>
                <option v-for="t in getPossibleTeams(match.teams[0])" :value="t?.id">
                    {{ t?.full_name }} - ({{ t?.poule_name }})
                </option>
            </select>
        </td>
        <td class="text-nowrap">
            <img :src="getImagePred(0)" alt="teamA" class="border"
                 loading="lazy" width="30px"/>
        </td>
        <td>
            <input
                :id="match.num + '_result1'"
                :form="form"
                :value="prediction.result?.[0]"
                class="form-control form-control-sm"
                inputmode="numeric"
                min="0"
                pattern="[0-9]*"
                placeholder="0"
                required
                style="width: 80px;"
                type="text"
                @input="setPredictionScore(0, $event)"
                @keyup="gotoNext($event)"/>
        </td>
        <td>
            <input
                :id="match.num + '_result2'"
                :form="form"
                :value="prediction.result?.[1]"
                class="form-control form-control-sm"
                inputmode="numeric"
                min="0"
                pattern="[0-9]*"
                placeholder="0"
                required
                style="width: 80px;"
                type="text"
                @input="setPredictionScore(1, $event)"
                @keyup="gotoNext($event)"/>
        </td>
        <td class="text-nowrap">
            <img :src="getImagePred(1)" alt="teamB" class="border"
                 loading="lazy" width="30px"/>
        </td>
        <td>
            <select
                :id="match.num + '_team2'"
                :disabled="disableTeams"
                :form="form"
                :value="prediction.teams?.[1] || ''"
                class="form-select form-select-sm"
                required
                @input="setPredictionTeam(1, $event)">
                <option :value="''">{{ match.teams[1] }}</option>
                <option v-for="t in getPossibleTeams(match.teams[1])" :value="t?.id">
                    {{ t?.full_name }} - ({{ t?.poule_name }})
                </option>
            </select>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content.ts";
import type {Match} from "@/types/tournament.ts";
import type {MatchResult} from "@/types/pool.ts";

const tournament = useTournament();
const {teams, teamImages} = storeToRefs(tournament);

const emit = defineEmits<{
    (e: 'update:team', payload: { match: number, teamIndex: number, value: string }): void;
    (e: 'update:score', payload: { match: number, teamIndex: number, value: number }): void;
}>();
const props = defineProps<{
    match: Match,
    prediction: MatchResult | undefined,
    predictions: MatchResult[],
    form: string,
    disableTeams?: boolean
}>();

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
    const value = parseInt(input.value, 10);

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
function getPossibleTeams(teamPlaceholder: string) {
    if (teams.value.some(team => team.id === teamPlaceholder)) {
        return [teams.value.find(team => team.id === teamPlaceholder)]
    } else if (teamPlaceholder.includes('W')) {
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

</style>