<template>
    <div class="stars position-relative">
        <span v-for="i in 5" class="star float-me" :class="color">&#9733;</span>
    </div>
</template>

<script setup>
defineProps({
    color: { type: String, default: "txt-orange" },
})
</script>
<style lang="css" scoped>
.stars .star {
    position: absolute;
    left: 5%;
    bottom: 50%;
    opacity: 0;
    animation: star-float 3s infinite;
    transform-origin: 50% 100%;
}

.stars .star:nth-child(2) {
    left: 10%;
    animation-delay: 0.25s;
}

.stars .star:nth-child(3) {
    left: 80%;
    animation-delay: 1s;
}

.stars .star:nth-child(5) {
    left: 60%;
    bottom: 80%;
    animation-delay: 1.75s;
}

.stars .star:nth-child(4) {
    left: 35%;
    animation-delay: 1.5s;
}


@keyframes star-float {
    0% {
        opacity: 1;
        transform: translate(0, 0) scale(0);
    }

    3% {
        transform: translate(0, 0) scale(1);
    }

    100% {
        opacity: 0;
        transform: translate(0, -2em) scale(1);
    }
}
</style>