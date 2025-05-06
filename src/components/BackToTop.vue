<template>
    <button
        id="back-to-top"
        :class="[show ? 'd-block' : 'd-none']"
        class="btn-wc26 sm btn-wc26-lightblue-alt w-fit"
        title="Go to top"
        @click="topFunction()">
        Top<i class="bi bi-arrow-up ms-2"></i>
    </button>
</template>

<script setup>
import {ref} from "vue";

const scrolled = 600;
const show = ref(false)
window.onscroll = function () {
    scrollFunction();
};

/**
 * Toggles the visibility of an element based on the scroll position of the document body or document element.
 * The `show.value` boolean is set to true if the scroll position exceeds 60, otherwise false.
 *
 * @return {void} This function does not return a value.
 */
function scrollFunction() {
    show.value = document.body.scrollTop > scrolled || document.documentElement.scrollTop > scrolled;
}

/**
 * Scrolls the document to the top of the page.
 *
 * @return {void} This function does not return a value.
 */
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
</script>

<style lang="sass" scoped>
#back-to-top
    position: fixed
    bottom: 20px
    right: 24px
    z-index: 99
@media (max-width: 576px)
    #back-to-top
        bottom: 90px
</style>