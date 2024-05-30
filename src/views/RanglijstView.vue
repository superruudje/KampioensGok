<template>
    <main class="container-md py-2 py-md-5">
        //TODO get score computed instead of from players.json
        //TODO how to get score course???
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm mb-3 mb-md-5">
                    <div class="card-body p-2 p-md-4">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h2 class="mb-0 txt-blue fw-bolder">Ranglijst</h2>
                            <div class="w-auto input-group input-group-sm">
                                <input v-model="searchTerm" class="form-control" placeholder="Zoek naar deelnemer"
                                       type="search">
                                <span id="basic-addon1" class="input-group-text"><i class="bi bi-search"></i></span>
                            </div>
                        </div>
                        <div class="w-100 overflow-hidden overflow-x-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="txt-orange" scope="col">#</th>
                                    <th class="txt-orange" style="width: 99%" scope="col">Deelnemer</th>
                                    <th class="txt-orange" scope="col">Punten</th>
                                    <th class="txt-orange" scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(player, idx) in paginatedData" :key="idx">
                                    <th scope="row">
                                        {{ player.pos }}
                                    </th>
                                    <td style="width: 99%;"><router-link :to="{name: 'deelnemer', params: {id: player.name}}">{{ player.name }}</router-link></td>
                                    <td>{{ player.score }}</td>
                                    <td>
                                        <i v-if="old_standing.find(p => p.player === player.name).pos < player.pos"
                                           class="txt-blue bi bi-arrow-down-circle-fill"></i>
                                        <i v-else-if="old_standing.find(p => p.player === player.name).pos > player.pos"
                                           class="txt-orange bi bi-arrow-up-circle-fill"></i>
                                        <i v-else class="bi bi-dash-lg"></i>
                                    </td>
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
                        <h2 class="mb-3 txt-blue fw-bolder">Scoreverloop</h2>
                        <div id="chart">
                            <apexchart :options="chartOptions" :series="series" type="line"/>
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
import {computed, ref} from "vue";

const tournament = useTournament();
const {standing, old_standing, pageSize, pageNumber} = storeToRefs(tournament)
const searchTerm = ref('')

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
    return standing.value.filter(x => !searchTerm.value || x.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
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
 * Chart data
 * @type {ComputedRef<*[]>}
 */
const series = computed(() => {
    let data = []
    standing.value.forEach((player) => {
        const obj = {
            name: player.name,
            data: player.scores.map((score, idx) => {
                return {
                    x: idx + 1,
                    y: score
                }
            })
        }
        data.push(obj)
    })
    return data
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
