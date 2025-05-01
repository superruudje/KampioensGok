<template>
    <div class="task-indicator overflow-x-auto pb-3">
        <ol class="list w26-condensed">
            <template v-for="(step, idx) in steps">
                <li
                    :class="currentStep === idx + 1 ? 'current' : currentStep > idx + 1 ? 'completed click' : 'open'"
                    class="step"
                    @click="currentStep > idx + 1 ? $emit('goToStep', idx + 1) : null">
                    <div class="circle">
                         <span :aria-label="step.label" role="img">{{ currentStep > idx + 1 ? '' : idx + 1 }}
                         <i v-if="currentStep > idx + 1" class="bi bi-check"></i></span>
                    </div>
                    <p :class="{'fw-bold' : currentStep === idx + 1}" class="label">{{ step.label }}</p>
                </li>
                <li v-if="idx < steps.length - 1" class="line" :class="currentStep > idx + 1 ? 'completed' : ''"></li>
            </template>
        </ol>
    </div>
</template>

<script setup lang="ts">
defineEmits(['goToStep'])
defineProps<{
    currentStep: number,
    steps: { label: string, icon?: string }[]
}>()
</script>

<style scoped lang="sass"></style>
