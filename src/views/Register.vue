<template>
    <div id="invul-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">Invulsheet</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-lg py-3 py-md-5">
            <div class="row justify-content-center">
                <div class="col-12">
                    <Stepper :currentStep="currentStep" :steps="[
                        {label: 'Persoonlijke gegevens', icon: ''},
                        {label: 'Poulefase', icon: ''},
                        {label: 'Knockout I', icon: ''},
                        {label: 'Knockout II', icon: ''},
                        {label: 'Finales', icon: ''},
                        {label: 'Bonusvragen', icon: ''},
                        {label: 'Inzenden', icon: ''},
                    ]" class="mb-2" @go-to-step="(step) => currentStep = step"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <Transition name="slide-fade">
                        <form
                            v-if="currentStep === 1"
                            id="form1"
                            ref="form1"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form1'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="fw-bolder w26-condensed mb-3">Wat leuk dat je mee doet!</h3>
                                <p>Vul hieronder je gegevens in om deel te nemen aan deze spannende voetbalpool rondom het
                                    Wereldkampioenschap voetbal 2026.</p>

                                <p>Het toernooi wordt groter dan ooit: met <strong>{{ tournament.teams.length }}</strong> deelnemende landen
                                    en maar liefst <strong>{{ tournament.matches.length }}</strong> wedstrijden wordt het
                                    een WK om niet te missen. De wedstrijden vinden plaats in de Verenigde Staten, Mexico en Canada,
                                    verspreid over meerdere speelsteden.</p>

                                <p>Tijdens het toernooi kun je punten verdienen door uitslagen (deels) goed te voorspellen. Daarnaast zijn
                                    er bonuspunten te behalen voor het voorspellen van standen, statistieken en bonusvragen. Hoe beter je
                                    voorspelt, hoe hoger je op het klassement eindigt!</p>

                                <p>Meer weten over de puntentelling en de spelregels? Bekijk dan de
                                    <RouterLink :to="{name: 'rules'}">puntentelling en de spelregels</RouterLink>
                                    .
                                </p>
                                <p>Succes – en veel plezier met voorspellen!</p>


                                <div class="card rounded-4 mb-4 bg-body-tertiary">
                                    <div class="card-body">
                                        <div class="row g-4">
                                            <!-- name -->
                                            <div class="col-md-6">
                                                <label class="form-label" for="naam">Je volledige naam</label>
                                                <input
                                                    id="naam"
                                                    v-model="player.name"
                                                    autocomplete="name"
                                                    class="form-control"
                                                    form="form1"
                                                    name="name"
                                                    placeholder="Uw naam"
                                                    required
                                                    type="text">
                                                <div class="invalid-feedback">
                                                    Dit veld is verplicht.
                                                </div>
                                            </div>
                                            <!-- team name -->
                                            <div class="col-md-6">
                                                <label class="form-label" for="teamnaam">Je teamnaam</label>
                                                <input
                                                    id="teamnaam"
                                                    v-model="player.team_name"
                                                    class="form-control"
                                                    form="form1"
                                                    placeholder="Uw teamnaam"
                                                    required
                                                    type="text">
                                                <div class="invalid-feedback">
                                                    Dit veld is verplicht.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar :form="'form1'" is-first @save="save">
                                    <button
                                        v-if="saveState"
                                        class="btn-wc26 btn-wc26-lightblue w-fit"
                                        type="button"
                                        @click="loadSavedPlayer">
                                        Verder waar ik gebleven was
                                    </button>
                                </ButtonBar>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 2"
                            id="form2"
                            ref="form2"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form2'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="fw-bolder w26-condensed mb-3">Poulefase</h3>
                                <p class="font-book">In de poulefase van het WK 2026 strijden 48 landen verdeeld over 12 poules van 4 teams
                                    tegen elkaar.

                                    Voor elke wedstrijd in de poulefase moet je een uitslag invullen.

                                    Denk goed na over je voorspellingen — elk goed (of deels goed) antwoord levert punten op die meetellen
                                    voor het totaalklassement!
                                </p>
                                <div class="d-inline-flex gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetPoule">Reset
                                    </button>
                                </div>

                                <div class="d-flex flex-column gap-3 mb-4">
                                    <template
                                        v-for="poule in tournament.getPouleMatches"
                                        :key="poule.name">
                                        <h4 class="fw-bolder w26-condensed mb-1">Groep {{ poule.name }}</h4>
                                        <div class="w-100 overflow-hidden overflow-x-auto">
                                            <table class="table align-middle">
                                                <TableHead/>
                                                <tbody>
                                                <TableRow
                                                    v-for="match in poule.matches"
                                                    :key="match.num"
                                                    :match="match"
                                                    :prediction="getPrediction(match.num)"
                                                    :predictions="player.predictions"
                                                    disable-teams
                                                    form="form2"
                                                    @update:score="handleScoreUpdate"
                                                />
                                                </tbody>
                                            </table>
                                        </div>
                                    </template>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="pevious" @save="save"/>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 3"
                            id="form3"
                            ref="form3"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form3'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="fw-bolder w26-condensed mb-3">Knockout I</h3>

                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">Ronde van 32</h4>
                                    <p class="font-book">Vul nu de knockoutfase in voor de laatste 32 teams.
                                        Om de teams automatisch in te laten vullen op basis van jouw voorspellingen, klik je op
                                        de knop <b>‘Automatisch invullen’</b>. De poulewinnaars en de beste nummers drie worden dan
                                        berekend op basis van jouw eerder ingevulde voorspellingen uit stap 2.
                                        Je kunt de automatisch ingevulde teams nog handmatig aanpassen als je wilt. Controleer
                                        goed of alles naar wens is voordat je verdergaat naar de volgende ronde.</p>
                                    <p class="font-book"><strong>Let op:</strong><br>
                                        Je voorspelt de stand na 90 minuten speeltijd, dus zonder eventuele verlenging of strafschoppen. Bij
                                        een gelijk spel kun je de volgende fase selecteren welke team jij denkt dat er door gaat.</p>
                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="getPredictedPoules">Automatisch invullen
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                            type="button"
                                            @click="reset32">Reset
                                        </button>
                                    </div>

                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('round_of_32')"
                                                :key="match.num"
                                                :match="match"
                                                :prediction="getPrediction(match.num)"
                                                :predictions="player.predictions"
                                                form="form3"
                                                @update:team="handleTeamUpdate"
                                                @update:score="handleScoreUpdate"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="pevious" @save="save"/>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 4"
                            id="form4"
                            ref="form4"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form4'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="fw-bolder w26-condensed mb-3">Knockout II</h3>

                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">Ronde van 16</h4>
                                    <p class="font-book">Vul nu de knockoutfase in voor de laatste 16 teams.
                                        Om de teams automatisch in te laten vullen op basis van jouw voorspellingen, klik je op de
                                        knop <b>‘Automatisch invullen’</b>. De teams worden dan bepaald op basis van de uitslagen
                                        die jij hebt ingevuld in de eerste knockout-ronde (laatste 32).
                                        Je kunt de automatisch ingevulde teams daarna handmatig aanpassen als je wilt. Controleer
                                        goed of alles naar wens is voordat je verdergaat naar de volgende ronde.
                                    </p>
                                    <p class="font-book"><strong>Let op:</strong><br>
                                        Je voorspelt de stand na 90 minuten speeltijd, dus zonder eventuele verlenging of strafschoppen. Bij
                                        een gelijk spel kun je de volgende fase selecteren welke team jij denkt dat er door gaat.</p>
                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('round_of_32', 'round_of_16')">Automatisch invullen
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                            type="button"
                                            @click="reset16">Reset
                                        </button>
                                    </div>
                                    <!-- table -->
                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('round_of_16')"
                                                :key="match.num"
                                                :match="match"
                                                :prediction="getPrediction(match.num)"
                                                :predictions="player.predictions"
                                                form="form4"
                                                @update:team="handleTeamUpdate"
                                                @update:score="handleScoreUpdate"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="pevious" @save="save"/>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 5"
                            id="form5"
                            ref="form5"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form5'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h3 class="fw-bolder w26-condensed mb-3">Finales</h3>
                                <p class="font-book">Vul nu de finalerondes in: kwartfinales, halve finales en de finale.
                                    Om de teams automatisch in te laten vullen op basis van jouw voorspellingen, klik je op de
                                    knop <b>‘Automatisch invullen’</b>. De teams worden dan bepaald op basis van de uitslagen
                                    die jij hebt ingevuld in de vorige ronde.
                                    Je kunt de automatisch ingevulde teams daarna handmatig aanpassen als je wilt. Controleer
                                    goed of alles naar wens is voordat je verdergaat naar de volgende ronde.</p>
                                <p class="font-book"><strong>Let op:</strong><br>
                                    Je voorspelt de stand na 90 minuten speeltijd, dus zonder eventuele verlenging of strafschoppen.</p>

                                <div class="d-inline-flex gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetFinals">Reset
                                    </button>
                                </div>
                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">Kwartfinales</h4>

                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('round_of_16', 'quarter_finals')">Automatisch invullen
                                        </button>
                                    </div>
                                    <!-- table -->
                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('quarter_finals')"
                                                :key="match.num"
                                                :match="match"
                                                :prediction="getPrediction(match.num)"
                                                :predictions="player.predictions"
                                                form="form5"
                                                @update:team="handleTeamUpdate"
                                                @update:score="handleScoreUpdate"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">Halve-finales</h4>

                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('quarter_finals', 'semi_finals')">Automatisch invullen
                                        </button>
                                    </div>
                                    <!-- table -->
                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('semi_finals')"
                                                :key="match.num"
                                                :match="match"
                                                :prediction="getPrediction(match.num)"
                                                :predictions="player.predictions"
                                                form="form5"
                                                @update:team="handleTeamUpdate"
                                                @update:score="handleScoreUpdate"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">Finale</h4>

                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('semi_finals', 'final')">Automatisch invullen
                                        </button>
                                    </div>
                                    <!-- table -->
                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('final')"
                                                :key="match.num"
                                                :match="match"
                                                :prediction="getPrediction(match.num)"
                                                :predictions="player.predictions"
                                                form="form5"
                                                @update:team="handleTeamUpdate"
                                                @update:score="handleScoreUpdate"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="pevious" @save="save"/>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 6"
                            id="form6"
                            ref="form6"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form6'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h2 class="fw-bolder w26-condensed mb-3">Bonusvragen</h2>

                                <p class="font-book">Naast het voorspellen van de wedstrijden kun je extra punten verdienen met
                                    bonusvragen. Bij
                                    vragen waarbij een team of speler moet worden ingevuld, levert een goed antwoord 10 punten op.
                                    Voor inschattingsvragen worden er 40 punten toegekend als je het aantal exact voorspelt, 25
                                    punten als je er maximaal vijf naast zit, en 15 punten als je er maximaal tien naast zit. In
                                    totaal zijn er 215 punten te verdienen met de bonusvragen. Een goede score op deze vragen kan
                                    uiteindelijk het verschil maken in het klassement.</p>
                                <p class="font-book"><strong>Tip:</strong> De antwoorden die je bij de bonusvragen invult, hoeven
                                    niet overeen te komen met de voorspellingen die je eerder hebt gedaan bij de wedstrijden. Zo kun
                                    je ervoor kiezen om je kansen te spreiden en strategischer te spelen.</p>

                                <div class="d-inline-flex gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetBonus">Reset
                                    </button>
                                </div>

                                <div class="card rounded-4 mb-4 bg-body-tertiary">
                                    <div class="card-body">
                                        <div class="row g-4">
                                            <div
                                                v-for="(q, idx) in tournament.bonusQuestions"
                                                class="col-md-6">
                                                <label :for="'q_' + idx" class="form-label">{{ idx + 1 }}. {{ q.question }} <span
                                                    class="badge bg-26-interaction txt-pk-elevation-01">{{
                                                        q.points || '40'
                                                    }}pnt.</span></label>
                                                <select
                                                    v-if="q.answer_type === 'team'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-select"
                                                    form="form6"
                                                    required>
                                                    <option :value="''">Maak een keuze...</option>
                                                    <option v-for="t in teams" :value="t.id">{{ t.full_name }}</option>
                                                </select>
                                                <select
                                                    v-if="q.answer_type === 'player'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-select"
                                                    form="form6"
                                                    required>
                                                    <option :value="''">Maak een keuze...</option>
                                                    <template v-for="team in teams">
                                                        <option v-for="player in team.squad" :value="player">{{ team.short_name }} - {{
                                                                player
                                                            }}
                                                        </option>
                                                    </template>
                                                </select>
                                                <input
                                                    v-if="q.answer_type === 'number'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-control"
                                                    inputmode="numeric"
                                                    min="0"
                                                    pattern="[0-9]*"
                                                    form="form6"
                                                    placeholder="0"
                                                    required
                                                    type="text">
                                                <input
                                                    v-if="q.answer_type === 'string'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-control"
                                                    form="form6"
                                                    placeholder="Naam"
                                                    required
                                                    type="text">
                                                <div v-if="q.help" class="form-text">{{ q.help }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="pevious" @save="save"/>
                            </div>
                        </form>
                        <form
                            v-else-if="currentStep === 7"
                            id="form7"
                            ref="form7"
                            :class="{ 'was-validated' : wasValidated }"
                            class="card rounded-4"
                            novalidate
                            onsubmit="return false"
                            @submit="submit($event, $refs['form7'] as HTMLFormElement)">
                            <div class="card-body p-3 p-md-4">
                                <h2 class="fw-bolder w26-condensed mb-3">Inzenden</h2>
                                <p class="font-book">Volg onderstaande stappen om jouw deelname te voltooien. Controleer je voorspellingen
                                    zorgvuldig, download je inzending en stuur deze op naar de organisatie.</p>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">1. Controleer</h4>
                                    <p class="font-book">
                                        Neem alle ingevulde uitslagen en gekozen finalisten goed door. Pas eventuele fouten aan voordat je
                                        verdergaat.<br><strong>Let op:</strong> na inzending kunnen er geen aanpassingen meer worden gedaan
                                    </p>

                                    <template v-for="round in roundNames">
                                        <h6 class="fw-bolder w26-condensed mb-3">{{ round.replaceAll('_', ' ') }}</h6>
                                        <div class="d-flex flex-wrap align-items-center gap-3 mb-4">

                                            <div
                                                v-for="match in tournament.matchesByPouleName(round)"
                                                class="card rounded-2">
                                                <div class="card-body p-2">
                                                    <div class="d-flex align-items-center gap-1">
                                                        <img
                                                            :src="getImage(getPrediction(match.num)?.teams?.[0] || '')"
                                                            :title="getPrediction(match.num)?.teams?.[0]"
                                                            alt="team_flag"
                                                            class="border"
                                                            width="32"/>
                                                        <span>{{ getPrediction(match.num)?.result[0] }}</span>
                                                        <span> - </span>
                                                        <span>{{ getPrediction(match.num)?.result[1] }}</span>
                                                        <img
                                                            :src="getImage(getPrediction(match.num)?.teams?.[1] || '')"
                                                            :title="getPrediction(match.num)?.teams?.[1]"
                                                            alt="team_flag"
                                                            class="border"
                                                            width="32"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </article>


                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">2. Download jouw ingevulde sheet</h4>
                                    <p class="font-book">Klik op de downloadknop om jouw inzending op te slaan. Dit is een JSON-bestand met
                                        alle voorspellingen en
                                        gegevens die je hebt ingevuld. Bewaar deze goed.</p>

                                    <div class="d-inline-flex gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="downloadPlayerAsJSON"><i class="bi bi-filetype-json me-2"></i>Download
                                        </button>
                                    </div>
                                </article>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">3. Mail jouw sheet naar de organisatie</h4>
                                    <p class="font-book">Stuur het gedownloade bestand per e-mail naar de organisatie via <a
                                        :href="'mailto:wk26pool@gmail.com?subject=' + mailSubject +  '&body=' + mailBody"
                                        class=""
                                        target="_blank">[e-mailadres]</a>.
                                        Zorg dat je het juiste
                                        bestand meestuurt, zodat je deelname geldig is.
                                    </p>
                                </article>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">4. Wacht op bevestiging</h4>
                                    <p class="font-book">Na inzending ontvang je een betaallink van de organisatie. Wanneer deze is voldaan
                                        wordt jouw scheet toegevoegd aan de pool. Veel success!
                                    </p>
                                </article>


                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar is-last @previous="pevious" @save="save"/>
                            </div>
                        </form>
                    </Transition>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import {useTournament} from "@/stores/content.ts";
import {storeToRefs} from "pinia";
import {computed, onBeforeMount, type Ref, ref, watch} from "vue";
import type {MatchResult, Player} from "@/types/pool.ts";
import type {TeamStats} from "@/types/tournament.ts";
import {calculateAndAssignThirds, determineRoundOf16FromResults} from "@/helpers/magic.ts";
import FormError from "@/components/Invulsheet/FormError.vue";
import ButtonBar from "@/components/Invulsheet/ButtonBar.vue";
import TableHead from "@/components/Invulsheet/TableHead.vue";
import TableRow from "@/components/Invulsheet/TableRow.vue";
import Stepper from "@/components/Invulsheet/Stepper.vue";
import moment from "moment";

const tournament = useTournament();
const {teams, teamImages} = storeToRefs(tournament);

const currentStep: Ref<number> = ref(1);
const saveState: Ref<{ player: Player, step: number } | null> = ref(null);
const player: Ref<Player> = ref({
    name: '',
    team_name: '',
    predictions: [] as MatchResult[],
    bonus: [],
    round_of_32: [],
    round_of_16: [],
    quarter_finals: [],
    semi_finals: [],
    finals_bronze: [],
    finals: []
})

const wasValidated = ref(false);
const isValid = ref(false);
const predictedPouleStandings: Ref<Record<string, TeamStats>> = ref({});

const mailSubject = 'WK26%20invulsheet';
const mailBody = 'Ik%20schrijf%20me%20in%20voor%20de%20WK26%20Pool!%0A%0ANaam%3A%0AEmail%3A%0ATelefoonnummer%3A%0AVoeg%20mij%20toe%20aan%20de%20Whatsapp%20groep%3A%20Ja%2FNee%0A%0A------------------------------------------------------------------%0A%0ANa%20inzending%20ontvang%20je%20een%20betaallink%20van%20%E2%82%AC11.%20Wanneer%20deze%20is%20voldaan%20wordt%20jouw%20sheet%20toegevoegd%20aan%20de%20pool.%0A%5BVergeet%20jouw%20invulsheet%20niet%20bij%20te%20voegen!%5D%0A%0A%0A';
const roundNames = [
    'round_of_32',
    'round_of_16',
    'quarter_finals',
    'semi_finals',
    'final'
] as const;

const advancingTeams = computed(() => {
    type Round = typeof roundNames[number];

    let roundsWithTeams: Record<Round, string[]> = {
        round_of_32: [],
        round_of_16: [],
        quarter_finals: [],
        semi_finals: [],
        final: []
    };

    roundNames.forEach((round) => {
        const matches = tournament.matchesByPouleName(round);

        matches.forEach(match => {
            const prediction = player.value.predictions.find(p => p.match === match.num);
            if (prediction?.teams?.length === 2) {
                roundsWithTeams[round].push(...prediction.teams);
            }
        });
    });

    return roundsWithTeams;
})

/**
 * Retrieves the prediction for a specified match number.
 *
 * @param {number} matchNum - The match number for which the prediction is to be retrieved.
 * @return {Object|undefined} The prediction object if found, otherwise undefined.
 */
function getPrediction(matchNum: number) {
    return player.value.predictions.find(p => p.match === matchNum);
}

/**
 * Updates a team value in a specific prediction for the given match.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.match - The match identifier to locate the prediction*/
function handleTeamUpdate({match, teamIndex, value}: { match: number; teamIndex: number; value: string }) {
    let prediction = player.value.predictions.find(p => p.match === match);
    if (!prediction) return

    if (prediction.teams) prediction.teams[teamIndex] = value;
}

/**
 * Handles the update of a score for a specific team's prediction in a given match.
 *
 * @param {Object} params - The parameters for the score update.
 * @param {number} params.match - The identifier of the match for which the score needs to be updated.
 * @param {number} params.teamIndex - The index of the team whose score is being updated.
 * @param {number} params.value - The new score value to be assigned.
 * @return {void} No return value.
 */
function handleScoreUpdate({match, teamIndex, value}: { match: number; teamIndex: number; value: number }) {
    let prediction = player.value.predictions.find(p => p.match === match);
    if (!prediction) return

    if (prediction.result) prediction.result[teamIndex] = value;
}

/**
 * Predicts and retrieves the standings of poules based on the player's predictions.
 *
 * @return {object} An object containing the predicted standings for each poule. Each key represents
 * the position and poule name (e.g., "1A", "2A"), and each value corresponds to the team in that position.
 */
function getPredictedPoules() {
    const pouleTables = tournament.getPoules(player.value.predictions);
    predictedPouleStandings.value = {};
    pouleTables.forEach(pouleTable => {
        predictedPouleStandings.value['1' + pouleTable.name] = pouleTable.teams[0];
        predictedPouleStandings.value['2' + pouleTable.name] = pouleTable.teams[1];
        predictedPouleStandings.value['3' + pouleTable.name] = pouleTable.teams[2];
        predictedPouleStandings.value['4' + pouleTable.name] = pouleTable.teams[3];
    })

    const mapping = calculateAndAssignThirds(predictedPouleStandings.value);

    // loop though matches and assign teams to player's predictions
    tournament.matchesByPouleName('round_of_32').forEach(match => {
        let prediction = player.value.predictions.find(p => p.match === match.num);
        if (!prediction || !prediction.teams) return

        for (let i = 0; i < 2; i++) {
            const position = match.teams[i].length > 2 ? mapping[match.num] : match.teams[i]
            prediction.teams[i] = predictedPouleStandings.value[position]?.team || ''
        }
    })
}

function getImage(team: string) {
    return teamImages.value[team] || teamImages.value[`default`];
}

/**
 * Configures the teams participating in the specified round based on the results of the previous round.
 *
 * @param {string} previousRound - The identifier for the previous round, used to determine team progression.
 * @param {string} roundToPredict - The identifier for the round to set up teams for prediction.
 * @return {void} This method does not return a value.
 */
function setTeamsForRound(previousRound: string, roundToPredict: string) {
    const matchPredictions: MatchResult[] = [];
    tournament.matchesByPouleName(previousRound).forEach(match => {
        const pred = player.value.predictions.find(prediction => prediction.match === match.num)
        if (!pred) return
        matchPredictions.push(pred)
    })

    const mapping = determineRoundOf16FromResults(matchPredictions);

    // loop though matches and assign teams to player's predictions
    tournament.matchesByPouleName(roundToPredict).forEach(match => {
        let prediction = player.value.predictions.find(p => p.match === match.num);
        if (!prediction || !prediction.teams) return

        for (let i = 0; i < 2; i++) {
            prediction.teams[i] = mapping[match.num][i]
        }
    })
}

function pevious() {
    wasValidated.value = false;
    isValid.value = true;
    currentStep.value--;
}

/**
 * Go to next part of form or submit
 * @param event
 * @param form
 */
function submit(event: Event, form: HTMLFormElement) {
    if (!form.checkValidity()) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        wasValidated.value = true;
        isValid.value = false;
    } else {
        wasValidated.value = false;
        isValid.value = true;

        currentStep.value++;
    }
}

/**
 * Resets the predictions of all matches in the poule by clearing their results.
 * Iterates through all poule matches and checks for existing predictions. If a prediction is found for a match, its result is reset to an empty array.
 *
 * @return {void} This method does not return a value.
 */
function resetPoule() {
    tournament.getPouleMatches.forEach(poule => {
        poule.matches.forEach(match => {
            const pred = player.value.predictions.find(prediction => prediction.match === match.num)
            if (!pred) return
            pred.result = []
        })
    })
    reset32();
}

/**
 * Resets the predictions for all matches in the "round_of_32" poule.
 * Iterates over the matches in the specified poule and clears the result and team data
 * for each prediction associated with the match.
 *
 * @return {void} Does not return a value.
 */
function reset32() {
    tournament.matchesByPouleName('round_of_32').forEach(match => {
        const pred = player.value.predictions.find(prediction => prediction.match === match.num)
        if (!pred) return
        pred.result = []
        pred.teams = ['', '']
    })
    reset16();
}

/**
 * Resets the predictions for all matches in the "round_of_16" poule.
 * Iterates over the matches in the specified poule and clears the result and team data
 * for each prediction associated with the match.
 *
 * @return {void} Does not return a value.
 */
function reset16() {
    tournament.matchesByPouleName('round_of_16').forEach(match => {
        const pred = player.value.predictions.find(prediction => prediction.match === match.num)
        if (!pred) return
        pred.result = []
        pred.teams = ['', '']
    })
    resetFinals();
}

/**
 * Resets the final stages of a tournament by updating the predictions for matches
 * in the specified rounds ('round_of_32', 'round_of_16', 'quarter_finals', 'semi_finals', 'final').
 * Clears the result and teams information for each match prediction in these rounds.
 *
 * @return {void} Does not return a value, modifies predictions in place.
 */
function resetFinals() {
    ['quarter_finals', 'semi_finals', 'final'].forEach((round: string) => {
        tournament.matchesByPouleName(round).forEach(match => {
            const pred = player.value.predictions.find(prediction => prediction.match === match.num)
            if (!pred) return
            pred.result = []
            pred.teams = ['', '']
        })
    })
    wasValidated.value = false;
}

function resetBonus() {
    tournament.bonusQuestions.forEach((q, idx) => {
        player.value.bonus[idx] = '';
    });
    wasValidated.value = false;
}

/**
 * Populates player predictions with match data from the tournament structure.
 * Adds predictions for poule matches, round of 32 matches, and round of 16 matches.
 * Predictions include match numbers, random results for debugging purposes, and participating teams.
 *
 * @return {void} Does not return any value, the method modifies the `player.value.predictions` object in place.
 */
function prepare() {
    let debug = true;
    // add poule matches
    tournament.getPouleMatches.forEach(poule => {
        poule.matches.forEach(match => {
            const num = Math.floor(Math.random() * 5);
            player.value.predictions.push({
                match: match.num,
                result: debug ? [num, num + 1] : [],
                teams: match.teams
            })
        })
    });

    // add knockout matches
    ['round_of_32', 'round_of_16', 'quarter_finals', 'semi_finals', 'final'].forEach((round: string) => {
        tournament.matchesByPouleName(round).forEach(match => {
            const num = Math.floor(Math.random() * 5);
            player.value.predictions.push({
                match: match.num,
                result: debug ? [num, num + 1] : [],
                teams: ['', '']
            })
        })
    })

    // add bonus
    tournament.bonusQuestions.forEach(q => {
        player.value.bonus.push('');
    })

    getLocaleStorage();
}

/**
 * Saves the current state of the player's value to the browser's local storage.
 * The data is stored in a key-value format with the key "invulsheet".
 *
 * @return {void} Does not return a value.
 */
function save() {
    localStorage.setItem("invulsheet", JSON.stringify({player: player.value, step: currentStep.value}));
    window.alert('Formulier opgeslagen!');
}

/**
 * Checks if there is data stored in localStorage under the key "invulsheet".
 * If data is found, prompts the user with a confirmation dialog to continue editing
 * the saved form. If confirmed, merges the stored data with the current player values.
 *
 * @return {void} Does not return any value.
 */
function getLocaleStorage() {
    const invulsheet = localStorage.getItem("invulsheet");
    saveState.value = invulsheet ? JSON.parse(invulsheet) : null;
}

function loadSavedPlayer() {
    if (saveState.value) {
        Object.assign(player.value, saveState.value.player);
        currentStep.value = saveState.value.step;
    }
}

/**
 * Downloads the given player data as a JSON file.
 *
 * @return {void} This function does not return a value.
 */
function downloadPlayerAsJSON() {
    const dataStr = JSON.stringify(player.value, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${player.value.team_name}-${moment().format('DDMMYYYY')}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100)

}

watch(currentStep, () => {
    window.scrollTo({top: 0, behavior: "smooth"});
})

onBeforeMount(() => prepare());

</script>

<style lang="sass" scoped></style>
