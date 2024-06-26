<template>
    <div id="ranglijst-view">
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
                        <div class="card-body p-4">
                            <div class="row align-items-center g-2 mb-3">
                                <h2 class="col-12 col-md-auto me-md-auto mb-0 txt-blue fw-bolder">Ranglijst</h2>
                                <div class="col-auto">
                                    <div class="ms-auto w-auto input-group input-group-sm">
                                        <input v-model="searchTerm" class="form-control" placeholder="Zoek naar deelnemer of team"
                                               type="search" @input="goPage(0)">
                                        <span id="basic-addon1" class="input-group-text"><i class="bi bi-search"></i></span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <select class="form-select form-select-sm w-auto" v-model="snapshot">
                                        <option :value="0">start</option>
                                        <option v-for="(snapshot, idx) in snapshots" :value="idx + 1">{{ snapshot }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="w-100 overflow-hidden overflow-x-auto">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="txt-orange" scope="col">#</th>
                                        <th class="txt-orange" scope="col"></th>
                                        <th class="txt-orange" scope="col">Pnt.</th>
                                        <th class="txt-orange" scope="col">Team</th>
                                        <th class="txt-orange" style="width: 99%" scope="col">Deelnemer</th>
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
                                        <td>{{ player.score }}</td>
                                        <td class="text-nowrap"><router-link :to="{name: 'deelnemer', params: {id: player.team_name}}">{{ player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name }}</router-link></td>
                                        <td class="text-nowrap" style="width: 99%;">{{ player.name }}</td>
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
                                    <span class="txt-blue fw-bold small">{{ filtersData.length }} resultaten</span>
                                </div>
                                <div class="col-auto">
                                    <select v-model="pageSize" aria-label="Default select example" class="form-select">
                                        <option :value="10">10 resultaten per pagina</option>
                                        <option :value="20">20 resultaten per pagina</option>
                                        <option :value="30">30 resultaten per pagina</option>
                                        <option :value="60">60 resultaten per pagina</option>
                                        <option :value="'all'">Toon alles ({{ filtersData.length }})</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border-0 rounded-0 shadow-sm">
                        <div class="card-body p-4">
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
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTournament} from "@/stores/content";
import {computed, onMounted, ref, watch} from "vue";

const tournament = useTournament();
const {pageSize, pageNumber, matches_played_by_day, players} = storeToRefs(tournament)
const searchTerm = ref('')
const standing = ref([])
const old_standing = ref([])
const snapshot = ref(0)
const chartData = ref([])

const snapshots = computed(() => {
    return Object.keys(matches_played_by_day.value)
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
    const l = filtersData.value.length,
        s = pageSize.value;
    return Math.ceil(l / s);
})

/**
 * Chart options
 * @type {{plotOptions: {line: {isSlopeChart: boolean}}, dataLabels: {enabled: boolean}, xaxis: {title: {text: string}}, markers: {size: number}, chart: {animations: {enabled: boolean}, zoom: {enabled: boolean}, type: string}, yaxis: {title: {text: string}}}}
 */
const chartOptions = {
    chart: {
        width: "100%",
        animations: {enabled: false},
        zoom: {enabled: true},
        type: 'line',
    },
    dataLabels: {enabled: false},
    markers: {size: 5},
    xaxis: {title: {text: 'Speeldag'}},
    yaxis: {title: {text: 'Score'}},
    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {height: 600},
                xaxis: {labels: {show: false}},
                yaxis: {labels: {show: false}},
            }
        }
    ],
    plotOptions: {
        line: {
            isSlopeChart: true,
        },
    },
    tooltip: {
        fixed: {
            enabled: true,
            position: "topLeft",
        },
        custom: function({series, seriesIndex, dataPointIndex, w}) {
            const score = series[seriesIndex][dataPointIndex]
            const players = series.map((s, i) => {
                return {
                    idx: i,
                    data: s,
                    name: w.globals.seriesNames[i],
                    color: w.globals.colors[i],
                }
            }).filter(s => s.data[dataPointIndex] === score)
            let html = ''
            players.forEach((s, i) => {
                html += `<div class="d-flex align-items-center">`
                html += `<i class="bi bi-circle-fill me-2" style="color:` + s.color + `"></i>`
                html += `<div class="player">` + s.name +  `: <b>` + score + `</b>` +`</div>`
                html += `</div>`
            })

            return '<div class="card border-0 rounded-0 shadow-sm">' +
                '<div class="card-body">' +
                '<div class="txt-blue fw-bolder">' + w.globals.categoryLabels[dataPointIndex] +'</div>' +
                '<div class="overflow-hidden position-relative" style="max-height: 150px"><div id="' + (players.length > 6 ? 'scroll-me' : '') + '">' +
                html +
                '</div></div>' +
                '</div> ' +
                '</div>'
        }
    },
    annotations: {
        xaxis: [
            {
                x: "14-06-2024",
                x2: "26-06-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Poule"
                }
            },
            {
                x: "26-06-2024",
                x2: "02-07-2024",
                fillColor: "#253780",
                opacity: .05,
                label: {
                    borderColor: "#253780",
                    style: {
                        color: "#fff",
                        background: "#253780"
                    },
                    text: "Round of 16"
                }
            },
            {
                x: "02-07-2024",
                x2: "06-07-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Quarter-finals"
                }
            },
            {
                x: "06-07-2024",
                x2: "10-07-2024",
                fillColor: "#253780",
                opacity: .05,
                label: {
                    borderColor: "#253780",
                    style: {
                        color: "#fff",
                        background: "#253780"
                    },
                    text: "Semi-finals"
                }
            },
            {
                x: "10-07-2024",
                x2: "14-07-2024",
                fillColor: '#f36c21',
                opacity: .05,
                label: {
                    borderColor: "#f36c21",
                    style: {
                        color: "#fff",
                        background: "#f36c21"
                    },
                    text: "Final"
                }
            }
        ]
    }
}

/**
 * Create chart data
 */
function getScoreProgression(snapshot) {
    let dataSets = []
    const sorted = [...players.value].sort((a, b) => a.team_name.localeCompare(b.team_name));
    sorted.forEach(player => {
        let data = [{x: "start", y: 0}]
        snapshots.value.slice(0, snapshot).forEach((s, idx) => {
            const score = tournament.getParticipantTotalScore(player.team_name, idx + 1)
            data.push({x: s, y: score})
        })
        const dataSet = {
            name: player.team_name.length > 30 ? player.team_name.slice(0, 30) + '...' : player.team_name,
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
    if (pageNumber.value + 1 < pageCount.value)
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
