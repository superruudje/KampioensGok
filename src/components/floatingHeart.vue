<template>
    <div class="hearts position-relative">
        <span v-for="i in 5" class="heart float-me txt-orange">&hearts;</span>
    </div>
</template>

<script setup>

</script>
<style lang="css" scoped>
.hearts .heart {
    position: absolute;
    left: 5%;
    bottom: 50%;
    color: #e04b4b;
    opacity: 0;
    animation: heart-float 3s infinite;
    transform-origin: 50% 100%;
}

.hearts .heart:nth-child(2) {
    left: 10%;
    animation-delay: 0.25s;
}

.hearts .heart:nth-child(3) {
    left: 80%;
    animation-delay: 1s;
}

.hearts .heart:nth-child(5) {
    left: 60%;
    bottom: 80%;
    animation-delay: 1.75s;
}

.hearts .heart:nth-child(4) {
    left: 35%;
    animation-delay: 1.5s;
}


@keyframes heart-float {
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