<template>
    <div class="w-100 overflow-hidden overflow-x-auto">
        <table class="table align-middle">
            <thead>
            <tr>
                <th class="txt-orange text-capitalize" scope="col">{{ table_header }}</th>
                <th class="txt-orange w-50" scope="col">%</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="team in list.slice(0, open ? list.length : 5)">
                <td class="text-nowrap">
                    <img
                        v-if="image"
                        :src="getImage(team.id)"
                        alt="flag"
                        class="me-2 border"
                        loading="lazy"
                        width="30px">
                    <span class="txt-blue fw-bold">{{ isTeam(team.id) ? $t('countries.' + team.id) : team.id }}</span>
                </td>
                <td class="w-50">
                    <div class="d-flex align-items-center">
                        <div
                            :aria-valuenow="getPercentage(team.count)"
                            aria-label="Basic example"
                            aria-valuemax="100"
                            aria-valuemin="0"
                            class="progress flex-grow-1"
                            role="progressbar">
                            <div :style="'width: ' + getPercentage(team.count)+'%'"
                                 class="progress-bar bg-orange"></div>
                        </div>
                        <span class="ms-2">{{ getPercentage(team.count) }}%</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <button
        class="dropdown-toggle btn-wc26 sm btn-wc26-orange w-fit"
        @click="open = !open">
        {{ open ? $t('cta.hide') : $t('cta.view_all') }}
    </button>

</template>

<script lang="ts" setup>
import {computed, type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";

const tournament = useTournament();
const {teamImages, teams} = storeToRefs(tournament)

const props = withDefaults(defineProps<{
    list: { id: string, count: number }[],
    image?: boolean,
    table_header?: string,
}>(), {
    image: true,
    table_header: 'Land',
})

const open: Ref<boolean> = ref(false);

/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name: string): string {
    return teamImages.value[name] || teamImages.value[`default`]
}

/**
 * Check if is valid team id
 * @param teamName
 */
function isTeam(teamName: string) {
    return teams.value.some(t => t.short_name === teamName)
}

/**
 * Return team name
 * @param id
 * @returns {*}
 */
function getTeamName(id: string): string {
    return teams.value.find((e) => e.id === id)?.full_name || id
}

const tot = computed(() => {
    return props.list.reduce((partialSum, a) => partialSum + a.count, 0);
})

/**
 * Return percentage of occurrence
 * @param count
 * @returns {number}
 */
function getPercentage(count: number): number {
    return (Math.round((count / tot.value * 100) * 100) / 100)
}
</script>

<style lang="sass" scoped>
.table > :not(caption) > * > *
    background-color: transparent
</style>
