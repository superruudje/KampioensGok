<template>
    <div class="main-wrap">
        <header class="header-wrap">
            <div class="d-flex gap-3 align-items-center justify-content-between w-100 px-4 py-2">
                <span class="text-light w26-condensed text-uppercase">{{ $t('app.title') }} - {{
                        $t('app.participants', {count: tournament.players.length})
                    }}</span>
            </div>
        </header>
        <div class="body">
            <div class="content-wrap">
                <NavigationBar/>
                <Transition name="fade">
                    <div v-if="!tournament.loading">
                        <router-view v-slot="{ Component }">
                            <Transition name="fade">
                                <component :is="Component"/>
                            </Transition>
                        </router-view>
                    </div>
                    <div v-else>
                        <header class="bg-26-primary py-3 py-md-5">
                            <div class="container-lg">
                                <div class="row text-light">
                                    <div class="col-12">
                                        <h1 class="w26-condensed text-capitalize">{{ $t('app.loading') }}...</h1>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main class="container-lg py-3 py-md-5" style="min-height: 800px">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card rounded-4">
                                        <div class="card-body p-3 p-md-4">
                                            <h3 class="fw-bolder w26-condensed mb-3">{{ $t('app.just_a_moment') }}</h3>
                                            <p class="font-book mb-0">{{ $t('app.just_a_moment_2') }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </Transition>
                <FooterComponent/>
                <MobileNavigationBar/>
            </div>
        </div>

        <BackToTop/>
    </div>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {useTournament} from "@/stores/content.js";
import {Tooltip} from "bootstrap";
import {onBeforeMount, onMounted} from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import BackToTop from "@/components/BackToTop.vue";
import MobileNavigationBar from "@/components/MobileNavigationBar.vue";

const tournament = useTournament();

onMounted(() => {
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
    })

    console.log(
        "%c🚀 Welcome, developer! Explore the source code on GitHub: https://github.com/superruudje/KampioensGok", ""
    );
})

onBeforeMount(() => tournament.fetchData())
</script>

<style lang="sass" scoped>
.main-wrap
    min-width: 320px
    position: relative

    .header-wrap
        min-height: 40px
        background-color: #000
</style>
