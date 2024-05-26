<template>
    <main class="container-md py-2 py-md-5">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border-0 rounded-0 shadow-sm mb-3 mb-md-5">
                    <div class="card-body p-2 p-md-4">
                        <h2 class="mb-3 txt-blue fw-bolder">Ranglijst</h2>
                        <div class="w-100 overflow-hidden overflow-x-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="txt-orange" scope="col">#</th>
                                    <th class="txt-orange" scope="col">Deelnemer</th>
                                    <th class="txt-orange" scope="col">Punten</th>
                                    <th class="txt-orange" scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(player, idx) in standing" :key="idx">
                                    <th v-if="idx > 0" scope="row">
                                        {{ player.score === standing[idx - 1].score ? '-' : idx + 1 }}
                                    </th>
                                    <th v-else scope="row">{{ idx + 1 }}</th>
                                    <td>{{ player.name }}</td>
                                    <td>{{ player.score }}</td>
                                    <td>
                                        <i v-if="old_standing.find(p => p.player === player.name).pos < idx + 1"
                                           class="txt-blue bi bi-arrow-down-circle-fill"></i>
                                        <i v-else-if="old_standing.find(p => p.player === player.name).pos > idx + 1"
                                           class="txt-orange bi bi-arrow-up-circle-fill"></i>
                                        <i v-else class="bi bi-dash-lg"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
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
import {computed} from "vue";

const tournament = useTournament();
const {standing, old_standing} = storeToRefs(tournament)

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
        console.log(player)
        data.push(obj)
    })
    return data
})

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
</script>

<style lang="sass" scoped>

</style>
