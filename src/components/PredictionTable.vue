<template>
    <div class="card border-0 rounded-0">
        <div class="card-body">
            <h5 class="mb-3 txt-blue fw-bolder">{{ title }}</h5>
            <table class="table align-middle">
                <thead>
                <tr>
                    <th class="txt-orange" scope="col">Land</th>
                    <th class="txt-orange w-50" scope="col">%</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="team in list.slice(0, open ? list.length : 5)">
                    <td>
                        <img :src="getImage(team.id)" alt="" loading="lazy" width="30px">
                        <span class="ms-2 txt-blue fw-bold">{{ getTeamName(team.id) }}</span>
                    </td>
                    <td class="w-50">
                        <div class="d-flex align-items-center">
                            <div :aria-valuenow="getPercentage(team.count)" aria-label="Basic example"
                                 aria-valuemax="100"
                                 aria-valuemin="0" class="progress flex-grow-1"
                                 role="progressbar">
                                <div :style="'width: '+getPercentage(team.count)+'%'"
                                     class="progress-bar bg-orange"></div>
                            </div>
                            <span class="ms-2">{{ getPercentage(team.count) }}%</span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                    @click="open = !open">Toon alle<i
                :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"
                class="bi ms-2"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";

const tournament = useTournament();
const {teamImages, teams} = storeToRefs(tournament)

const props = defineProps({
    title: {type: String, required: true},
    list: {type: Array, required: true},
})

const open = ref(false)

/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name) {
    return teamImages.value[name] || teamImages.value[`default`]
}

/**
 * Return team name
 * @param id
 * @returns {*}
 */
function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

const tot = computed(() => {
    return props.list.reduce((partialSum, a) => partialSum + a.count, 0);
})

/**
 * Return percentage of occurrence
 * @param count
 * @returns {number}
 */
function getPercentage(count) {
    return (Math.round((count / tot.value * 100) * 100) / 100)
}
</script>

<style lang="sass" scoped>

</style>