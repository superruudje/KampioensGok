<template>
    <div class="modal fade" id="donationModal" tabindex="-1" role="dialog" aria-labelledby="donationTitle" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w26-condensed text-uppercase" id="donationTitle">{{ $t('donation.title') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <p class="mb-3">{{ $t('donation.message') }}</p>
                    <a
                        href="https://ko-fi.com/superruudje"
                        target="_blank"
                        class="d-inline-block"
                    >
                        <img width="200px" src="@/assets/images/support_me_on_kofi_dark.png" alt="Ko-fi">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

const modal = ref(null);

onMounted(() => {
    const donationModalElement = document.getElementById("donationModal");
    
    if (!sessionStorage.getItem("donationModalShown")) {
        modal.value = new Modal(donationModalElement, {
            backdrop: "static",
            keyboard: false
        });
        modal.value.show();
        sessionStorage.setItem("donationModalShown", "true");
    }
});
</script>

<style lang="sass" scoped>

</style>
