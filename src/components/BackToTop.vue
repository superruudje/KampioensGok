<template>
    <button @click="topFunction()" id="myBtn" :class="[show ? 'd-block' : 'd-none']"
            class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3" title="Go to top">Top<i class="bi bi-arrow-up ms-2"></i></button>
</template>

<script setup>
import {ref} from "vue";

const show = ref(false)
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    show.value = document.body.scrollTop > 60 || document.documentElement.scrollTop > 60;
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
</script>

<style scoped lang="sass">
#myBtn
    position: fixed
    bottom: 20px
    right: 30px
    z-index: 99
</style>