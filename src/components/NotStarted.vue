<template>
    <div class="border-orange d-inline-flex rounded-2 py-2 px-3 txt-orange">
        <i class="bi bi-exclamation-circle me-2"></i>{{ $t('errors.not_started') }}
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.border-orange
    border: 1px solid var(--pk-interaction-02)
</style>