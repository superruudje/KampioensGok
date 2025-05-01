<template>
    <div class="bg-26-primary-01 py-5 text-light">
        <div class="container-lg">
            <div class="row gy-5 mb-5">
                <div class="col-md-6">
                    <div class="d-flex">
                        <img alt="logo" src="@/assets/images/wc26.png">
                        <div class="flex-grow-1 d-flex justify-content-around">
                            <div class="d-flex flex-column">
                                <RouterLink
                                    :to="{name: 'wedstrijden'}"
                                    class="text-light text-decoration-none small">
                                    Wedstrijden
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'wedstrijden'}"
                                    class="text-light text-decoration-none small">
                                    Poules
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'wedstrijden'}"
                                    class="text-light text-decoration-none small">
                                    Statistieken
                                </RouterLink>
                            </div>
                            <div class="d-flex flex-column">
                                <RouterLink
                                    :to="{name: 'wedstrijden'}"
                                    class="text-light text-decoration-none small">
                                    Ranglijst
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'wedstrijden'}"
                                    class="text-light text-decoration-none small">
                                    Spelregels
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <h3 class="w26-condensed fs-5">BEZOEK OOK</h3>
                    <div class="d-flex flex-column">
                        <a
                            class="text-light text-decoration-none small"
                            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
                            target="_blank">FIFA WC 26</a>
                        <a
                            class="text-light text-decoration-none small"
                            href="https://www.knvb.nl/"
                            target="_blank">KNVB</a>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <h3 class="w26-condensed fs-5">MADE BY <a class="w26-condensed text-light"
                                                              href="https://github.com/superruudje"
                                                              target="_blank"
                    >SUPERRUUDJE</a></h3>
                    <div class="d-flex flex-column">
                        <a
                            class="text-light text-decoration-none small"
                            href="https://github.com/superruudje/KampioensGok"
                            target="_blank">GitHub</a>
                        <a
                            class="text-light text-decoration-none small"
                            href="https://ko-fi.com/superruudje"
                            target="_blank">Bedank Superruudje via
                            <KoFi/>
                        </a>
                        <div class="text-light text-decoration-none small">Leuk idee voor een hobby-project?
                            <a
                                class="text-light"
                                href="https://wa.me/31629010196?text=Hey,%20Ik%20heb%20een%20leuk%20idee."
                                target="_blank">Laat het weten!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <p class="text-center opacity-50 fw-lighter small mb-0">© 2025 WK 2026 POOL. All rights reserved.</p>
                    <p class="text-center opacity-50 fw-lighter small">WK 2026 POOL is een onafhankelijke, niet-commerciële website bedoeld
                        voor deelnemers aan een voetbalpool tijdens het FIFA Wereldkampioenschap 2026. Deze website is uitsluitend bedoeld
                        voor entertainmentdoeleinden en biedt gebruikers de mogelijkheid om hun voorspellingen en scores bij te houden
                        tijdens het toernooi.</p>
                </div>
            </div>
        </div>
        <div class="d-sm-none" style="height: 75px"></div>
    </div>
</template>

<script setup>
import {event} from 'vue-gtag'
import KoFi from "@/components/KoFi.vue";

function countClick() {
    event('tikkie_click')
}
</script>


<style lang="sass" scoped>

</style>