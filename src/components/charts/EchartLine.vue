<template>
    <v-chart :option="chartOptions" autoresize class="chart"/>
</template>

<script lang="ts" setup>
import VChart from "vue-echarts"
import {use} from "echarts/core"
import {LineChart} from "echarts/charts";
import {GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {computed} from "vue";

use([LineChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer, GridComponent, ToolboxComponent]);

interface chartData {
    data: { category: string, value?: number }[],
    name: string,
}

// Define props
const props = defineProps<{
    data: chartData[]
}>();

// Compute chart options dynamically based on props
const chartOptions = computed(() => ({
    tooltip: {
        trigger: "axis",
        position: [10, 10],
        order: 'valueDesc',
        // axisPointer: {
        //     type: "cross",
        //     label: {
        //         backgroundColor: "#6a7985"
        //     }
        // }
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        top: "bottom",
    },
    xAxis: {
        type: "category",
        data: props.data[0].data.map(item => item.category), // Extract dates for x-axis
    },
    yAxis: {
        type: "value",
    },
    series: props.data.map(set => {
        return {
            name: set.name,
            type: "line",
            data: set.data.map(item => item.value),
        }
    })
}));

</script>

<style lang="sass" scoped>
.chart
    min-height: 100%
</style>