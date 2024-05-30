<template>
    {{ displayNumber }}
</template>

<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
    number: {type: Number, required: true},
})

const displayNumber = ref(0)

onMounted(() => {
    window.setInterval(() => {
        if(displayNumber.value !== props.number) {
            let change = (props.number - displayNumber.value) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
            displayNumber.value = displayNumber.value + change;
        }
    }, 40);
})
</script>


<style scoped lang="sass">

</style>