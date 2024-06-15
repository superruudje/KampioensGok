<template>
    <nav class="d-sm-none border-top fixed-bottom d-flex align-items-center justify-content-around gap-2 bg-blue p-3">
        <router-link v-for="page in pages" :to="{name: page.url}" tag="div" activeClass="txt-orange border" class="text-white d-flex flex-column align-items-center p-2">
            <i class="bi fs-2 mb-0 lh-1" :class="'bi-' + page.icon"></i>
        </router-link>
    </nav>
</template>

<script setup>
import {ref} from "vue";

const collapseBtn = ref(null)

const pages = [
    {url: 'home', icon: 'house-door-fill'},
    {url: 'ranglijst', icon: 'trophy-fill'},
    {url: 'programma', icon: 'calendar-week-fill'},
    {url: 'uitslagen', icon: 'clipboard2-data-fill'},
    {url: 'statistieken', icon: 'bar-chart-fill'},
    {url: 'spelregels', icon: 'question-diamond-fill'},
]

function closeMenu() {
    if (getComputedStyle(collapseBtn.value).display !== 'none')
        collapseBtn.value.click()
}
</script>

<style scoped lang="sass">
.nav-item a
    transform: skew(-8deg)
    &.active
        background-color: #253780!important
</style>