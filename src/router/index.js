import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgrammaView from "@/views/ProgrammaView.vue";
import RanglijstView from "@/views/RanglijstView.vue";
import PouleView from "@/views/PouleView.vue";
import UitslagenView from "@/views/UitslagenView.vue";
import DeelnemerView from "@/views/DeelnemerView.vue";
import StatistiekenView from "@/views/StatistiekenView.vue";
import InvulView from "@/views/InvulView.vue";
import SpelregelsView from "@/views/SpelregelsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useTournament} from "@/stores/content.js";
import ProfileView from "@/views/ProfileView.vue";

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
                    path: ':id', name: 'deelnemer', component: DeelnemerView, beforeEnter: (to, from, next) => {
                        const tournament = useTournament();
                        if (tournament.getParticipant(to.params.id))
                            next()
                        else
                            next({name: '404'})
                    }
                },
            ]
        },
        {
            path: '/programma',
            name: 'programma',
            component: ProgrammaView
        },
        {
            path: '/poules',
            name: 'poules',
            component: PouleView
        },
        {
            path: '/uitslagen',
            name: 'uitslagen',
            component: UitslagenView
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
            name: 'mijn-pagina',
            component: ProfileView
        },
        {
            path: "/:pathMatch(.*)*",
            name: '404',
            component: NotFoundView
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return {top: 0}
    },
})

export default router
