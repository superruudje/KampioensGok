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
                            <h3 class="fw-bolder txt-blue w26-condensed mb-3">{{ $t('rules.point_system') }}</h3>
                            <p>{{ $t('rules.text_1') }}</p>
                            <p v-html="$t('rules.points_total', { points: totalPoints })"></p>

                            <article class="mb-5">
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
                                            <th class="txt-orange" scope="col">{{ $t('dict.result') }}*</th>
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
                                <div class="small" v-html="$t('rules.result_help')"></div>
                            </article>
                            <article class="mb-5">
                                <h5 class="txt-blue fw-bolder">Knock-out</h5>
                                <p>{{$t('rules.knockout_text')}}</p>
                                <p v-html="$t('rules.points_total', { points: knockoutPoints })"></p>
                                <ul>
                                    <li v-html="$t('rules.knockout1')"></li>
                                    <li v-html="$t('rules.knockout2')"></li>
                                    <li v-html="$t('rules.knockout3')"></li>
                                    <li v-html="$t('rules.knockout4')"></li>
                                    <li v-html="$t('rules.knockout5')"></li>
                                </ul>
                            </article>
                            <article>
                                <h5 class="txt-blue fw-bolder">{{ capitalize($t('dict.bonus_questions')) }}</h5>
                                <p v-html="$t('rules.bonus_text')"></p>
                                <ul>
                                    <li v-html="$t('rules.bonus1')"></li>
                                    <li v-html="$t('rules.bonus2')"></li>
                                    <li v-html="$t('rules.bonus3')"></li>
                                </ul>
                                <p v-html="$t('rules.points_total', { points: bonusPoints })"></p>
                            </article>
                        </div>
                    </div>
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder txt-blue w26-condensed mb-3">{{ $t('rules.prize_pool') }}</h3>
                            <p>{{ $t('rules.prize_text') }}</p>
                            <RouterLink :to="{name: 'register'}">
                                <button class="btn-wc26 btn-wc26-orange-alt w-fit">{{ $t('cta.join') }}</button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card rounded-4">
                        <div class="card-body p-3 p-md-4">
                            <h3 class="fw-bolder txt-blue w26-condensed mb-3">FAQ</h3>
                            <h6 class="txt-blue fw-bolder">1. {{ $t('faq.faq1') }}</h6>
                            <p>{{ $t('faq.ans1') }}</p>
                            <h6 class="txt-blue fw-bolder">2. {{ $t('faq.faq2') }}</h6>
                            <p>{{ $t('faq.ans2') }}</p>
                            <h6 class="txt-blue fw-bolder">3. {{ $t('faq.faq3') }}</h6>
                            <p>{{ $t('faq.ans3') }}</p>
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
import {capitalize} from "../helpers/magic.ts";

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
