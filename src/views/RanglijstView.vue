<template>
    <header class="bg-blue py-3 py-md-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="fs-2 text-white fw-bolder">EK 2024</h1>
                    <h2 class="fs-6 mb-0 txt-orange fw-bolder">Ranglijst</h2>
                </div>
            </div>
        </div>
    </header>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm mb-3 mb-md-5">
                    <div class="card-body p-2 p-md-4">
                        <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <h2 class="mb-0 txt-blue fw-bolder">Ranglijst</h2>
                            <div class="ms-auto w-auto input-group input-group-sm">
                                <input v-model="searchTerm" class="form-control" placeholder="Zoek naar deelnemer of team"
                                       type="search">
                                <span id="basic-addon1" class="input-group-text"><i class="bi bi-search"></i></span>
                            </div>
                            <select class="form-select form-select-sm w-auto" v-model="snapshot">
                                <option :value="0">start</option>
                                <option v-for="(snapshot, idx) in snapshots" :value="idx + 1">{{ snapshot }}</option>
                            </select>
                        </div>
                        <div class="w-100 overflow-hidden overflow-x-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="txt-orange" scope="col">#</th>
                                    <th class="txt-orange" scope="col"></th>
                                    <th class="txt-orange" scope="col">Team</th>
                                    <th class="txt-orange" style="width: 99%" scope="col">Deelnemer</th>
                                    <th class="txt-orange" scope="col">Punten</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(player, idx) in paginatedData" :key="idx">
                                    <th scope="row">
                                        {{ player.pos }}
                                    </th>
                                    <td>
                                        <i v-if="snapshot === 0" class="bi bi-dash-lg"></i>
                                        <i v-else-if="old_standing.find(p => p.name === player.name).pos < player.pos"
                                           class="txt-blue bi bi-arrow-down-circle-fill"></i>
                                        <i v-else-if="old_standing.find(p => p.name === player.name).pos > player.pos"
                                           class="txt-orange bi bi-arrow-up-circle-fill"></i>
                                        <i v-else class="bi bi-dash-lg"></i>
                                    </td>
                                    <td class="text-nowrap"><router-link :to="{name: 'deelnemer', params: {id: player.name}}">{{ player.team_name }}</router-link></td>
                                    <td class="text-nowrap" style="width: 99%;">{{ player.name }}</td>
                                    <td>{{ player.score }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row align-items-center g-2 mb-5">
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
                                <span class="txt-blue fw-bold small">{{ standing.length }} resultaten</span>
                            </div>
                            <div class="col-auto">
                                <select v-model="pageSize" aria-label="Default select example" class="form-select">
                                    <option :value="10">10 resultaten per pagina</option>
                                    <option :value="20">20 resultaten per pagina</option>
                                    <option :value="30">30 resultaten per pagina</option>
                                    <option :value="60">60 resultaten per pagina</option>
                                    <option :value="'all'">Toon alles ({{ standing.length }})</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card border-0 rounded-0 shadow-sm">
                    <div class="card-body p-2 p-md-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <h2 class="mb-0 txt-blue fw-bolder me-auto">Scoreverloop</h2>
                            <select class="form-select form-select-sm w-auto" v-model="snapshot">
                                <option :value="0">start</option>
                                <option v-for="(snapshot, idx) in snapshots" :value="idx + 1">{{ snapshot }}</option>
                            </select>
                        </div>
                        <div id="chart">
                            <apexchart :options="chartOptions" :series="chartData" type="line"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import {computed, onMounted, ref, watch} from "vue";

const tournament = useTournament();
const {pageSize, pageNumber, matches_played, players} = storeToRefs(tournament)
const searchTerm = ref('')
const standing = ref([])
const old_standing = ref([])
const snapshot = ref(0)
const chartData = ref([])

const snapshots = computed(() => {
    return matches_played.value.map(d => d.date)
})

watch(snapshot, (newSnapshot) => {
    standing.value = tournament.getStanding(newSnapshot)
    old_standing.value = tournament.getStanding(newSnapshot - 1)
    getScoreProgression(newSnapshot)
})

onMounted(() => {
    snapshot.value = snapshots.value.length
    standing.value = tournament.getStanding(snapshot.value)
    old_standing.value = tournament.getStanding(snapshot.value - 1)
    getScoreProgression(snapshot.value)
})

/**
 * Paginated data
 * @type {ComputedRef<*>}
 */
const paginatedData = computed(() => {
    if (pageSize.value === 'all') return filtersData.value
    const start = pageNumber.value * pageSize.value,
        end = start + pageSize.value
    return filtersData.value.slice(start, end)
})

/**
 * Filter original data by search value
 * @type {ComputedRef<*>}
 */
const filtersData = computed(() => {
    return standing.value.filter(x => !searchTerm.value || x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        || x.team_name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

/**
 * Total amount of pages
 * @type {ComputedRef<number|number>}
 */
const pageCount = computed(() => {
    if (pageSize.value === 'all') return 1
    const l = standing.value.length,
        s = pageSize.value;
    return Math.ceil(l / s);
})

/**
 * Chart options
 * @type {{plotOptions: {line: {isSlopeChart: boolean}}, dataLabels: {enabled: boolean}, xaxis: {title: {text: string}}, markers: {size: number}, chart: {animations: {enabled: boolean}, zoom: {enabled: boolean}, type: string}, yaxis: {title: {text: string}}}}
 */
const chartOptions = {
    chart: {
        animations: {enabled: false},
        zoom: {enabled: false},
        type: 'line',
    },
    dataLabels: {enabled: false},
    markers: {size: 1},
    xaxis: {title: {text: 'Speeldag'}},
    yaxis: {title: {text: 'Score'}},
    plotOptions: {
        line: {
            isSlopeChart: true,
        },
    }
}

/**
 * Create chart data
 */
function getScoreProgression(snapshot) {
    let dataSets = []
    players.value.forEach(player => {
        let data = [{x: "start", y: 0}]
        snapshots.value.slice(0, snapshot).forEach((s, idx) => {
            const score = tournament.getParticipantTotalScore(player.name, idx + 1)
            data.push({x: s, y: score})
        })
        const dataSet = {
            name: player.name,
            data: data
        }
        dataSets.push(dataSet)
    })
    chartData.value = dataSets
}

/**
 * Go to previous page
 */
function prevPage() {
    if (pageNumber.value > 0)
        pageNumber.value--
}

/**
 * Go to next page
 */
function nextPage() {
    if (pageNumber.value < pageCount.value)
        pageNumber.value++
}

/**
 * Go to page number
 * @param i
 */
function goPage(i) {
    pageNumber.value = i;
}
</script>

<style lang="sass" scoped>
.page-link
    margin: 0 4px
    border: none
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
