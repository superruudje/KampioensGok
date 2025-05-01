import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UitslagenView from "@/views/UitslagenView.vue";
import PouleView from "@/views/PouleView.vue";
import StatistiekenView from "@/views/StatistiekenView.vue";
import RanglijstView from "@/views/RanglijstView.vue";
import SpelregelsView from "@/views/SpelregelsView.vue";
import InvulView from "@/views/InvulView.vue";

import DeelnemerView from "@/views/DeelnemerView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useTournament} from "@/stores/content.ts";
import ProfileView from "@/views/ProfileView.vue";
import WedstrijdView from "@/views/WedstrijdView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/ranglijst',
            children: [
                {path: '', name: 'ranglijst', component: RanglijstView},
                {
                    path: ':id', name: 'deelnemer', component: DeelnemerView, beforeEnter: async (to, from, next) => {
                        const tournament = useTournament();
                        if (!tournament.players.length) await tournament.fetchData();
                        tournament.getParticipant(to.params.id) ? next() : next({name: '404'})
                    }
                },
            ]
        },
        {
            path: '/poules',
            name: 'poules',
            component: PouleView
        },
        {
            path: '/wedstrijden',
            children: [
                {path: '', name: 'wedstrijden', component: UitslagenView},
                {
                    path: ':id', name: 'wedstrijd', component: WedstrijdView, beforeEnter: async (to, from, next) => {
                        const tournament = useTournament();
                        if (!tournament.matches.length) await tournament.fetchData();
                        tournament.getMatch(parseInt(to.params.id)) ? next() : next({name: '404'})
                    }
                }
            ]
        },
        {
            path: '/statistieken',
            name: 'statistieken',
            component: StatistiekenView
        },
        {
            path: '/spelregels',
            name: 'spelregels',
            component: SpelregelsView
        },
        {
            path: '/invulsheet',
            name: 'invulsheet',
            component: InvulView
        },
        {
            path: '/mijn-pagina',
            name: 'mijn pagina',
            component: ProfileView
        },
        {
            path: "/:pathMatch(.*)*",
            name: '404',
            component: NotFoundView
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to the top
        if (to.name !== 'wedstrijden')
            return {top: 0}
        else
            return false
    },
})

export default router
