<template>
    <div id="invul-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container-lg">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-0">{{ $t('menu.register') }}</h1>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-lg py-3 py-md-5">
            <div class="row justify-content-center">
                <div class="col-12">
                    <Stepper :currentStep="currentStep" :steps="[
                        {label: $t('forms.step1.title'), icon: ''},
                        {label: $t('forms.step2.title'), icon: ''},
                        {label: $t('forms.step3.title'), icon: ''},
                        {label: $t('forms.step4.title'), icon: ''},
                        {label: $t('forms.step5.title'), icon: ''},
                        {label: $t('forms.step6.title'), icon: ''},
                        {label: $t('forms.step7.title'), icon: ''},
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
                                <h3 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step1.sub_title') }}</h3>
                                <p>{{ $t('forms.step1.p1') }}</p>
                                <p v-html="$t('forms.step1.p2', { countries: teams.length, matches: tournament.matches.length })"></p>
                                <p>{{ $t('forms.step1.p3') }}</p>
                                <p>{{ $t('forms.step1.p4') }}
                                    <RouterLink :to="{name: 'rules'}">{{ $t('menu.rules') }}</RouterLink>
                                </p>
                                <p>{{ $t('forms.step1.p5') }}</p>

                                <div class="card rounded-4 mb-4 bg-body-tertiary">
                                    <div class="card-body">
                                        <div class="row g-4">
                                            <!-- name -->
                                            <div class="col-md-6">
                                                <label class="form-label" for="naam">{{ $t('forms.step1.name') }}</label>
                                                <input
                                                    id="naam"
                                                    v-model="player.name"
                                                    :placeholder="$t('forms.step1.name')"
                                                    autocomplete="name"
                                                    class="form-control"
                                                    form="form1"
                                                    name="name"
                                                    required
                                                    type="text">
                                                <div class="invalid-feedback">
                                                    {{ $t('errors.required') }}
                                                </div>
                                            </div>
                                            <!-- team name -->
                                            <div class="col-md-6">
                                                <label class="form-label" for="teamnaam">{{ $t('forms.step1.team_name') }}</label>
                                                <input
                                                    id="teamnaam"
                                                    v-model="player.team_name"
                                                    :class="['form-control', { 'is-invalid': isDuplicate && player.team_name }]"
                                                    :placeholder="$t('forms.step1.team_name')"
                                                    form="form1"
                                                    pattern="^[^+]*$"
                                                    required
                                                    type="text">
                                                <div class="invalid-feedback">
                                                    {{
                                                        isDuplicate ? $t('errors.already_chosen') :
                                                            player.team_name.includes('+') ? $t('errors.forbidden_char') :
                                                                $t('errors.required')
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                        <FormError v-if="wasValidated && !isValid" class="mt-3"/>
                                    </div>
                                </div>

                                <ButtonBar :form="'form1'" is-first @save="save">
                                    <button
                                        v-if="saveState"
                                        class="btn-wc26 btn-wc26-lightblue w-fit"
                                        type="button"
                                        @click="loadSavedPlayer">
                                        {{ $t('forms.continue') }}
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
                                <h3 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step2.title') }}</h3>
                                <p>{{ $t('forms.step2.p1') }}</p>
                                <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-orange-alt w-fit"
                                        type="button"
                                        @click="randomize('poule')">{{ $t('forms.random') }}
                                    </button>
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetPoule">{{ $t('forms.reset') }}
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
                                <ButtonBar @previous="previous" @save="save"/>
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
                                <h3 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step3.title') }}</h3>

                                <div class="mb-4">
                                    <p v-html="$t('forms.step3.p1')"></p>
                                    <p>
                                        <strong>{{ $t('dict.please_note') }}</strong><br>
                                        {{ $t('forms.step3.p2') }}
                                    </p>
                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="getPredictedPoules">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('round_of_32')">{{ $t('forms.random') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                            type="button"
                                            @click="reset32">{{ $t('forms.reset') }}
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
                                <ButtonBar @previous="previous" @save="save"/>
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
                                <h3 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step4.title') }}</h3>

                                <div class="mb-4">
                                    <p v-html="$t('forms.step4.p1')"></p>
                                    <p>
                                        <strong>{{ $t('dict.please_note') }}</strong><br>
                                        {{ $t('forms.step3.p2') }}
                                    </p>
                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('round_of_32', 'round_of_16')">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('round_of_16')">{{ $t('forms.random') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                            type="button"
                                            @click="reset16">{{ $t('forms.reset') }}
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
                                <ButtonBar @previous="previous" @save="save"/>
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
                                <h3 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step5.title') }}</h3>
                                <p v-html="$t('forms.step5.p1')"></p>
                                <p>
                                    <strong>{{ $t('dict.please_note') }}</strong><br>
                                    {{ $t('forms.step3.p2') }}
                                </p>

                                <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetFinals">{{ $t('forms.reset') }}
                                    </button>
                                </div>
                                <div class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">{{ capitalize($t('dict.quarter_finals')) }}</h4>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('round_of_16', 'quarter_finals')">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('quarter_finals')">{{ $t('forms.random') }}
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
                                    <h4 class="fw-bolder w26-condensed mb-3">{{ capitalize($t('dict.semi_finals')) }}</h4>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('quarter_finals', 'semi_finals')">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('semi_finals')">{{ $t('forms.random') }}
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
                                    <h4 class="fw-bolder w26-condensed mb-3">{{ capitalize($t('dict.bronze_final')) }}</h4>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('semi_finals', 'bronze_final')">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('bronze_final')">{{ $t('forms.random') }}
                                        </button>
                                    </div>
                                    <!-- table -->
                                    <div class="w-100 overflow-hidden overflow-x-auto">
                                        <table class="table align-middle">
                                            <TableHead/>
                                            <tbody>
                                            <TableRow
                                                v-for="match in tournament.matchesByPouleName('bronze_final')"
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
                                    <h4 class="fw-bolder w26-condensed mb-3">{{ capitalize($t('dict.final')) }}</h4>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="setTeamsForRound('semi_finals', 'final')">{{ $t('forms.auto-fill') }}
                                        </button>
                                        <button
                                            class="btn-wc26 btn-wc26-orange-alt w-fit"
                                            type="button"
                                            @click="randomize('final')">{{ $t('forms.random') }}
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
                                <ButtonBar @previous="previous" @save="save"/>
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
                                <h2 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step6.title') }}</h2>

                                <p>{{ $t('forms.step6.p1') }}</p>
                                <p>
                                    <strong>{{ $t('dict.tip') }}</strong><br>
                                    {{ $t('forms.step6.p2') }}
                                </p>

                                <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                    <button
                                        class="btn-wc26 btn-wc26-lightblue-alt w-fit"
                                        type="button"
                                        @click="resetBonus">{{ $t('forms.reset') }}
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
                                                    }}{{ $t('dict.points_abbr') }}</span></label>
                                                <select
                                                    v-if="q.answer_type === 'team'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-select"
                                                    form="form6"
                                                    required>
                                                    <option :value="''">{{ $t('forms.please_pick') }}</option>
                                                    <option v-for="t in teams.sort((a, b) => a.id.localeCompare(b.id))" :value="t.id">
                                                        {{ $t('countries.' + t.id) }}
                                                    </option>
                                                </select>
                                                <select
                                                    v-if="q.answer_type === 'player'"
                                                    :id="'q_' + idx"
                                                    v-model="player.bonus[idx]"
                                                    class="form-select"
                                                    form="form6"
                                                    required>
                                                    <option :value="''">{{ $t('forms.please_pick') }}</option>
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
                                                    form="form6"
                                                    inputmode="numeric"
                                                    min="0"
                                                    pattern="[0-9]*"
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
                                                <div class="invalid-feedback">
                                                    {{ $t('errors.required') }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar @previous="previous" @save="save"/>
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
                                <h2 class="fw-bolder w26-condensed mb-3">{{ $t('forms.step7.title') }}</h2>
                                <p>{{ $t('forms.step7.p1') }}</p>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">1. {{ $t('forms.step7.check.title') }}</h4>
                                    <p>{{ $t('forms.step7.check.p1') }}</p>
                                    <p>
                                        <strong>{{ $t('dict.please_note') }}</strong><br>
                                        {{ $t('forms.step7.check.p2') }}
                                    </p>

                                    <template v-for="round in roundNames">
                                        <h6 class="fw-bolder w26-condensed mb-3">{{ capitalize($t('dict.' + round)) }}</h6>
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
                                    <h4 class="fw-bolder w26-condensed mb-3">2. {{ $t('forms.step7.download.title') }}</h4>
                                    <p>{{ $t('forms.step7.download.p1') }}</p>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <button
                                            class="btn-wc26 btn-wc26-lightblue w-fit"
                                            type="button"
                                            @click="downloadPlayerAsJSON"><i class="bi bi-filetype-json me-2"></i>{{ $t('cta.download') }}
                                        </button>
                                    </div>
                                </article>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">3. {{ $t('forms.step7.mail.title') }}</h4>
                                    <p>{{ $t('forms.step7.mail.p1') }}</p>

                                    <div class="d-inline-flex flex-wrap gap-1 mb-3">
                                        <a
                                            :href="'mailto:' + email + '?subject=' + mailSubject +  '&body=' + mailBody"
                                            rel="noopener noreferrer"
                                            target="_blank">
                                            <button class="btn-wc26 btn-wc26-lightblue w-fit" type="button">
                                                {{ $t('cta.mail_sheet') }}
                                            </button>
                                        </a>
                                    </div>
                                </article>

                                <article class="mb-4">
                                    <h4 class="fw-bolder w26-condensed mb-3">4. {{ $t('forms.step7.confirm.title') }}</h4>
                                    <p>{{ $t('forms.step7.confirm.p1') }}</p>
                                </article>


                                <FormError v-if="wasValidated && !isValid" class="mb-3"/>
                                <ButtonBar is-last @previous="previous" @save="save"/>
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
import {calculateAndAssignThirds, capitalize, determineRoundOf16FromResults} from "@/helpers/magic.ts";
import FormError from "@/components/Invulsheet/FormError.vue";
import ButtonBar from "@/components/Invulsheet/ButtonBar.vue";
import TableHead from "@/components/Invulsheet/TableHead.vue";
import TableRow from "@/components/Invulsheet/TableRow.vue";
import Stepper from "@/components/Invulsheet/Stepper.vue";
import dayjs from "dayjs";
import {i18n} from "@/i18n";

const tournament = useTournament();
const {teams, teamImages, players} = storeToRefs(tournament);

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
    bronze_final: [],
    final: []
})

const wasValidated = ref(false);
const isValid = ref(false);
const predictedPouleStandings: Ref<Record<string, TeamStats>> = ref({});

const email = '1234@gmail.com'
const mailSubject = 'WK26%20invulsheet';
const mailBody = 'Ik%20schrijf%20me%20in%20voor%20de%20WK26%20Pool!%0A%0ANaam%3A%0AEmail%3A%0ATelefoonnummer%3A%0AVoeg%20mij%20toe%20aan%20de%20Whatsapp%20groep%3A%20Ja%2FNee%0A%0A------------------------------------------------------------------%0A%0ANa%20inzending%20ontvang%20je%20een%20betaallink%20van%20%E2%82%AC11.%20Wanneer%20deze%20is%20voldaan%20wordt%20jouw%20sheet%20toegevoegd%20aan%20de%20pool.%0A%5BVergeet%20jouw%20invulsheet%20niet%20bij%20te%20voegen!%5D%0A%0A%0A';
const roundNames = [
    'round_of_32',
    'round_of_16',
    'quarter_finals',
    'semi_finals',
    'bronze_final',
    'final'
] as const;

const isDuplicate = computed(() =>
    players.value
        .map(p => p.team_name.toLowerCase())
        .includes(player.value.team_name.toLowerCase())
)

/**
 * A computed property that calculates the teams advancing in each round of a tournament
 * based on player predictions.
 *
 * This object contains rounds mapped to an array of team names progressing through the
 * tournament structure. The rounds are defined by the `roundNames` array and include:
 * - round_of_32
 * - round_of_16
 * - quarter_finals
 * - semi_finals
 * - final
 *
 * The calculation is derived from player predictions, extracted based on the match number
 * and predicted teams for each match within a given round.
 *
 * @type {import('vue').ComputedRef<Record<string, string[]>>}
 */
const advancingTeams = computed(() => {
    type Round = typeof roundNames[number];

    let roundsWithTeams: Record<Round, string[]> = {
        round_of_32: [],
        round_of_16: [],
        quarter_finals: [],
        semi_finals: [],
        bronze_final: [],
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
 * @param {Object} params - The parameter object.
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

/**
 * Retrieves the image associated with the given team name. If no specific image is found for the provided team, a default image is returned.
 *
 * @param {string} team - The name of the team whose image is to be retrieved.
 * @return {string} The image URL associated with the team, or the default image URL if no match is found.
 */
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

/**
 * Moves to the previous step in a process and updates the validation state.
 *
 * @return {void} Does not return a value.
 */
function previous() {
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
    wasValidated.value = false;
    isValid.value = true;

    setTimeout(() => {
        if (!form.checkValidity() || isDuplicate.value) {
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
    }, 300);

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
    ['quarter_finals', 'semi_finals', 'bronze_final', 'final'].forEach((round: string) => {
        tournament.matchesByPouleName(round).forEach(match => {
            const pred = player.value.predictions.find(prediction => prediction.match === match.num)
            if (!pred) return
            pred.result = []
            pred.teams = ['', '']
        })
    })
    wasValidated.value = false;
}

/**
 * Resets the bonus values for each bonus question in a tournament.
 * Iterates over all bonus questions in the tournament and clears their corresponding player bonus values.
 * Also sets the validation state to false.
 *
 * @return {void} Does not return any value.
 */
function resetBonus() {
    tournament.bonusQuestions.forEach((q, idx) => {
        player.value.bonus[idx] = '';
    });
    wasValidated.value = false;
}

/**
 * Generates a pair of realistic scores biased towards lower values.
 *
 * @return {Array<number>} An array of two numbers representing realistic scores.
 */
function getRealisticScore(): [number, number] {
    const weights = [0, 1, 1, 2, 2, 3, 4]; // Bias toward lower scores
    const randomScore = () => weights[Math.floor(Math.random() * weights.length)];

    const isDraw = Math.random() < 0.188; // 18.8% chance of a draw

    if (isDraw) {
        const score = randomScore();
        return [score, score];
    } else {
        let home = randomScore();
        let away = randomScore();
        while (home === away) {
            away = randomScore(); // Ensure scores differ
        }
        return [home, away];
    }
}

/**
 * Randomizes the predictions for matches based on the specified phase of the tournament.
 * For the "poule" phase, it processes matches grouped by poules.
 * For other phases, it processes matches by their respective poule name.
 *
 * @param {string} phase - The current phase of the tournament. It determines which matches are processed.
 * @return {void} This function does not return any value.
 */
function randomize(phase: string) {

    if (phase === 'poule') {
        tournament.getPouleMatches.forEach(poule => {
            poule.matches.forEach(match => {
                let pred = player.value.predictions.find(pred => pred.match === match.num)
                if (pred) pred.result = getRealisticScore();
            })
        });
    } else {
        tournament.matchesByPouleName(phase).forEach(match => {
            let pred = player.value.predictions.find(pred => pred.match === match.num)
            if (pred) pred.result = getRealisticScore();
        })
    }
}

/**
 * Populates player predictions with match data from the tournament structure.
 * Adds predictions for poule matches, round of 32 matches, and round of 16 matches.
 * Predictions include match numbers, random results for debugging purposes, and participating teams.
 *
 * @return {void} Does not return any value, the method modifies the `player.value.predictions` object in place.
 */
function prepare() {
    let debug = false;
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
    ['round_of_32', 'round_of_16', 'quarter_finals', 'semi_finals', 'bronze_final', 'final'].forEach((round: string) => {
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
    window.alert(i18n.global.t('forms.saved'));
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

/**
 * Loads the saved player data from the save state and updates the current player and game step.
 *
 * @return {void} Does not return a value.
 */
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
    let sheet = {...player.value, ...advancingTeams.value};
    const dataStr = JSON.stringify(sheet, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${player.value.team_name}-${dayjs().format('DDMMYYYY')}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100)

}

watch(currentStep, () => {
    setTimeout(() => window.scrollTo({top: 0, behavior: "instant"}), 200)
})

onBeforeMount(() => prepare());

</script>

<style lang="sass" scoped></style>
