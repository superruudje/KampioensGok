<template>
    <div class="d-sm-none bg-blue fixed-bottom">
        <transition name="slidedown">
            <div v-if="showMore" class="border-top p-3">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link @click="showMore = false" :to="{name: 'mijn-pagina'}" activeClass="active" class="nav-link text-white text-capitalize px-2 d-flex align-items-center">
                            <i class="bi bi-person-circle fs-2 mb-0 lh-1 me-3"></i>
                            <span class="fs-5">Mijn pagina</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="showMore = false" :to="{name: 'spelregels'}" activeClass="active" class="nav-link text-white text-capitalize px-2 d-flex align-items-center">
                            <i class="bi bi-info-circle fs-2 mb-0 lh-1 me-3"></i>
                            <span class="fs-5">Spelregels</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <div @click="reload" class="nav-link text-white text-capitalize px-2 d-flex align-items-center">
                            <i class="bi bi-arrow-clockwise fs-2 mb-0 lh-1 me-3"></i>
                            <span class="fs-5">Herlaad</span>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <nav class="d-flex align-items-center justify-content-around gap-2 border-top p-3">
            <router-link v-for="page in pages" :to="{name: page.url}" tag="div" activeClass="txt-orange border" class="text-white d-flex flex-column align-items-center p-2">
                <i class="bi fs-2 mb-0 lh-1" :class="'bi-' + page.icon"></i>
            </router-link>
            <div @click="showMore = !showMore" class="text-white d-flex flex-column align-items-center p-2" :class="{'txt-orange border' : showMore}">
                <i class="bi bi-three-dots fs-2 mb-0 lh-1"></i>
            </div>
        </nav>
    </div>
</template>

<script setup>
import {ref} from "vue";

const showMore = ref(false);

const pages = [
    {url: 'home', icon: 'house-door-fill'},
    {url: 'ranglijst', icon: 'trophy-fill'},
    {url: 'programma', icon: 'calendar-week-fill'},
    {url: 'uitslagen', icon: 'clipboard2-data-fill'},
    {url: 'statistieken', icon: 'bar-chart-fill'}
]

function reload() {
    location.reload();
}

</script>

<style scoped lang="sass">
.slidedown-enter-active,
.slidedown-leave-active
    transition: max-height .3s linear

.slidedown-enter-to,
.slidedown-leave-from
    overflow: hidden
    max-height: 200px

.slidedown-enter-from,
.slidedown-leave-to
    overflow: hidden
    max-height: 0
</style>