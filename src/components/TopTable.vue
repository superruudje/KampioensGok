<template>
    <div class="card rounded-4 overflow-hidden">
        <div class="card-body p-0">
            <h4 class="header text-light w26-condensed bg-26-primary-01 p-4 pb-2 mb-0">
                {{ title }}
            </h4>

            <div class="w-100 overflow-hidden overflow-x-auto">
                <div
                    v-for="(item, idx) in list.slice(0, open ? list.length : 5)"
                    :class="idx < 1 ? 'bg-26-primary-01 text-light' : 'border-bottom'"
                    class="px-4 py-2 d-flex align-items-center">
                    <div class="flex-grow-1 d-flex align-items-center">
                        <img
                            :alt="'flag_' + item.label"
                            :src="getImage(item.team || item.label)"
                            class="border me-2"
                            loading="lazy"
                            width="32px">
                        <span>{{ isTeam ? $t('countries.' + item.label)  : item.label }}</span>
                    </div>
                    <div>
                        <span :class="idx < 1 ? 'fs-4' : 'fs-5'">{{ item.count }}</span>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <button
                    class="dropdown-toggle btn-wc26 sm btn-wc26-lightblue w-fit"
                    @click="open = !open">
                    {{ open ? $t('cta.hide') : $t('cta.view_all') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {type Ref, ref} from "vue";
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";

const tournament = useTournament();
const {teamImages, teams} = storeToRefs(tournament)

withDefaults(defineProps<{
    title: string,
    list: { label: string, team?: string, count: number }[],
    isTeam?: boolean,
}>(), {})

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

</script>

<style lang="sass" scoped></style>
