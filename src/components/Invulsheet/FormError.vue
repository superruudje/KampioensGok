<template>
    <div
        class="shake-me bg-danger rounded-3 py-2 px-3 text-white small">
        {{ message ? message : $t('errors.check_form') }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message?: string,
}>()
</script>

<style scoped lang="sass">
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