<template>
    <div id="home-view">
        <header class="bg-blue py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="fs-2 text-white fw-bolder">404</h1>
                        <h2 class="fs-6 txt-orange fw-bolder">Oeps, de opgevraagde pagina kon helaas niet worden gevonden.</h2>
                        <router-link :to="{name: 'home'}"
                                     class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3"
                                     tag="button">Ga naar home<i
                            class="bi bi-chevron-right ms-2"></i></router-link>
                    </div>
                </div>
            </div>
        </header>
        <main class="container-md py-2 py-md-5">
            <div class="row gy-3">
                <div class="col"></div>
            </div>
        </main>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>

</style>
