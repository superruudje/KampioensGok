import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Matches from "@/views/Matches.vue";
import Groups from "@/views/Groups.vue";
import Statistics from "@/views/Statistics.vue";
import Ranking from "@/views/Ranking.vue";
import Rules from "@/views/Rules.vue";
import Register from "@/views/Register.vue";

import Player from "@/views/Player.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useTournament} from "@/stores/content.ts";
import ProfileView from "@/views/ProfileView.vue";
import Match from "@/views/Match.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/ranking',
            children: [
                {path: '', name: 'ranking', component: Ranking},
                {
                    path: ':id', name: 'player', component: Player, beforeEnter: async (to, from, next) => {
                        const tournament = useTournament()
                        if (!tournament.players.length) await tournament.fetchData()

                        // Convert dashes back to spaces to match player names
                        const normalizedId = (to.params.id).replace(/-/g, ' ')
                        const participant = tournament.getParticipant(normalizedId)

                        participant ? next() : next({ name: '404' })
                    }
                },
            ]
        },
        {
            path: '/standings',
            name: 'groups',
            component: Groups
        },
        {
            path: '/matches',
            children: [
                {path: '', name: 'matches', component: Matches},
                {
                    path: ':id', name: 'wedstrijd', component: Match, beforeEnter: async (to, from, next) => {
                        const tournament = useTournament();
                        if (!tournament.matches.length) await tournament.fetchData();
                        tournament.getMatch(parseInt(to.params.id)) ? next() : next({name: '404'})
                    }
                }
            ]
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: Statistics
        },
        {
            path: '/rules',
            name: 'rules',
            component: Rules
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/my-page',
            name: 'my-page',
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
        if (to.name !== 'matches')
            return {top: 0}
        else
            return false
    },
})

export default router
