<template>
    <div class="card border-0 rounded-0">
        <div class="card-body">
            <h5 v-if="title" class="mb-3 txt-blue fw-bolder">{{ title }}</h5>
            <div class="w-100 overflow-hidden overflow-x-auto">
                <table class="table align-middle">
                    <thead>
                    <tr>
                        <th class="txt-orange" scope="col">{{ table_header[0] }}</th>
                        <th class="txt-orange" scope="col">{{ table_header[1] }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list.length">
                        <td colspan="100%">Geen data bekend.</td>
                    </tr>
                    <tr v-for="team in list.slice(0, open ? list.length : 5)">
                        <td class="text-nowrap">
                            <img v-if="image" class="me-2" :src="getImage(team.id)" alt="" loading="lazy" width="30px">
                            <span class="txt-blue fw-bold">{{ getTeamName(team.id) }}</span>
                        </td>
                        <td>{{ team.count }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button v-if="list.length > 5" class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
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
    list: {type: [Array, Object], required: true},
    image: {type: Boolean, default: true},
    table_header: {type: Array, default: ['Land', 'Goals']},
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

</script>

<style lang="sass" scoped>

</style>