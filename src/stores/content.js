import {defineStore} from "pinia";
import teams from '../assets/teams.json'
import schema from '../assets/schema.json'
import players from '../assets/players.json'
import poules from '../assets/poules.json'
import {filename} from 'pathe/utils'

export const useTournament = defineStore('tournament', {
    state: () => ({
        teams: [],
        schema: [],
        players: [],
        poules: [],
        teamImages:[]
    }),
    getters: {
        /**
         * Return standing previous round
         * @returns {*}
         */
        old_standing() {
            return this.players.sort((a, b) => {
                const score1 = b['scores'].at(-2)
                const score2 = a['scores'].at(-2)
                if (score1 === score2) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
                } else {
                    return score1 - score2
                }
            }).map((player, idx) => {
                return {
                    player: player.name,
                    score: player.scores.at(-2),
                    pos: idx + 1
                }
            });
        },
        /**
         * Return standing
         * @returns {*}
         */
        standing() {
            return this.players.map(player => {
                player.score = player.scores.at(-1)
                return player
            }).sort((a, b) => b.score - a.score)
        },
        /**
         * Return top 10 players
         * @returns {*}
         */
        standing_top_10() {
            return this.standing.slice(0, 10)
        },
        /**
         * Return matches played
         * @returns {*}
         */
        matches_played() {
            return this.schema.filter((game_day) => {
                const dateParts = game_day.date.split("-");
                const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                const now = new Date()
                return now > date
            })
        },
        /**
         * Return matches yet to be played
         * @returns {*}
         */
        matches_to_play() {
            return this.schema.filter((game_day) => {
                const dateParts = game_day.date.split("-");
                const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                const now = new Date()
                return now < date
            })
        },
        /**
         * Return upcoming games
         * @returns {*}
         */
        upcoming_matches() {
            return this.schema.filter((game_day) => {
                const dateParts = game_day.date.split("-");
                const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                const now = new Date()
                return now < date
            }).slice(0, 2)
        },
    },
    actions: {
        /**
         * Fetch tournament data
         */
        fetchData() {
            this.teams = teams.teams
            this.schema = schema.schema
            this.players = players.players
            this.poules = poules.poules
            this.setImages()
        },
        /**
         * Set images file names
         */
        setImages() {
            let glob = import.meta.glob('@/assets/images/teams/*.png', {eager: true})
            this.teamImages = Object.fromEntries(
                Object.entries(glob).map(([key, value]) => [filename(key), value.default])
            )
        },
        /**
         * Return matches by poule name
         * @param poule
         * @returns {*[]}
         */
        matches_by_poule(poule) {
            let matches = []
            this.schema.forEach((game_day) => {
                if (game_day.matches.some(m => m.group === poule)) {
                    let obj = {...game_day}
                    obj.matches = game_day.matches.filter(m => m.group === poule)
                    matches.push(obj)
                }
            })
            return matches
        }
    }
})