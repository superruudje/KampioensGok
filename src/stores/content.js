import {defineStore} from "pinia";
import schema from '../assets/schema.json'
import players from '../assets/players.json'

export const useTournament = defineStore('tournament', {
    state: () => ({
        schema: {},
        players: {},
    }),
    getters: {
        standing() {
            return this.players.map(player => {
                player.score = player.scores.at(-1)
                return player
            }).sort((a, b) => b.score - a.score)
        }
    },
    actions: {
        /**
         * Fetch schema
         */
        fetchData() {
            this.schema = schema.schema
            this.players = players.players
        },
    }
})