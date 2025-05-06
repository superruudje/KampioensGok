<template>
    <div class="dropdown">
        <div
            aria-expanded="false"
            class="px-3 py-2 text-white dropdown-toggle"
            data-bs-toggle="dropdown"
            type="button">
            <i class="bi bi-globe-americas me-2"></i>{{ currentLang }}
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="(value, key) in languages">
                <button
                    class="dropdown-item text-capitalize"
                    type="button"
                    @click="changeLanguage(key)">
                    {{ value }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import {computed, ref} from 'vue'

const { locale } = useI18n()

const languages = { nl: 'Nederlands', en: 'English'}

const currentLang = computed(() => {
    return languages[locale.value]
})

function changeLanguage(language) {
    locale.value = language
    localStorage.setItem('lang', language)
}
</script>

<style scoped lang="sass">

</style>