<template>
    <header class="bg-blue py-3 py-md-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="fs-2 text-white fw-bolder">EK 2024</h1>
                    <h2 class="fs-6 mb-0 txt-orange fw-bolder">Invul sheet</h2>
                </div>
            </div>
        </div>
    </header>
    <main class="container-lg py-2 py-md-5">
        <div class="row">
            <form id="form1" ref="form1" :class="{ 'was-validated' : wasValidated }" class="col-12"
                  novalidate
                  onsubmit="return false" @submit="submit($event, form1)">
                <div class="row">
                    <div class="col-12">
                        <div class="card border-0 rounded-0 shadow-sm mb-3">
                            <div class="card-body p-2 p-md-4">
                                <h2 class="txt-blue fw-bolder">Persoonlijke gegevens</h2>

                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="naam">Naam</label>
                                        <input id="naam" v-model="prediction.name" class="form-control" form="form1"
                                               required type="text">
                                        <div class="invalid-feedback">
                                            Dit veld is verplicht.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="teamnaam">Teamnaam</label>
                                        <input id="teamnaam" v-model="prediction.team_name" class="form-control"
                                               form="form1" required type="text">
                                        <div class="invalid-feedback">
                                            Dit veld is verplicht.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="email">E-mail</label>
                                        <input id="email" v-model="prediction.email" class="form-control" form="form1"
                                               required type="email">
                                        <div class="invalid-feedback">
                                            Dit veld is verplicht.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row gy-3">
                    <div v-for="p in tournament.getPoules()" class="col">
                        <div class="card border-0 rounded-0 shadow-sm mb-3">
                            <div class="card-body p-2 p-md-4">
                                <h2 class="txt-blue fw-bolder">Groep {{ p.poule }}</h2>

                                <div class="w-100 overflow-hidden overflow-x-auto">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th class="txt-orange" scope="col">Nr.</th>
                                            <th class="txt-orange" scope="col">Team A</th>
                                            <th class="txt-orange" scope="col" style="width: 15%"></th>
                                            <th class="txt-orange" scope="col" style="width: 15%"></th>
                                            <th class="txt-orange" scope="col">Team B</th>
                                            <th class="txt-orange" scope="col">Datum</th>
                                            <th class="txt-orange" scope="col">Tijd</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(m, idx) in matches.filter(m => m.group === p.poule)">
                                            <td>{{ m.num }}</td>
                                            <td class="text-nowrap">
                                                <img :src="getImage(m.teams[0])" alt="" loading="lazy" width="30px"/>
                                                <span class="ms-2 txt-blue fw-bold">{{ getTeamName(m.teams[0]) }}</span>
                                            </td>
                                            <td>
                                                <input @keyup="gotoNext($event)"
                                                    v-model="prediction.predictions.find(pre => pre.match === m.num).score[0]"
                                                    class="form-control form-control-sm" form="form1" min="0"
                                                    placeholder="0" required type="number"/>
                                            </td>
                                            <td>
                                                <input @keyup="gotoNext($event)"
                                                    v-model="prediction.predictions.find(pre => pre.match === m.num).score[1]"
                                                    class="form-control form-control-sm" form="form1" placeholder="0"
                                                    required type="number"/>
                                            </td>
                                            <td class="text-nowrap">
                                                <img :src="getImage(m.teams[1])" alt="" loading="lazy" width="30px"/>
                                                <span class="ms-2 txt-blue fw-bold">{{ getTeamName(m.teams[1]) }}</span>
                                            </td>
                                            <td class="text-nowrap">{{ m.date }}</td>
                                            <td class="text-nowrap">{{ m.time }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row gy-3">
                    <div class="col">
                        <div class="card border-0 rounded-0 shadow-sm mb-3">
                            <div class="card-body p-2 p-md-4">
                                <h2 class="txt-blue fw-bolder">Knock-out</h2>
                                <div class="row">
                                    <div class="col-3">
                                        <div class="w-100 overflow-hidden overflow-x-auto">
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th class="txt-orange" scope="col">Nr.</th>
                                                    <th class="txt-orange" scope="col"></th>
                                                    <th class="txt-orange" scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(m, idx) in matches_knockout">
                                                    <td>{{ m.num }}</td>
                                                    <td>
                                                        <input @keyup="gotoNext($event)"
                                                            v-model="prediction.predictions.find(pre => pre.match === m.num).score[0]"
                                                            class="form-control form-control-sm"
                                                            form="form1"
                                                            min="0" placeholder="0" required
                                                            type="number"/>
                                                    </td>
                                                    <td>
                                                        <input @keyup="gotoNext($event)"
                                                            v-model="prediction.predictions.find(pre => pre.match === m.num).score[1]"
                                                            class="form-control form-control-sm"
                                                            form="form1"
                                                            min="0" placeholder="0" required
                                                            type="number"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="w-100 overflow-hidden overflow-x-auto">
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th class="txt-orange" scope="col"></th>
                                                    <th class="txt-orange" scope="col">Team A</th>
                                                    <th class="txt-orange" scope="col"></th>
                                                    <th class="txt-orange" scope="col">Team B</th>
                                                    <th class="txt-orange" scope="col">Datum</th>
                                                    <th class="txt-orange" scope="col">Tijd</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(m, idx) in matches_knockout">
                                                    <td>
                                                        <img
                                                            :src="getImage(prediction.predictions.find(pre => pre.match === m.num).teams[0])"
                                                            alt="" loading="lazy" width="30px"/>
                                                    </td>
                                                    <td>
                                                        <select
                                                            v-model="prediction.predictions.find(pre => pre.match === m.num).teams[0]"
                                                            class="form-select form-select-sm"
                                                            form="form1"
                                                            required>
                                                            <option :value="''">{{ m.teams[0] }}</option>
                                                            <option v-for="t in teams" :value="t.id">{{ t.name }}</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <img
                                                            :src="getImage(prediction.predictions.find(pre => pre.match === m.num).teams[1])"
                                                            alt="" loading="lazy" width="30px"/>
                                                    </td>
                                                    <td>
                                                        <select
                                                            v-model="prediction.predictions.find(pre => pre.match === m.num).teams[1]"
                                                            class="form-select form-select-sm"
                                                            form="form1"
                                                            required>
                                                            <option :value="''">{{ m.teams[1] }}</option>
                                                            <option v-for="t in teams" :value="t.id">{{ t.name }}</option>
                                                        </select>
                                                    </td>
                                                    <td class="text-nowrap">{{ m.date }}</td>
                                                    <td class="text-nowrap">{{ m.time }}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card border-0 rounded-0 shadow-sm mb-3">
                            <div class="card-body p-2 p-md-4">
                                <h2 class="txt-blue fw-bolder">Bonusvragen</h2>

                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Welk land wordt Europees
                                            kampioen?</label>
                                        <select id="kampioen" v-model="prediction.bonus[0]" class="form-select"
                                                form="form1" required>
                                            <option :value="undefined">Maak een keuze...</option>
                                            <option v-for="t in teams" :value="t.id">{{ t.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Hoeveel goals worden er totaal
                                            gescoord?</label>
                                        <input id="kampioen" v-model="prediction.bonus[1]" class="form-control" form="form1"
                                               min="0" placeholder="0" required type="number">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Hoeveel kaarten worden er in het
                                            toernooi gegeven?</label>
                                        <input id="kampioen" v-model="prediction.bonus[2]" class="form-control" form="form1"
                                               min="0" placeholder="0" required type="number">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Welk land krijgt de meeste tegengoals?</label>
                                        <select id="kampioen" v-model="prediction.bonus[3]" class="form-select"
                                                form="form1" required>
                                            <option :value="undefined">Maak een keuze...</option>
                                            <option v-for="t in teams" :value="t.id">{{ t.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Welk land krijgt de meeste kaarten?</label>
                                        <select id="kampioen" v-model="prediction.bonus[4]" class="form-select"
                                                form="form1" required>
                                            <option :value="undefined">Maak een keuze...</option>
                                            <option v-for="t in teams" :value="t.id">{{ t.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Wie wordt er topscorer?</label>
                                        <input id="kampioen" v-model="prediction.bonus[5]" class="form-control" form="form1"
                                               placeholder="John, D." required type="text">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Wie wordt de koning van de assist?</label>
                                        <input id="kampioen" v-model="prediction.bonus[6]" class="form-control" form="form1"
                                               placeholder="John, D." required type="text">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Welke Nederlander scoort het eerste doelpunt?</label>
                                        <input id="kampioen" v-model="prediction.bonus[7]" class="form-control" form="form1"
                                               placeholder="John, D." required type="text">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="kampioen">Welke Nederlander krijgt de eerste kaart?</label>
                                        <input id="kampioen" v-model="prediction.bonus[8]" class="form-control" form="form1"
                                               placeholder="John, D." required type="text">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="wasValidated && !isValid" class="shake-me bg-danger py-2 px-3 mb-3 text-white small">Controleer formulier!</div>
                <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3" type="submit" form="form1">Kopieer voorspellingen
                </button>
                <button @click="resetForm" class="ms-2 btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3" type="button" >Reset formulier
                </button>
            </form>
        </div>
    </main>
</template>

<script setup>
import {useTournament} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";

const tournament = useTournament();
const {matches_to_play_poule, teams, teamImages, matches_to_play_knock_out} = storeToRefs(tournament)

const matches = ref([])
const matches_knockout = ref([])
const prediction = ref({
    name: '',
    email: '',
    team_name: '',
    predictions: [],
    bonus: [],
    round_of_16: [],
    quarter_finals: [],
    semi_finals: [],
    finals: []
})

const wasValidated = ref(false)
const isValid = ref(false)
const form1 = ref(null);

/**
 * round_of_16 teams
 * @type {ComputedRef<[string]>}
 */
const round_of_16 = computed(() => {
    let list = []
    prediction.value.predictions.filter(m => m.match >= 37 && m.match < 45).forEach(m => {
        list = list.concat(m.teams)
    });
    return list
})

/**
 * quarter_finals teams
 * @type {ComputedRef<*[]>}
 */
const quarter_finals = computed(() => {
    let list = []
    prediction.value.predictions.filter(m => m.match >= 45 && m.match < 49).forEach(m => {
        list = list.concat(m.teams)
    });
    return list
})

/**
 * semi_finals teams
 * @type {ComputedRef<*[]>}
 */
const semi_finals = computed(() => {
    let list = []
    prediction.value.predictions.filter(m => m.match >= 49 && m.match < 51).forEach(m => {
        list = list.concat(m.teams)
    });
    return list
})

/**
 * finals teams
 * @type {ComputedRef<*[]>}
 */
const finals = computed(() => {
    let list = []
    prediction.value.predictions.filter(m => m.match === 51).forEach(m => {
        list = list.concat(m.teams)
    });
    return list
})


/**
 * Return team image
 * @param name
 * @returns {*}
 */
function getImage(name) {
    return teamImages.value[name] || teamImages.value[`default`]
}


function getTeamName(id) {
    return teams.value.find((e) => e.id === id)?.name || id
}

/**
 * Get all games in poule fase
 */
function getPouleMatches() {
    matches_to_play_poule.value.forEach((match_day) => {
        match_day.matches.forEach((match) => {
            match.date = match_day.date
            matches.value.push(match)
        })
    })
}

/**
 * Get all games in knock-out fase
 */
function getKnockoutMatches() {
    matches_to_play_knock_out.value.forEach((match_day) => {
        match_day.matches.forEach((match) => {
            match.date = match_day.date
            matches_knockout.value.push(match)
        })
    })
}

/**
 * Go to next part of form or submit
 * @param event
 * @param form
 */
function submit(event, form) {
    if (!form.checkValidity()) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        wasValidated.value = true;
        isValid.value = false;
    } else {
        wasValidated.value = true
        isValid.value = true

        addFinalists()
        copyJSON();
    }
}

/**
 * Focus on next form input element
 * @param evt
 */
function gotoNext(evt) {
    const form = evt.target.form
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
    } else {
        const currentIndex = Array.from(form.elements).indexOf(evt.target);
        form.elements.item(
            currentIndex < form.elements.length - 1 ? currentIndex + 1 : 0
        ).focus();
    }
}

function addFinalists() {
    prediction.value.round_of_16 = round_of_16.value
    prediction.value.quarter_finals = quarter_finals.value
    prediction.value.semi_finals = semi_finals.value
    prediction.value.finals = finals.value
}

function resetForm() {
    matches.value = []
    matches_knockout.value = []
    prediction.value = {
        name: '',
        email: '',
        team_name: '',
        predictions: [],
        bonus: [],
        round_of_16: [],
        quarter_finals: [],
        semi_finals: [],
        finals: []
    }
    initialize()
}

/**
 * Copy players predictions
 * @returns {Promise<void>}
 */
async function copyJSON() {
    try {
        await navigator.clipboard.writeText(JSON.stringify(prediction.value))
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

/**
 * Set prediction default values
 */
function prepare() {
    matches.value.forEach((match) => {
        prediction.value.predictions.push({
            match: match.num,
            score: ['', '']
        })
    })
    matches_knockout.value.forEach((match) => {
        prediction.value.predictions.push({
            match: match.num,
            score: ['', ''],
            teams: ['', '']
        })
    })
}

function initialize() {
    getPouleMatches()
    getKnockoutMatches()
    prepare()
}

onMounted(() => {
    initialize()
})

</script>

<style lang="sass" scoped>
.shake-me
    -webkit-animation: shake .5s linear
    @-webkit-keyframes shake
        8%, 41%
            -webkit-transform: translateX(-10px)
        25%, 58%
            -webkit-transform: translateX(10px)
        75%
            -webkit-transform: translateX(-5px)
        92%
            -webkit-transform: translateX(5px)
        0%, 100%
            -webkit-transform: translateX(0)

</style>
