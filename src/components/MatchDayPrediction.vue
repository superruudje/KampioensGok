<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item border-0">
            <h2 class="accordion-header">
                <button class="accordion-button px-0 fs-5 fw-medium txt-blue text-capitalize collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse_' + match_day" aria-expanded="false" :aria-controls="'collapse_' + match_day">
                    {{ localeDate }}
                    <span v-if="label.length > 1" class="fw-lighter ms-1 small">- {{label}}</span>
                </button>
            </h2>
            <div :id="'collapse_' + match_day" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body px-0">
                    <div class="row g-3">
                        <div :class="full ? 'col-12' : 'col-md-6'" v-for="(match) in matches">
                            <match-prediction :knockout="label.length > 1" :played="played" :name="name" :match="match"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MatchPrediction from "@/components/MatchPrediction.vue";
import {computed} from "vue";

const props = defineProps({
    match_day: {type: String, required: true},
    matches: {type: Array, required: true},
    name: {type: String, required: true},
    played: {type: Boolean, required: false, default: false},
    full: {type: Boolean, required: false, default: false},
})

const label = computed(() => {
    return props.matches.length ? props.matches[0].group : '-'
})

const localeDate = computed(() => {
    const dateParts = props.match_day.split("-");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return date ? new Date(date).toLocaleString('nl-NL', {
        weekday: 'short',
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : '-'
})


</script>

<style lang="sass" scoped>
.accordion
    --bs-accordion-btn-focus-box-shadow: 0
.match-group
    transform: skew(-8deg)
.accordion-button:not(.collapsed)
    background-color: transparent!important
    box-shadow: none
</style>