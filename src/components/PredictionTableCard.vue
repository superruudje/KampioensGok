<template>
    <div class="card rounded-4">
        <div class="card-body p-3 p-md-4">
            <h3
                v-if="title"
                class="mb-3 fw-bolder w26-condensed">
                {{ title }}
            </h3>
            <PredictionTable
                :list="list"
                :image="image"
                :table_header="table_header"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed, type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import PredictionTable from "@/components/PredictionTable.vue";

const tournament = useTournament();
const {teamImages, teams} = storeToRefs(tournament)

const props = withDefaults(defineProps<{
    title: string,
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

<style lang="sass" scoped></style>
