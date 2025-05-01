<template>
    <div class="d-flex flex-wrap gap-3">
        <slot></slot>
        <div v-if="!isFirst">
            <button
                class="btn-wc26 btn-wc26-lightblue w-fit"
                type="button"
                @click="$emit('previous')">
                Vorige
            </button>
        </div>
        <button
            class="btn-wc26 btn-wc26-lightblue-alt w-fit"
            type="button"
            @click="$emit('save')">
            Opslaan
        </button>
        <div v-if="!isLast" class="ms-auto">
            <button
                :form="form"
                class="btn-wc26 btn-wc26-lightblue w-fit"
                type="submit">
                Volgende
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['previous', 'save'])
const props = defineProps<{
    form?: string,
    isFirst?: boolean,
    isLast?: boolean,
}>();
</script>

<style scoped lang="sass">

</style>