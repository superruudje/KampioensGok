<template>
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">EK pool</a>
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
                        <a class="nav-link">Uitslagen</a>
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
    collapseBtn.value.click()
}
</script>

<style scoped lang="sass">

</style>