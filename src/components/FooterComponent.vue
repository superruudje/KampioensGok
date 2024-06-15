<template>
    <div class="bg-blue py-5">
        <div class="container-xxl">
            <div class="row">
                <div class="col-md-4">
                    <floating-heart/>
                    <span class="d-block text-white mb-2">Made with <span class="txt-orange">&hearts;</span>, by <a class="text-white" href="https://github.com/superruudje" target="_blank">Superruudje</a></span>
                    <a @click="countClick" href="https://tikkie.me/pay/pq3l12vomn3bnlkjan1e" target="_blank" class="btn btn-sm btn-orange rounded-0 py-2 px-3" role="button">Stuur een bedankje!</a>
                </div>
            </div>
        </div>
        <div class="d-sm-none" style="height: 75px"></div>
    </div>
</template>

<script setup>
import { event } from 'vue-gtag'
import FloatingHeart from "@/components/floatingHeart.vue";

function countClick() {
    event('tikkie_click')
}
</script>


<style lang="sass" scoped>

</style>