<template>
    <div id="home-view">
        <header class="bg-26-primary py-3 py-md-5">
            <div class="container">
                <div class="row text-light">
                    <div class="col-12">
                        <h1 class="w26-condensed mb-3">404</h1>
                        <p>Oeps, de pagina die je zoekt bestaat niet (meer) of is verplaatst. Controleer het webadres of ga terug naar
                            <router-link :to="{name: 'home'}" class="text-light w26-condensed">home</router-link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </header>
        <div class="bg-26-primary-light">
            <div class="container py-5"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>

</style>
