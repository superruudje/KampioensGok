<template>
    <div class="d-sm-none bg-26-primary fixed-bottom">
        <nav class="d-flex align-items-center justify-content-around gap-2 p-3 pb-4">
            <RouterLink
                v-for="page in pages"
                :to="{name: page.url}"
                activeClass="active"
                class="mob-menu-bnt d-flex flex-column align-items-center p-2 rounded-3">
                <i :class="'bi-' + page.icon" class="bi fs-4 mb-0 lh-1"></i>
            </RouterLink>
        </nav>
    </div>
</template>

<script setup>
const pages = [
    {url: 'wedstrijden', icon: 'calendar-week-fill'},
    {url: 'poules', icon: 'list-ol'},
    {url: 'statistieken', icon: 'bar-chart-fill'},
    {url: 'ranglijst', icon: 'trophy-fill'},
    {url: 'spelregels', icon: 'journal-text'},
    {url: 'invulsheet', icon: 'ui-checks-grid'},
    {url: 'mijn pagina', icon: 'person-circle'}
]

</script>

<style lang="sass" scoped>
.mob-menu-bnt
    background-color: var(--pk-ui-01--dark)
    color: var(--pk-text-02--dark)
    &:hover, &.active
        background-color: var(--pk-ui-02--dark)
        color: var(--pk-interaction)

</style>
