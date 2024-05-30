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
        cardsGiven: 0,

        bonus: ["-", -1, -1, "-", "-", "-", "-", "-", "-"],

        teamImages: [],

        pageNumber: 0,
        pageSize: 10,
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
            }).sort((a, b) => b.score - a.score).map((player, idx, array) => {
                if (idx < 1) {
                    player.pos = 1
                } else {
                    player.pos = player.score === array[idx - 1].score ? array[idx - 1].pos : idx + 1
                }
                return player
            })
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
        /**
         * Total goals scored
         * @returns {number}
         */
        totalGoals() {
            let goals = 0
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    goals+= match.result_nvl.reduce((partialSum, a) => partialSum + a, 0);
                })
            })
            return goals
        },
        /**
         * Total cards given
         * @returns {number}
         */
        totalCards() {
            let cards = 0
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    const yellow = match.timeline?.cards?.yellow?.length || 0
                    const red = match.timeline?.cards?.red?.filter(r => r.direct).length || 0
                    cards+= (yellow + red)
                })
            })
            return cards
        },
        /**
         * Group teams by goals for
         * @returns {{}}
         */
        groupedGoalsFor() {
            let res = this.teams.map((t) => { return { id: t.id, count: 0}})
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    const goals = match.timeline.goals
                    goals.reduce((p, goal) => {
                        const team = goal.team
                        if (!p.some((t) => t.id === team))
                            p.push({id: team, count: 0})
                        p.find((t) => t.id === team).count++;
                        return p
                    }, res)
                })
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Group teams by goals against
         * @returns {{}}
         */
        groupedGoalsAgainst() {
            let res = this.teams.map((t) => { return { id: t.id, count: 0}})
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    const goals = match.timeline.goals
                    goals.reduce((p, goal) => {
                        const team = goal.team === match.teams[0] ? match.teams[1] : match.teams[0]
                        if (!p.some((t) => t.id === team))
                            p.push({id: team, count: 0})
                        p.find((t) => t.id === team).count++;
                        return p
                    }, res)
                })
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Group teams cards
         * @returns {*}
         */
        groupedTeamCards() {
            let res = this.teams.map((t) => { return { id: t.id, count: 0}})
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    const yellow = match.timeline?.cards?.yellow || []
                    const red = match.timeline?.cards?.red?.filter(r => r.direct || r.direct === undefined) || []
                    const cards = yellow.concat(red)

                    cards.forEach((card) => {
                        const team = card.team
                        if (!res.some((t) => t.id === team))
                            res.push({id: team, count: 0})
                        res.find((t) => t.id === team).count++;
                    })
                })
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Group top scorer
         * @returns {*}
         */
        groupedTopScorer() {
            let res = []
            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach(match => {
                    const goals = match.timeline?.goals || []
                    goals.forEach((goal) => {
                        const player = goal.player
                        if (!res.some((t) => t.player === player))
                            res.push({player: player, team: goal.team, count: 0})
                        res.find((t) => t.player === player).count++;
                    })
                })
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Return counted champions
         * @returns {*}
         */
        prediction_tournament_champion() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const winner = player.bonus[0]
                    if (!res.some((t) => t.id === winner))
                        res.push({id: winner, count: 0})
                    res.find((t) => t.id === winner).count++;
                }
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Return counted most against
         * @returns {*}
         */
        prediction_most_against() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus && player.bonus[3]) {
                    const winner = player.bonus[3]
                    if (!res.some((t) => t.id === winner))
                        res.push({id: winner, count: 0})
                    res.find((t) => t.id === winner).count++;
                }
            })
            return res.sort((a, b) => { return b.count - a.count })
        },
        /**
         * Return counted most cards
         * @returns {*}
         */
        prediction_most_cards() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus && player.bonus[4]) {
                    const winner = player.bonus[4]
                    if (!res.some((t) => t.id === winner))
                        res.push({id: winner, count: 0})
                    res.find((t) => t.id === winner).count++;
                }
            })
            return res.sort((a, b) => { return b.count - a.count })
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
        },
        /**
         * Return participant
         */
        getParticipant(name) {
            return this.players.find(item => item.name === name)
        },
        /**
         * Calculate total score
         * @param name
         * @returns {*}
         */
        getParticipantTotalScore(name) {
            return this.getParticipantScoreMatches(name) + this.getParticipantScoreBonus(name)
        },
        /**
         * Calculate total score
         * @param name
         * @returns {*}
         */
        getParticipantScoreMatches(name) {
            let score = 0

            this.matches_played.forEach((match_day) => {
                match_day.matches.forEach((match) => {
                    const player_prediction = this.getMatchPlayerPrediction(name, match.num)
                    score += this.getPredictionScore(player_prediction, match)
                })
            })

            return score
        },
        /**
         * Calculate total score bonus questions
         * @param name
         * @returns {*}
         */
        getParticipantScoreBonus(name) {
            let score = 0
            const player = this.players.find(player => player.name === name)
            // check for champion
            if (player.bonus[0] === this.bonus[0]) score+= 75
            // check for estimation questions
            for (let i = 1; i < 3; i++) {
                if (player.bonus[i] === this.bonus[i]) score+= 40
                else if (player.bonus[i] >= (this.bonus[i] - 5) && player.bonus[i] <= (this.bonus[i] + 5)) score+= 25
                else if (player.bonus[i] >= (this.bonus[i] - 10) && player.bonus[i] <= (this.bonus[i] + 10)) score+= 15
            }
            // check for teams/player questions
            for (let i = 3; i < player.bonus.length; i++) {
                if (player.bonus[i] === this.bonus[i]) score+= 10
            }
            return score
        },
        /**
         * Find players prediction for given match
         * @param name
         * @param match
         * @returns {string[]|*}
         */
        getMatchPlayerPrediction(name, match) {
            const player = this.players.find(player => player.name === name)
            if (!player) return ['?', '?']
            const prediction = player.predictions.find(prediction => prediction.match === match)
            return prediction?.score || ['?', '?']
        },
        /**
         * Return the achieved prediction score
         * @param prediction players prediction
         * @param match match object
         */
        getPredictionScore(prediction, match) {
            let score = 0
            const final_score = match.result
            const winner_prediction = prediction[0] === prediction[1] ? null : prediction[0] > prediction[1] ? 0 : 1
            const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
            if (this.arrayEquals(prediction, final_score)) score+= 10
            else if (final_winner === null && winner_prediction === null) score+= 7
            else {
                if (final_winner === winner_prediction)
                    score+= 5
                if (prediction[0] === final_score[0] || prediction[1] === final_score[1])
                    score+= 2
            }
            return score
        },
        /**
         * Get computed poules standing
         * @returns {*[]}
         */
        getPoules() {
            let computed_poules = []
            this.poules.forEach((poule) => {
                let computed_poule = {poule: poule.name}
                let poule_team = []
                poule.teams.forEach((team) => {
                    let team_stats = {team: team, points: 0, for: 0, against: 0, matches: []}
                    this.matches_played.forEach((match_day) => {
                        match_day.matches.forEach((match) => {
                            if (!match.teams.includes(team)) return
                            const final_score = match.result
                            const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
                            if (final_winner === null) {
                                team_stats.points+= 1
                                team_stats.matches.push('D')
                            } else if (match.teams[final_winner] === team) {
                                team_stats.points+= 3
                                team_stats.matches.push('W')
                            } else
                                team_stats.matches.push('W')
                            team_stats.for+= match.teams[0] === team ? final_score[0] : final_score[1]
                            team_stats.against+= match.teams[0] === team ? final_score[1] : final_score[0]
                        })
                    })
                    poule_team.push(team_stats)
                })
                computed_poule.teams = poule_team.sort((a, b) => {
                    if (b.points === a.points)
                        return (b.for - b.against) - (a.for - a.against)
                    else
                        return b.points - a.points
                })
                computed_poules.push(computed_poule)
            })
            return computed_poules
        },
        /**
         * Check if array content are equal
         * @param a
         * @param b
         * @returns {false|*}
         */
        arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        },
    }
})