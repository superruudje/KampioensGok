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
    {url: 'matches', icon: 'calendar-week-fill'},
    {url: 'groups', icon: 'list-ol'},
    {url: 'statistics', icon: 'bar-chart-fill'},
    {url: 'ranking', icon: 'trophy-fill'},
    {url: 'rules', icon: 'journal-text'},
    {url: 'register', icon: 'ui-checks-grid'},
    {url: 'my-page', icon: 'person-circle'}
]

</script>

<style lang="sass" scoped>
.mob-menu-bnt
    background-color: var(--pk-ui-01--dark)
    color: white
    &:hover, &.active
        background-color: var(--pk-ui-02--dark)
        color: var(--pk-interaction)

</style>
