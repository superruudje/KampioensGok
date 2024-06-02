<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-orange" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">EK'24 pool</a>
            <button ref="collapseBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'home'}" activeClass="active" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'ranglijst'}" activeClass="active" class="nav-link">Ranglijst</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'programma'}" activeClass="active" class="nav-link">Programma</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'poules'}" activeClass="active" class="nav-link">Poules</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'uitslagen'}" activeClass="active" class="nav-link">Uitslagen</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="closeMenu" :to="{name: 'statistieken'}" activeClass="active" class="nav-link">Statistieken</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {ref} from "vue";

const collapseBtn = ref(null)

function closeMenu() {
    if (getComputedStyle(collapseBtn.value).display !== 'none')
        collapseBtn.value.click()
}
</script>

<style scoped lang="sass">

</style>