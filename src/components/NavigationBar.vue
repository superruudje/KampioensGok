<template>
    <nav class="navbar navbar-expand-md sticky-top bg-26-primary-01">
        <div class="container-fluid gap-3 justify-content-start px-md-4">
            <RouterLink :to="'/'" class="navbar-brand p-0 me-auto me-md-4">
                <img alt="logo" class="logo" src="@/assets/images/wc26.png"/>
            </RouterLink>
            <div
                id="navbarSupportedContent"
                class="collapse navbar-collapse overflow-x-auto">
                <ul class="navbar-nav me-auto mb-0">
                    <li v-for="(page, i) in pages" class="nav-item d-flex align-items-center h-100">
                        <RouterLink
                            :to="{name: page}"
                            activeClass="active"
                            class="link px-3 py-2 text-capitalize">
                            <span class="text-nowrap">{{ $t('menu.' + page) }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <LanguageSwitcher/>
            <div class="d-md-none dropdown">
                <button
                    aria-expanded="false"
                    class="btn bg-transparent border text-light py-1"
                    data-bs-toggle="dropdown"
                    type="button">
                    <i class="bi bi-list"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li v-for="(page, i) in pages">
                        <RouterLink
                            :to="{name: page}"
                            activeClass="active"
                            class="dropdown-item text-capitalize text-nowrap">
                            {{ $t('menu.' + page) }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const pages = ['matches', 'groups', 'statistics', 'ranking', 'rules', 'register', 'my-page'];
</script>

<style lang="sass" scoped>
.navbar
    height: 54px
    background-image: url('@/assets/images/bg_pattern.png')
    background-position: center top
    background-size: cover
    background-repeat: no-repeat

    .logo
        height: 32px

.dropdown-item.active
    color: var(--pk-elevation-01--dark)
    background-color: var(--pk-interaction)

#mobile-menu
    position: fixed
    bottom: 20px
    left: 24px
    z-index: 99

@media (min-width: 768px)
    .navbar
        height: 80px

        .logo
            height: 38px
    .navbar-nav li .link
        color: #fff
        text-decoration: none
        border-radius: 9999px

        &:hover
            color: var(--pk-interaction)

        &.active
            color: var(--pk-elevation-01--dark)
            background-color: var(--pk-interaction)
</style>