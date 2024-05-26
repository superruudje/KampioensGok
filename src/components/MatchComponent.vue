<template>
    <div class="card bg-gray border-0 rounded-0">
        <div class="card-body position-relative p-4 pt-5">
            <div class="match-group position-absolute top-0 start-50 bg-blue text-light px-3 py-1">{{match.group.length > 1 ? match.group : `Groep ${match.group}` }}</div>
            <div class="d-flex justify-content-around align-items-center">
                <div class="team-wrapper">
                    <img class="w-25" loading="lazy" alt="" src="https://sassets.knvb.nl/sites/onsoranje.nl/files/styles/thumbnail/public/teams/lyrn53a.png">
                    <span class="pt-3">{{ match.teams[0] }}</span>
                </div>
                <div class="text-black fw-bold fst-italic fs-1">{{ match.result ? `${match.result[0]} : ${match.result[1]}` : match.time }}</div>
                <div class="team-wrapper">
                    <img class="w-25" loading="lazy" alt="" src="../assets/images/scottish-football-association-logo.png">
                    <span class="pt-3">{{ match.teams[1] }}</span>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <span class="txt-blue"><i class="bi bi-pin-map txt-orange me-2"></i>{{ match.stadium }}, {{match.city }}</span>
                <button class="btn btn-sm btn-orange rounded-0 fw-bolder py-2 px-3">Meer<i class="bi bi-chevron-right ms-2"></i></button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    match: {type: Object, required: true},
})
</script>

<style scoped lang="sass">
.match-group
    transform: translate(-50%, -50%) skew(-8deg)
.team-wrapper
    display: flex
    flex: 1
    flex-direction: column
    justify-content: space-between
    align-items: center
</style>