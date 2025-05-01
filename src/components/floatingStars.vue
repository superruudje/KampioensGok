<template>
    <div class="stars position-relative">
        <span
            v-for="(star, index) in starPositions"
            :key="index"
            :style="{
        left: star.left,
        bottom: star.bottom,
        animationDelay: star.delay
      }"
            class="star float-me fs-5"
        >
      &#9733;
    </span>
    </div>
</template>

<script setup>

const starPositions = [
    {left: '5%', bottom: '50%', delay: '0s'},
    {left: '10%', bottom: '50%', delay: '0.25s'},
    {left: '80%', bottom: '50%', delay: '1s'},
    {left: '35%', bottom: '50%', delay: '1.5s'},
    {left: '60%', bottom: '80%', delay: '1.75s'},
    // Additional stars
    {left: '15%', bottom: '20%', delay: '0.4s'},
    {left: '70%', bottom: '25%', delay: '0.8s'},
    {left: '50%', bottom: '70%', delay: '1.2s'},
    {left: '30%', bottom: '10%', delay: '1.6s'},
    {left: '85%', bottom: '40%', delay: '2s'},
]

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
        transform: translate(0, -4em) scale(1);
    }
}
</style>