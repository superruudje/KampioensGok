import {defineStore} from "pinia";
import teams from '../assets/teams.json'
import matches from '../assets/matches.json'
import players from '../assets/players.json'
import poules from '../assets/poules.json'
import {filename} from 'pathe/utils'

export const useTournament = defineStore('tournament', {
    state: () => ({
        teams: [],
        matches: [],
        players: [],
        poules: [],
        knock_out: {},

        bonus: [
            "", //0.champion
            null, //1. goals scored
            null, //2. cards given
            "", //3. most against
            "", //4. most cards
            "", //5. top scorer
            "", //6. top assist
            "", //7. first goal NL
            "" //8. first card NL
        ],

        teamImages: [],

        profile: null,

        pageNumber: 0,
        pageSize: 10,
    }),
    getters: {
        /**
         * Return top 10 players
         * @returns {*}
         */
        standing_top_10() {
            return this.getStanding(null).slice(0, 10)
        },
        /**
         * Return matches played
         * @returns {*}
         */
        matches_played() {
            return this.matches.filter(m => m.hasOwnProperty('result'))
        },
        /**
         * Return matches played
         * @returns {*}
         */
        matches_played_by_day() {
            return Object.groupBy(this.matches_played, ({date}) => date)
        },
        /**
         * Return matches played in poule fase
         * @returns {*}
         */
        matches_played_poule() {
            return Object.groupBy(this.matches_played.filter((m) => m.group.length === 1), ({date}) => date)
        },
        /**
         * Return matches to play in poule fase
         * @returns {*}
         */
        matches_to_play_poule() {
            return Object.groupBy(this.matches_to_play.filter((m) => m.group.length === 1), ({date}) => date)
        },
        /**
         * Return matches played in knockout fase
         * @returns {*}
         */
        matches_played_knock_out() {
            return Object.groupBy(this.matches_played.filter((m) => m.group.length > 1), ({date}) => date)
        },
        /**
         * Return matches to play in knockout fase
         * @returns {*}
         */
        matches_to_play_knock_out() {
            return Object.groupBy(this.matches_to_play.filter((m) => m.group.length > 1), ({date}) => date)
        },
        /**
         * Return matches yet to be played
         * @returns {*}
         */
        matches_to_play() {
            return this.matches.filter(m => !m.hasOwnProperty('result'))
        },
        /**
         * Return matches yet to be played
         * @returns {*}
         */
        matches_to_play_by_day() {
            return Object.groupBy(this.matches_to_play, ({date}) => date)
        },
        /**
         * Return upcoming games
         * @returns {*}
         */
        upcoming_matches() {
            return Object.groupBy(this.matches_to_play.slice(0, 5), ({date}) => date)
        },
        /**
         * Total goals scored
         * @returns {number}
         */
        totalGoals() {
            let goals = 0
            this.matches_played.forEach(match => {
                const result = match.result_nvl || match.result
                goals += result?.reduce((partialSum, a) => partialSum + a, 0) || 0;
            })
            return goals
        },
        /**
         * Estimate goals scored
         * @returns {{average: number, matches}}
         */
        estTotalGoals() {
            const average = Math.round((this.totalGoals / this.matches_played.length) * 100) / 100
            const matches = this.matches.length
            return {average, matches}
        },
        /**
         * Total cards given
         * @returns {number}
         */
        totalCards() {
            let cards = 0
            this.matches_played.forEach(match => {
                const yellow = match.timeline?.filter(e => e.type === 'yellow').length || 0
                const red = match.timeline?.filter(e => e.type === 'red' && e.direct).length || 0
                cards += (yellow + red)
            })
            return cards
        },
        /**
         * Estimate cards given
         * @returns {{average: number, matches}}
         */
        estTotalCards() {
            const average = Math.round((this.totalCards / this.matches_played.length) * 100) / 100
            const matches = this.matches.length
            return {average, matches}
        },
        /**
         * Group teams by goals for
         * @returns {{}}
         */
        groupedGoalsFor() {
            let res = this.teams.map((t) => {
                return {label: t.id, image: t.id, count: 0}
            })
            this.matches_played.forEach(match => {
                const goals = match.timeline.filter(e => e.type === 'goal')
                goals.reduce((p, goal) => {
                    const team = goal.team
                    if (!p.some((t) => t.id === team))
                        p.push({id: team, count: 0})
                    p.find((t) => t.id === team).count++;
                    return p
                }, res)
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Group teams by goals against
         * @returns {{}}
         */
        groupedGoalsAgainst() {
            let res = this.teams.map((t) => {
                return {label: t.id, image: t.id, count: 0}
            })
            this.matches_played.forEach(match => {
                const goals = match.timeline?.filter(e => e.type === 'goal') || []
                goals.reduce((p, goal) => {
                    const team = goal.team === match.teams[0] ? match.teams[1] : match.teams[0]
                    if (!p.some((t) => t.label === team))
                        p.push({label: team, image: team, count: 0})
                    p.find((t) => t.label === team).count++;
                    return p
                }, res)

            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Group teams cards
         * @returns {*}
         */
        groupedTeamCards() {
            let res = this.teams.map((t) => {
                return {label: t.id, image: t.id, count: 0}
            })
            this.matches_played.forEach(match => {
                const yellow = match.timeline?.filter(e => e.type === 'yellow') || []
                const red = match.timeline?.filter(e => e.type === 'red' && e.direct) || []
                const cards = yellow.concat(red)

                cards.forEach((card) => {
                    const team = card.team
                    if (!res.some((t) => t.label === team))
                        res.push({label: team, image: team, count: 0})
                    res.find((t) => t.label === team).count++;
                })
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Group top scorer
         * @returns {*}
         */
        groupedTopScorer() {
            let res = []
            this.matches_played.forEach(match => {
                const goals = match.timeline?.filter(e => e.type === 'goal') || []
                goals.forEach((goal) => {
                    const player = goal.player
                    if (!res.some((t) => t.label === player))
                        res.push({label: player, image: goal.team, count: 0})
                    res.find((t) => t.label === player).count++;
                })
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Group king assist
         * @returns {*}
         */
        groupedAssist() {
            let res = []
            this.matches_played.forEach(match => {
                const goals = match.timeline?.filter(e => e.type === 'goal' && e.assist) || []
                goals.forEach((goal) => {
                    const player = goal.assist
                    if (!res.some((t) => t.label === player))
                        res.push({label: player, image: goal.team, count: 0})
                    res.find((t) => t.label === player).count++;
                })
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
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
            return res.sort((a, b) => {
                return b.count - a.count
            })
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
            return res.sort((a, b) => {
                return b.count - a.count
            })
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
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Return counted top scorer
         * @returns {*}
         */
        prediction_top_scorer() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const top_scorer = player.bonus[5]
                    if (!res.some((t) => t.id === top_scorer))
                        res.push({id: top_scorer, count: 0})
                    res.find((t) => t.id === top_scorer).count++;
                }
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Return counted top assist
         * @returns {*}
         */
        prediction_top_assist() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const top_assist = player.bonus[6]
                    if (!res.some((t) => t.id === top_assist))
                        res.push({id: top_assist, count: 0})
                    res.find((t) => t.id === top_assist).count++;
                }
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Return counted first goal NL
         * @returns {*}
         */
        prediction_first_goal_nl() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const first_goal = player.bonus[7]
                    if (!res.some((t) => t.id === first_goal))
                        res.push({id: first_goal, count: 0})
                    res.find((t) => t.id === first_goal).count++;
                }
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Return counted first card NL
         * @returns {*}
         */
        prediction_first_card_nl() {
            let res = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const first_card = player.bonus[8]
                    if (!res.some((t) => t.id === first_card))
                        res.push({id: first_card, count: 0})
                    res.find((t) => t.id === first_card).count++;
                }
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         *
         * @returns {*}
         */
        prediction_ned() {
            let res = []
            this.players.forEach((player) => {
                let exit = ''
                if (player.finals.includes('NED'))
                    exit = 'Finale'
                else if (player.semi_finals.includes('NED'))
                    exit = 'Halve Finale'
                else if (player.quarter_finals.includes('NED'))
                    exit = 'Kwartfinale'
                else if (player.round_of_16.includes('NED'))
                    exit = 'Achtste Finale'
                else
                    exit = 'Poule Fase'

                if (!res.some((t) => t.id === exit))
                    res.push({id: exit, count: 0})
                res.find((t) => t.id === exit).count++;
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
    },
    actions: {
        /**
         * Fetch tournament data
         */
        fetchData() {
            this.teams = teams.teams
            this.matches = matches
            this.players = players.players
            this.poules = poules.poules
            this.knock_out = poules.knock_out
            this.setImages()
            this.checkForProfile()
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
         * Get profile from locale storage
         */
        checkForProfile() {
            this.profile = JSON.parse(localStorage.getItem("profile")) || null;
        },
        /**
         * Set profile in locale storage
         */
        setProfile(team) {
            this.profile = team
            localStorage.setItem("profile", JSON.stringify(team));
        },
        /**
         * Unset profile in locale storage
         */
        unsetProfile() {
            this.profile = null
            localStorage.removeItem("profile");
        },
        /**
         * Return matches by poule name
         * @param poule
         */
        matches_by_poule(poule) {
            return Object.groupBy(this.matches.filter(m => m.group === poule), ({date}) => date);
        },
        /**
         * Return standing
         * @returns {*}
         */
        getStanding(snapshot) {
            return this.players.map(player => {
                return {
                    // scores: player.scores,
                    name: player.name,
                    team_name: player.team_name,
                    score: this.getParticipantTotalScore(player.team_name, snapshot)
                }
            }).sort((a, b) => b.score - a.score).map((player, idx, array) => {
                player.pos = idx < 1 ? 1 : player.score === array[idx - 1].score ? array[idx - 1].pos : idx + 1
                return player
            })
        },
        getPlayerStanding(team) {
            return this.getStanding(null).find(p => p.team_name === team).pos
        },
        /**
         * Return participant by team name
         */
        getParticipant(name) {
            return this.players.find(item => item.team_name === name)
        },
        /**
         * Calculate total score
         * @param name team name
         * @param snapshot
         * @returns {*}
         */
        getParticipantTotalScore(name, snapshot) {
            return this.getParticipantScoreMatches(name, snapshot) + this.getParticipantScoreBonus(name, snapshot) + this.getParticipantScoreKnockOut(name, snapshot)
        },
        /**
         * Calculate total score
         * @param name
         * @param snapshot
         * @returns {*}
         */
        getParticipantScoreMatches(name, snapshot) {
            let score = 0

            const slice_num = snapshot !== null ? snapshot : Object.keys(this.matches_played_by_day).length
            const keys = Object.keys(this.matches_played_by_day).slice(0, slice_num)
            keys.forEach(key => {
                this.matches_played_by_day[key].forEach((match) => {
                    const player_prediction = this.getMatchPlayerPrediction(name, match.num)
                    score += this.getPredictionScore(player_prediction, match).score
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
            const player = this.players.find(player => player.team_name === name)
            // check for champion
            if (player.bonus[0] === this.bonus[0]) score += 75
            // check for estimation questions
            for (let i = 1; i < 3; i++) {
                if (this.bonus[i] === null) return 0
                else if (player.bonus[i] === this.bonus[i]) score += 40
                else if (player.bonus[i] >= (this.bonus[i] - 5) && player.bonus[i] <= (this.bonus[i] + 5)) score += 25
                else if (player.bonus[i] >= (this.bonus[i] - 10) && player.bonus[i] <= (this.bonus[i] + 10)) score += 15
            }
            // check for teams/player questions
            for (let i = 3; i < player.bonus.length; i++) {
                if (player.bonus[i] === this.bonus[i]) score += 10
            }
            return score
        },
        /**
         * Calculate total score knockout fase
         * @param name
         * @returns {*}
         */
        getParticipantScoreKnockOut(name) {
            let score = 0
            const player = this.players.find(player => player.team_name === name)

            player.round_of_16.forEach(team => {
                if (this.knock_out.round_of_16.includes(team)) score += 10
            })
            player.quarter_finals.forEach(team => {
                if (this.knock_out.quarter_finals.includes(team)) score += 20
            })
            player.semi_finals.forEach(team => {
                if (this.knock_out.semi_finals.includes(team)) score += 30
            })
            player.finals.forEach(team => {
                if (this.knock_out.finals.includes(team)) score += 50
            })

            return score
        },
        /**
         * Find players prediction for given match
         * @param name
         * @param match
         * @returns {string[]|*}
         */
        getMatchPlayerPrediction(name, match) {
            const player = this.players.find(player => player.team_name === name)
            if (!player) return ['?', '?']
            const prediction = player.predictions.find(prediction => prediction.match === match)
            return prediction?.score || ['?', '?']
        },
        /**
         *
         * @param name
         * @param match
         * @returns {string[]|*}
         */
        getMatchPlayerPredictionTeams(name, match) {
            const player = this.players.find(player => player.team_name === name)
            if (!player) return ['?', '?']
            const prediction = player.predictions.find(prediction => prediction.match === match)
            return prediction?.teams || ['?', '?']
        },
        /**
         * Return the achieved prediction score
         * @param prediction players prediction
         * @param match match object
         */
        getPredictionScore(prediction, match) {
            let score = 0
            let reason = []
            const final_score = match.result || [0, 0]
            const winner_prediction = prediction[0] === prediction[1] ? null : prediction[0] > prediction[1] ? 0 : 1
            const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? 0 : 1
            if (this.arrayEquals(prediction, final_score)) {
                score += 10
                reason.push('correct voorspeld')
            } else if (final_winner === null && winner_prediction === null) {
                score += 7
                reason.push('gelijkspel voorspeld')
            } else {
                if (final_winner === winner_prediction) {
                    score += 5
                    reason.push('winnaar voorspeld')
                }
                if (prediction[0] === final_score[0] || prediction[1] === final_score[1]) {
                    score += 2
                    reason.push('score voorspeld')
                }
            }
            return {score, reason}
        },
        /**
         * Get computed poules standing
         * @returns {*[]}
         */
        getPoules() {
            let computed_poules = []
            this.poules.forEach((poule) => {
                let computed_poule = {poule: poule.name}
                let poule_teams = []
                poule.teams.forEach((team) => {
                    let team_stats = {team: team, points: 0, for: 0, against: 0, matches: []}
                    this.matches_played.forEach((match) => {
                        if (!match.teams.includes(team)) return
                        const final_score = match.result
                        const final_winner = final_score[0] === final_score[1] ? null : final_score[0] > final_score[1] ? match.teams[0] : match.teams[1]
                        if (final_winner === null) {
                            team_stats.points += 1
                            team_stats.matches.push('D')
                        } else if (final_winner === team) {
                            team_stats.points += 3
                            team_stats.matches.push('W')
                        } else
                            team_stats.matches.push('L')
                        team_stats.for += match.teams[0] === team ? final_score[0] : final_score[1]
                        team_stats.against += match.teams[0] === team ? final_score[1] : final_score[0]
                    })
                    poule_teams.push(team_stats)
                })
                computed_poule.teams = poule_teams.sort((a, b) => {
                    if (b.points === a.points) // if same score, check goals diff
                        return (b.for - b.against) - (a.for - a.against)
                    else
                        return b.points - a.points
                })
                computed_poules.push(computed_poule)
            })
            return computed_poules
        },
        /**
         * Get grouped score prediction for given match
         * @returns {*[]}
         */
        getGroupMatchPrediction(match) {
            let res = []
            this.players.forEach((player) => {
                const pred = player.predictions.find((m) => m.match === match).score
                const label = pred.join('-');

                if (!res.some((t) => t.id === label))
                    res.push({id: label, count: 0})
                res.find((t) => t.id === label).count++;
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
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