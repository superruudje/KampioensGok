<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-orange" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">EK'24 pool</a>
            <button ref="collapseBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse pt-3 pt-lg-0" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item me-1" v-for="(page, i) in pages">
                        <router-link @click="closeMenu" :to="{name: page}" activeClass="active" class="nav-link text-capitalize px-2">{{page}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {ref} from "vue";

const collapseBtn = ref(null)

const pages = ['home', 'ranglijst', 'poules', 'wedstrijden', 'statistieken', 'spelregels'];

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