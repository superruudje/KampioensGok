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
                                    :to="{name: 'home'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.home') }}
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'matches'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.matches') }}
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'groups'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.groups') }}
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'statistics'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.statistics') }}
                                </RouterLink>
                            </div>
                            <div class="d-flex flex-column">
                                <RouterLink
                                    :to="{name: 'ranking'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.ranking') }}
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'rules'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.rules') }}
                                </RouterLink>
                                <RouterLink
                                    :to="{name: 'register'}"
                                    class="text-light text-decoration-none small">
                                    {{ $t('menu.register') }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <h3 class="w26-condensed fs-5 text-uppercase">{{ $t('footer.visit') }}</h3>
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
                    <h3 class="w26-condensed fs-5 text-uppercase">{{ $t('footer.made_by')}} <a class="w26-condensed text-light"
                                                              href="https://github.com/superruudje"
                                                              target="_blank"
                    >SUPERRUUDJE</a></h3>
                    <div class="d-flex flex-column gap-1">
                        <a
                            class="text-light text-decoration-none small"
                            href="https://ko-fi.com/superruudje"
                            target="_blank">{{ $t('footer.thank_me') }}
                        </a>
                        <div>
                            <a
                                href="https://ko-fi.com/superruudje"
                                target="_blank">
                                <img width="160px" src="@/assets/images/support_me_on_kofi_dark.png" alt="Ko-fi">
                            </a>
                        </div>
                        <span class="small">
                            {{ $t('footer.github') }}
                            <a
                                class="text-light"
                                href="https://github.com/superruudje/KampioensGok"
                                target="_blank">GitHub</a>.
                        </span>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <p class="text-center opacity-50 fw-lighter small mb-0">{{ $t('footer.line_1', {year: dayjs().year()}) }}</p>
                    <p class="text-center opacity-50 fw-lighter small">{{ $t('footer.line_2') }}</p>
                </div>
            </div>
        </div>
        <div class="d-sm-none" style="height: 75px"></div>
    </div>
</template>

<script setup>
import dayjs from "dayjs";
</script>

<style lang="sass" scoped></style>
