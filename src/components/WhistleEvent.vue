
<template>
    <div class="position-relative z-1 d-flex justify-content-around align-items-baseline w-100">
        <div class="py-1" :class="type === 'full_time' ? 'bg-black text-white px-1' : 'bg-secondary-subtle px-3'">
            <span class="d-flex align-items-center gap-2">
                <img v-if="type === 'default'" :src="WhistleIcon" alt="whistle" class="whistle-icon">
                <span class="fs-8">{{ label }}</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import WhistleIcon from '@/assets/icons/whistle.svg';

withDefaults(defineProps<{
    label: string,
    type?: 'default' | 'full_time',
}>(), {
    type: 'default',
})
</script>

<style scoped lang="sass">

</style>