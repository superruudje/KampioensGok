<template>
    <div id="ranglijst-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-white">
                    <div class="col-12">
                        <h1 class="w26-condensed fw-bolder mb-0">{{ $t('heading.ranking_scores') }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-lg py-3 py-md-5">
            <div class="row">
                <div class="col-12">
                    <div class="card rounded-4 mb-4">
                        <div class="card-body p-3 p-md-4">
                            <div class="d-flex gap-2 align-items-center mb-3">
                                <h3 class="fw-bolder w26-condensed mb-0">{{ $t('heading.ranking') }}</h3>
                                <div class="ms-auto w-auto input-group input-group-sm">
                                    <input v-model="searchTerm" class="form-control" :placeholder="$t('dict.team_name')"
                                           type="search" @input="goPage(0)">
                                    <span id="basic-addon1" class="input-group-text"><i class="bi bi-search"></i></span>
                                </div>
                                <select
                                    v-model="snapshot"
                                    class="form-select form-select-sm w-auto">
                                    <option :value="0">Start</option>
                                    <option v-for="(snapshot, idx) in snapshots" :value="snapshot.id">{{ getLabel(snapshot.label) }}</option>
                                </select>
                            </div>
                            <p class="font-book mb-4">{{ $t('ranking.ranking_text')}}</p>
                            <div class="w-100 overflow-hidden overflow-x-auto mb-3">
                                <table class="table">
                                    <thead>
                                    <tr class="text-capitalize">
                                        <th class="txt-orange" scope="col">#</th>
                                        <th class="txt-orange" scope="col"></th>
                                        <th class="txt-orange" scope="col">{{ $t('dict.points_abbr') }}</th>
                                        <th class="txt-orange" scope="col">{{ $t('dict.team_name') }}</th>
                                        <th class="txt-orange" scope="col" style="width: 99%">{{ $t('dict.player') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(player, idx) in paginatedData" :key="idx">
                                        <th scope="row">
                                            {{ player.pos }}
                                        </th>
                                        <td>
                                            <i v-if="snapshot === 0" class="bi bi-dash-lg"></i>
                                            <i v-else-if="(old_standing.find(p => p.name === player.name)?.pos || 0) < (player.pos || 0)"
                                               class="text-red bi bi-arrow-down-circle-fill"></i>
                                            <i v-else-if="(old_standing.find(p => p.name === player.name)?.pos || 0) > (player.pos || 0)"
                                               class="text-green bi bi-arrow-up-circle-fill"></i>
                                            <i v-else class="bi bi-dash-lg"></i>
                                        </td>
                                        <td>{{ player.score }}</td>
                                        <td class="text-nowrap w26-condensed">
                                            <RouterLink :to="{name: 'deelnemer', params: {id: player.team_name.replace(/\s+/g, '-')}}">{{
                                                    player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name
                                                }}
                                            </RouterLink>
                                        </td>
                                        <td class="text-nowrap" style="width: 99%;">{{ player.name }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row align-items-center g-2">
                                <div class="col-12 col-md">
                                    <nav>
                                        <ul class="pagination mb-0">
                                            <li class="page-item" @click="prevPage">
                                                <a aria-label="Previous" class="page-link" role="button">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li :class="{active: pageNumber === 0}" class="page-item" @click="goPage(0)"><a
                                                class="page-link" role="button">1</a></li>

                                            <li v-if="pageCount > 2 && pageNumber > 2" class="page-item"><a
                                                class="page-link">...</a></li>

                                            <li v-if="pageNumber < 3 && pageCount > 1" :class="{active: pageNumber === 1}"
                                                class="page-item"
                                                @click="goPage(1)"><a class="page-link" role="button">2</a></li>
                                            <li v-if="pageNumber >= 3" :class="{active: pageNumber === 1}" class="page-item"
                                                @click="goPage(pageNumber - 1)"><a class="page-link"
                                                                                   role="button">{{ pageNumber }}</a></li>

                                            <li v-if="pageNumber < 3 && pageCount > 2" :class="{active: pageNumber === 2}"
                                                class="page-item"
                                                @click="goPage(2)"><a class="page-link" role="button">3</a></li>
                                            <li v-if="pageNumber >= 3" class="page-item active" @click="goPage(pageNumber)">
                                                <a
                                                    class="page-link" role="button">{{ pageNumber + 1 }}</a></li>

                                            <li v-if="pageNumber < 3 && pageCount > 3" class="page-item" @click="goPage(3)">
                                                <a
                                                    class="page-link" role="button">4</a></li>
                                            <li v-if="pageNumber >= 3 && pageCount - 1 > pageNumber" class="page-item"
                                                @click="goPage(pageNumber + 1)"><a class="page-link"
                                                                                   role="button">{{ pageNumber + 2 }}</a>
                                            </li>

                                            <li v-if="pageCount > 4 && pageCount - 3 > pageNumber" class="page-item"><a
                                                class="page-link">...</a>
                                            </li>
                                            <li v-if="pageCount > 4 && pageCount - 2 > pageNumber" class="page-item"
                                                @click="goPage(pageCount - 1)"><a class="page-link"
                                                                                  role="button">{{ pageCount }}</a></li>

                                            <li class="page-item" @click="nextPage">
                                                <a aria-label="Next" class="page-link" role="button">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-auto ms-auto">
                                    <span class="txt-blue fw-bold small"> {{ $t('ranking.table_results', { count: filtersData.length}) }}</span>
                                </div>
                                <div class="col-auto">
                                    <select
                                        v-model="pageSize"
                                        class="form-select form-select-sm">
                                        <option :value="10">{{ $t('ranking.table_page', { count: 10}) }}</option>
                                        <option :value="20">{{ $t('ranking.table_page', { count: 20}) }}</option>
                                        <option :value="30">{{ $t('ranking.table_page', { count: 30}) }}</option>
                                        <option :value="60">{{ $t('ranking.table_page', { count: 60}) }}</option>
                                        <option :value="'all'">{{ $t('cta.view_all') }} ({{ filtersData.length }})</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <div class="d-flex gap-2 align-items-center mb-4">
                                <h3 class="fw-bolder w26-condensed mb-0">{{ $t('heading.progression') }}</h3>
                                <select v-model="snapshot" class="ms-auto form-select form-select-sm w-auto">
                                    <option :value="0">start</option>
                                    <option v-for="(snapshot, idx) in snapshots" :value="snapshot.id">{{ getLabel(snapshot.label) }}</option>
                                </select>
                            </div>

                            <div style="height: 800px">
                                <EchartLine :data="LINE_CHART"/>
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
import {computed, onMounted, type Ref, ref, watch} from "vue";
import EchartLine from "@/components/charts/EchartLine.vue";
import type {Player} from "@/types/pool.ts";
import dayjs from "dayjs";
import {useI18n} from "vue-i18n";

const tournament = useTournament();
const {locale} = useI18n();

const {pageSize, pageNumber, playedMatchesGroupedByDay, players} = storeToRefs(tournament)
const searchTerm: Ref<string> = ref('');
const standing: Ref<Player[]> = ref([]);
const old_standing: Ref<Player[]> = ref([]);
const snapshot: Ref<number> = ref(0);

const snapshots = computed(() => {
    return playedMatchesGroupedByDay.value.map(groupDay => {
        return {label: groupDay.matchDayDate, id: groupDay.matchDayId}
    })
})

function getLabel(date: string) {
    dayjs.locale(locale.value);
    return dayjs(date).format('dddd D MMMM YYYY');
}

watch(snapshot, (newSnapshot) => {
    standing.value = tournament.getStanding(newSnapshot);
    old_standing.value = tournament.getStanding(newSnapshot - 1);
})

onMounted(() => {
    snapshot.value = snapshots.value.at(-1)?.id || 0;
    standing.value = tournament.getStanding(snapshot.value);
    old_standing.value = tournament.getStanding(snapshot.value - 1);
})

/**
 * Paginated data
 * @type {ComputedRef<*>}
 */
const paginatedData = computed(() => {
    if (typeof pageSize.value === 'string') return filtersData.value
    else {
        const start = pageNumber.value * pageSize.value,
            end = start + pageSize.value
        return filtersData.value.slice(start, end)
    }
})

/**
 * Filter original data by search value
 * @type {ComputedRef<Player[]>}
 */
const filtersData = computed(() => {
    return standing.value.filter(player => !searchTerm.value || player.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        || player.team_name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

/**
 * Total number of pages
 * @type {ComputedRef<number|number>}
 */
const pageCount = computed(() => {
    if (pageSize.value === 'all') return 1
    const l = filtersData.value.length,
        s = pageSize.value as number;
    return Math.ceil(l / s);
})

/**
 * A computed variable representing data for a line chart visualization. This data is structured
 * as an array containing information for two players, where each player object includes a name
 * and a series of data points. Each data point consists of a category label and a corresponding value.
 *
 * The structure of the data is as follows:
 * - Each player object contains:
 *   - `name` (string): The name of the player.
 *   - `data` (array): An array of data points, where each point is an object consisting of:
 *     - `category` (string): The category or label of the data point (e.g., 'start', 'match_day_1').
 *     - `value` (number): The numerical value associated with that category.
 *
 * Example data structure:
 * [
 *   {
 *     name: "Player1",
 *     data: [
 *       { category: "start", value: 0 },
 *       { category: "match_day_1", value: 5 },
 *       { category: "match_day_2", value: 7 }
 *     ]
 *   },
 *   {
 *     name: "Player2",
 *     data: [
 *       { category: "start", value: 0 },
 *       { category: "match_day_1", value: 2 },
 *       { category: "match_day_2", value: 4 }
 *     ]
 *   }
 * ]
 */
const LINE_CHART = computed(() => {
    const lines: { name: string, data: { category: string, value?: number }[] }[] = [];
    tournament.players.forEach((player: Player) => {
        const data: { category: string, value?: number }[] = [
            {category: 'start', value: 0}
        ]
        snapshots.value.slice(0, snapshot.value).forEach(snapshot => {
            const score = tournament.getParticipantTotalScore(player.team_name, snapshot.id)
            dayjs.locale(locale.value);
            data.push({category: dayjs(snapshot.label).format('ddd D MMM'), value: score})
        })

        lines.push({
            name: player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name,
            data
        })
    })

    return lines
})

/**
 * Go to the previous page
 */
function prevPage() {
    if (pageNumber.value > 0)
        pageNumber.value--
}

/**
 * Go to the next page
 */
function nextPage() {
    if (pageNumber.value + 1 < pageCount.value)
        pageNumber.value++
}

/**
 * Go to the page number
 * @param i
 */
function goPage(i: number) {
    pageNumber.value = i;
}

</script>

<style lang="sass">
#scroll-me
    animation: MoveUpDown 15s linear infinite

@keyframes MoveUpDown
    10%
        transform: translateY(0)
    100%
        transform: translateY(-100%)
</style>

<style lang="sass" scoped>
.page-link
    margin: 0 4px
    border: none
    border-radius: 8px
    color: #253780
    font-size: 13px
    font-weight: bold
    letter-spacing: 0
    line-height: 16px
    text-align: center

.page-item
    &:first-child,
    &:last-child
        .page-link:hover
            background-color: transparent

    &.active
        .page-link
            background-color: #f36c21
            color: #FFFFFF
</style>
