<template>
    <div id="spelregels-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">{{ $t('menu.rules') }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-lg py-3 py-md-5">
            <div class="row g-4">
                <div class="col-md-8">
                    <div class="card rounded-4 mb-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder w26-condensed mb-3">{{ $t('rules.point_system') }}</h3>
                            <p>{{ $t('rules.text_1') }}</p>
                            <p v-html="$t('rules.points_total', { points: totalPoints })"></p>

                            <article>
                                <h5 class="txt-blue fw-bolder">{{ $t('rules.match_result') }}</h5>
                                <p v-html="$t('rules.text_2', { matches: tournament.matches.length, matchPoints })"></p>
                                <ul>
                                    <li v-html="$t('rules.points1')"></li>
                                    <li v-html="$t('rules.points2')"></li>
                                    <li v-html="$t('rules.points3')"></li>
                                    <li v-html="$t('rules.points4')"></li>
                                </ul>
                                <div class="table-responsive">
                                    <table class="table text-nowrap">
                                        <thead>
                                        <tr class="text-capitalize">
                                            <th class="txt-orange" scope="col">{{ $t('dict.result') }}</th>
                                            <th class="txt-orange" scope="col">{{ $t('dict.prediction') }}</th>
                                            <th class="txt-orange" scope="col">{{ $t('dict.points') }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1 - 1</td>
                                            <td>1 - 1 <small>{{ $t('rules.example1') }}</small></td>
                                            <td><span class="badge bg-orange">+10</span></td>
                                        </tr>
                                        <tr>
                                            <td>1 - 1</td>
                                            <td>2 - 2 <small>{{ $t('rules.example2') }}</small></td>
                                            <td><span class="badge bg-orange">+7</span></td>
                                        </tr>
                                        <tr>
                                            <td>1 - 2</td>
                                            <td>0 - 1 <small>{{ $t('rules.example3') }}</small></td>
                                            <td><span class="badge bg-orange">+5</span></td>
                                        </tr>
                                        <tr>
                                            <td>1 - 2</td>
                                            <td>0 - 2 <small>{{ $t('rules.example4') }}</small></td>
                                            <td><span class="badge bg-orange">+5</span><span
                                                class="ms-2 badge bg-orange">+2</span></td>
                                        </tr>
                                        <tr>
                                            <td>2 - 3</td>
                                            <td>2 - 1 <small>{{ $t('rules.example5') }}</small></td>
                                            <td><span class="badge bg-orange">+2</span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="small">* Onder uitslag wordt verstaan de stand na <b>90</b> minuten.</div>
                                <hr class="my-4">
                            </article>
                            <article>
                                <h5 class="txt-blue fw-bolder">Knock-out fase</h5>
                                <p>Voor elk correct voorspelde team in de knock-out fase zijn er punten te verdienen. Totaal
                                    zijn er
                                    <b class="txt-orange">{{ knockoutPoints }} pnt.</b> te verdienen.</p>
                                <ul>
                                    <li><b class="txt-orange">5 pnt. </b>per correct voorspelde 1/32 finalist.</li>
                                    <li><b class="txt-orange">10 pnt. </b>per correct voorspelde 1/16 finalist.</li>
                                    <li><b class="txt-orange">20 pnt. </b>per correct voorspelde kwartfinalist.</li>
                                    <li><b class="txt-orange">30 pnt. </b>per correct voorspelde halve finalist</li>
                                    <li><b class="txt-orange">50 pnt. </b>per correct voorspelde finalist.</li>
                                </ul>
                                <hr class="my-4">
                            </article>
                            <h5 class="txt-blue fw-bolder">Bonusvragen</h5>
                            <p>Bij vragen waarbij er een <b>team</b> of <b>speler</b> opgegeven moet worden, zijn er <b
                                class="txt-orange">10 pnt. </b> te verdienen<sup>1</sup>.
                                Bij inschattingsvragen<sup>2,
                                    3</sup> is de puntverdeling als volgt:</p>
                            <ul>
                                <li><b class="txt-orange">40 pnt. </b>wanneer het aantal exact is voorspeld.</li>
                                <li><b class="txt-orange">25 pnt. </b>wanneer het voorspelde aantal er max. 5 naast zit.
                                </li>
                                <li><b class="txt-orange">15 pnt. </b>wanneer het voorspelde aantal er max. 10 naast
                                    zit.
                                </li>
                            </ul>
                            <p>Totaal zijn er <b class="txt-orange">{{ bonusPoints }} pnt.</b> te verdienen met bonusvragen.</p>
                            <div class="small">1: Correct voorspelde kampioen is <b class="txt-orange">75 pnt.</b></div>
                            <div class="small">2: Indirecte rode kaart (bij 2x geel) telt niet als extra kaart.</div>
                            <div class="small">3: Totaal aantal goals is incl. verlengingen.</div>
                        </div>
                    </div>
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder w26-condensed mb-3">Prijzenpot</h3>
                            <p>Elke deelnemer betaalt €11, waarvan €10 direct in de prijzenpot gaat en €1 bestemd is voor
                                administratiekosten. Hoe meer deelnemers, hoe groter de prijzenpot! De exacte inhoud van de prijzenpot wordt
                                bekendgemaakt zodra de inschrijvingen zijn gesloten.</p>
                            <RouterLink :to="{name: 'register'}">
                                <button class="btn-wc26 btn-wc26-orange-alt w-fit">Meedoen</button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder w26-condensed mb-3">FAQ</h3>
                            <h6 class="txt-blue fw-bolder">1. Tot wanneer kan ik mijn voorspelling aanpassen?</h6>
                            <p>Je hebt tot uiterlijk vrijdag 14 juni 20:59 uur om jouw invulsheet te mailen naar de
                                organisatie.</p>
                            <h6 class="txt-blue fw-bolder">2. Wanneer worden de uitslagen ingevoerd?</h6>
                            <p>Uitslagen worden zo snel mogelijk na de gespeelde wedstrijd ingevoerd. Mocht dit niet
                                lukken,
                                dan zullen de uitslagen in ieder geval voor 12.00 uur op de volgende dag ingevoerd
                                worden.</p>
                            <h6 class="txt-blue fw-bolder">3. Wanneer worden de punten voor de bonusvragen
                                toegekend?</h6>
                            <p>Antwoorden op de bonusvragen worden na de poulefase ingevoerd. Zodra het antwoord op de desbetreffende
                                bonusvraag bekend is, zal deze worden ingevoerd en worden de
                                punten
                                daarvan direct toegekend. Sommige antwoorden zullen echter pas bekend zijn na afloop van
                                het
                                toernooi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useTournament} from "@/stores/content.js";

const tournament = useTournament();

const totalPoints = computed(() => {
    return knockoutPoints + matchPoints.value + bonusPoints.value
})

const knockoutPoints = (5 * 32) + (10 * 16) + (20 * 8) + (40 * 4) + (50 * 2)
const matchPoints = computed(() => {
    return (tournament.matches.length * 10)
})

const bonusPoints = computed(() => {
    let points = 0
    tournament.bonusQuestions.forEach(bonus => {
        points += bonus.points || 40
    })
    return points
})
</script>

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
