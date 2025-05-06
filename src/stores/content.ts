import {defineStore} from "pinia";
import {filename} from 'pathe/utils'
import {
    type Location,
    type Match,
    type MatchDay,
    MatchDayType,
    type MatchesByDay,
    type Poule,
    type PouleWithMatches,
    type Team,
    type TeamStats
} from "@/types/tournament.ts";
import type {MatchResult, Player, Question} from "@/types/pool.ts";

interface TournamentState {
    teams: Team[];
    matches: Match[];
    match_days: MatchDay[];
    players: Player[];
    poules: Poule[];
    knock_out: {
        round_of_32: string[],
        round_of_16: string[],
        quarter_final: string[],
        semi_final: string[],
        final_bronze: string[],
        final: string[],
    },

    roundOf16Start: number;
    quarterFinalsStart: number;
    semiFinalsStart: number;
    finalStart: number;

    teamImages: { [teamName: string]: string };
    locations: Location[];
    profile: string | null;

    pageNumber: number;
    pageSize: number | string;
    loading: boolean;
}

export const useTournament = defineStore('tournament', {
    state: (): TournamentState => ({
        teams: [],
        matches: [],
        match_days: [],
        players: [],
        poules: [],
        knock_out: {
            round_of_32: [],
            round_of_16: [],
            quarter_final: [],
            semi_final: [],
            final_bronze: [],
            final: [],
        },

        roundOf16Start: 13,
        quarterFinalsStart: 17,
        semiFinalsStart: 19,
        finalStart: 21,

        teamImages: {},
        locations: [],
        profile: null,

        pageNumber: 0,
        pageSize: 10,
        loading: false,
    }),
    getters: {
        /**
         * Return all bonus questions.
         */
        bonusQuestions(): Question[] {
            return [
                {
                    question: "Welk land wordt kampioen?",
                    help: "",
                    answer: "NED",
                    answer_type: "team",
                    type: "exact",
                    points: 75,
                    match_day_answered: 34,
                    current_answer: ""
                },
                {
                    question: "Hoeveel goals worden er totaal gescoord?",
                    help: "Inclusief goals in verlengingen.",
                    answer: 10,
                    answer_type: "number",
                    type: "estimate",
                    match_day_answered: 34,
                    current_answer: this.totalGoals
                },
                {
                    question: "Hoeveel kaarten worden er in het toernooi gegeven?",
                    help: "Indirecte rode kaart telt niet als extra kaart.",
                    answer: null,
                    answer_type: "number",
                    type: "estimate",
                    match_day_answered: 22,
                    current_answer: this.totalCards.red + this.totalCards.yellow
                },
                {
                    question: "Welk land krijgt de meeste tegengoals?",
                    answer: "",
                    answer_type: "team",
                    type: "exact",
                    points: 10,
                    match_day_answered: 22,
                    current_answer: this.goalsAgainstRanking[0]?.label
                },
                {
                    question: "Welk land krijgt de meeste kaarten?",
                    answer: "",
                    answer_type: "team",
                    type: "exact",
                    points: 10,
                    match_day_answered: 22,
                    current_answer: this.totalCardsPerTeam[0]?.label
                },
                {
                    question: "Wie wordt er topscorer?",
                    answer: "",
                    answer_type: "player",
                    type: "exact",
                    points: 10,
                    match_day_answered: 22,
                    current_answer: this.topScorers[0]?.label
                },
                {
                    question: "Wie wordt de koning van de assist?",
                    answer: "",
                    answer_type: "player",
                    type: "exact",
                    points: 10,
                    match_day_answered: 22,
                    current_answer: this.topAssist[0]?.label
                },
                {
                    question: "Wie maakt het eerste doelpunt voor Oranje?",
                    answer: "",
                    answer_type: "player",
                    type: "exact",
                    points: 10,
                    match_day_answered: 13,
                    current_answer: ""
                },
                {
                    question: "Wie ontvangt die eerste kaart voor Oranje?",
                    answer: "",
                    answer_type: "player",
                    type: "exact",
                    points: 10,
                    match_day_answered: 13,
                    current_answer: ""
                },
            ]
        },
        /**
         * Return all matches by day
         * @returns {*}
         */
        matchesGroupedByDay(state): MatchesByDay[] {
            return state.match_days.map((day: MatchDay) => ({
                matchDayId: day.id,
                matchDayDate: day.date,
                matches: state.matches.filter(match => match.match_day_id === day.id)
            }));
        },
        /**
         * Return matches played.
         * @returns {*}
         */
        playedMatches(state: TournamentState): Match[] {
            return state.matches.filter(match =>
                Array.isArray(match.result) &&
                match.result.length === 2 &&
                match.result.every(r => typeof r === 'number')
            );
        },
        /**
         * Return unplayed matches.
         * @returns {Match[]}
         */
        unplayedMatches(state): Match[] {
            return state.matches.filter(match =>
                !Array.isArray(match.result) || // No results array
                match.result.length !== 2 ||    // Results array doesn't have exactly 2 values
                match.result.some(r => typeof r !== 'number') // Results contain invalid values
            );
        },
        /**
         * Return played matches grouped by match day.
         * @returns {*}
         */
        playedMatchesGroupedByDay(state): MatchesByDay[] {
            return state.match_days.map((matchDay) => ({
                matchDayDate: matchDay.date,
                matchDayId: matchDay.id,
                matches: state.matches.filter(match =>
                    match.match_day_id === matchDay.id &&
                    Array.isArray(match.result) &&
                    match.result.length === 2 &&
                    match.result.every(r => typeof r === 'number')
                )
            })).filter(group => group.matches.length > 0);
        },
        /**
         * Return unplayed matches grouped by match day.
         * @returns {MatchesByDay[]}
         */
        unplayedMatchesGroupedByDay(state): MatchesByDay[] {
            return state.match_days
                .map(matchDay => ({
                    matchDayDate: matchDay.date,
                    matchDayId: matchDay.id,
                    matches: state.matches.filter(match =>
                        match.match_day_id === matchDay.id &&  // Match must belong to this match day
                        (!Array.isArray(match.result) || match.result.length !== 2 || match.result.some(r => typeof r !== 'number')) // No valid results
                    )
                }))
                .filter(group => group.matches.length > 0); // Remove match days with no unplayed matches
        },
        /**
         * Return all matches for a given poule.
         * @returns {Match[]}
         * @param state
         */
        matchesForPoule(state): (pouleName: string) => MatchesByDay[] {
            return (pouleName: string): MatchesByDay[] => {
                // Get teams in the poule (modify the logic to use pouleId or other criteria)
                const pouleTeams = state.poules.find(poule => poule.name === pouleName)?.teams || [];

                // Filter matches that belong to the poule (matching teams)
                const pouleMatches = state.matches.filter(match =>
                    match.teams.some(teamName => pouleTeams.some(team => team.team === teamName))
                );

                // Group filtered matches by match day
                const groupedMatchesByDay = state.match_days
                    .map((matchDay: MatchDay) => ({
                        matchDayDate: matchDay.date,
                        matchDayId: matchDay.id,
                        matches: pouleMatches.filter((match: Match) => match.match_day_id === matchDay.id)
                    }))
                    .filter(group => group.matches.length > 0); // Remove match days with no matches

                return groupedMatchesByDay;
            };
        },
        /**
         * Retrieves a list of poules along with their associated matches.
         *
         * @param {Object} state - The state object containing poules and matches data.
         * @return {PouleWithMatches[]} An array of objects where each object contains a poule name
         * and the list of matches associated with that poule.
         */
        getPouleMatches(state): PouleWithMatches[] {
            return state.poules.map(poule => ({
                name: poule.name,
                matches: state.matches.filter(match => match.poule_name === poule.name)
            }));
        },
        /**
         * Retrieves a function that, when given a poule name, returns a list of matches
         * corresponding to that specific poule name from the provided state object.
         *
         * @param {Object} state - The state object containing a list of matches.
         * @return {Function} A function that takes a poule name as a string and returns
         * an array of matches (Match[]) associated with the specified poule name.
         */
        matchesByPouleName(state): (pouleName: string) => Match[] {
            return (pouleName: string) => {
                return state.matches.filter(match => match.poule_name === pouleName);
            };
        },
        /**
         * Return played matches in poule phase.
         * @param state
         */
        playedPouleMatches(state): MatchesByDay[] {
            return state.match_days.filter(matchDay => matchDay.stage === 'group')
                .map((matchDay) => ({
                    matchDayDate: matchDay.date,
                    matchDayId: matchDay.id,
                    matches: state.matches.filter(match =>
                        match.match_day_id === matchDay.id &&
                        Array.isArray(match.result) &&
                        match.result.length === 2 &&
                        match.result.every(r => typeof r === 'number')
                    )
                }))
                .filter(group => group.matches.length != 0)
                .sort((a, b) => a.matchDayId - b.matchDayId);
        },
        /**
         * Return unplayed matches in poule phase
         * @returns {*}
         */
        unplayedPouleMatches(state): MatchesByDay[] {
            return state.match_days.filter(matchDay => matchDay.stage === 'group')
                .map((matchDay) => ({
                    matchDayDate: matchDay.date,
                    matchDayId: matchDay.id,
                    matches: state.matches.filter(match =>
                        match.match_day_id === matchDay.id &&  // Match must belong to this match day
                        (!Array.isArray(match.result) || match.result.length !== 2 || match.result.some(r => typeof r !== 'number')) // No valid results
                    )
                }))
                .filter(group => group.matches.length != 0)
                .sort((a, b) => a.matchDayId - b.matchDayId);
        },
        /**
         * Return played matches in given tournament phase.
         */
        playedMatchesByMatchDayType: (state) => (matchDayType: MatchDayType): MatchesByDay[] => {
            return state.match_days.filter(matchDay => matchDay.type === matchDayType)
                .map((matchDay) => ({
                    matchDayDate: matchDay.date,
                    matchDayId: matchDay.id,
                    matches: state.matches.filter(match =>
                        match.match_day_id === matchDay.id &&
                        Array.isArray(match.result) &&
                        match.result.length === 2 &&
                        match.result.every(r => typeof r === 'number')
                    )
                }))
                .filter(group => group.matches.length != 0)
                .sort((a, b) => a.matchDayId - b.matchDayId);
        },
        /**
         * Return unplayed matches in given tournament phase.
         * @param state
         */
        unplayedMatchesByMatchDayType: (state) => (matchDayType: MatchDayType): MatchesByDay[] => {
            return state.match_days.filter(matchDay => matchDay.type === matchDayType)
                .map((matchDay) => ({
                    matchDayDate: matchDay.date,
                    matchDayId: matchDay.id,
                    matches: state.matches.filter(match =>
                        match.match_day_id === matchDay.id &&  // Match must belong to this match day
                        (!Array.isArray(match.result) || match.result.length !== 2 || match.result.some(r => typeof r !== 'number')) // No valid results
                    )
                }))
                .filter(group => group.matches.length != 0)
                .sort((a, b) => a.matchDayId - b.matchDayId);
        },
        /**
         * Return the first 5 unplayed matches.
         * @returns {MatchesByDay[]}
         */
        first5UnplayedMatches(state): MatchesByDay[] {
            // Get the first 5 unplayed matches
            const first5Unplayed = state.matches.filter(match =>
                !Array.isArray(match.result) ||  // No result array
                match.result.length !== 2 ||     // Results array doesn't have exactly 2 values
                match.result.some(r => typeof r !== 'number') // Results contain invalid values
            ).slice(0, 5); // Limit to first 5 matches

            // Group the filtered matches by match day
            const groupedByDay = first5Unplayed.reduce((acc, match) => {
                const day = match.match_day_id; // Get the match day ID
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(match); // Add the match to the group corresponding to the match day
                return acc;
            }, {} as Record<number, Match[]>);

            // Fetch match day dates from matchDays (assuming state.match_days holds this data)
            const matchDayDates = new Map<number, string>(
                state.match_days.map((day) => [day.id, day.date]) // Assuming match_days contains id and date
            );

            // Convert the grouped matches into an array of objects, each representing a match day, its date, and matches
            return Object.entries(groupedByDay).map(([day, matches]) => ({
                matchDayId: Number(day), // Convert day to number
                matchDayDate: matchDayDates.get(Number(day)) || '', // Get the date for the match day
                matches
            }));
        },
        /**
         * Get the match day by id.
         * @param state
         */
        matchDay(state): (matchDayId: number) => MatchDay | null {
            return (matchDayId: number) => {
                return state.match_days.find(match_day =>
                    match_day.id === matchDayId
                ) || null;
            };
        },
        /**
         * Total goals scored
         * @returns {number}
         */
        totalGoals(state): number {
            return state.matches
                .map(match => {
                    const result = match.result_after_extra_time ?? match.result;
                    if (
                        Array.isArray(result) &&
                        result.length === 2 &&
                        result.every(score => typeof score === 'number')
                    ) {
                        return result[0] + result[1];
                    }
                    return 0;
                })
                .reduce((sum, goals) => sum + goals, 0);
        },
        /**
         * Average goals scored per match.
         * @returns {{average: number, matches}}
         */
        averageGoalsPerMatch(state): number {
            const validMatches = state.matches.filter(match => {
                const result = match.result_after_extra_time ?? match.result;
                return Array.isArray(result) &&
                    result.length === 2 &&
                    result.every(score => typeof score === 'number');
            });

            const totalGoals = validMatches.reduce((sum, match) => {
                const result = match.result_after_extra_time ?? match.result;
                return sum + result[0] + result[1];
            }, 0);

            return validMatches.length > 0
                ? parseFloat((totalGoals / validMatches.length).toFixed(1))
                : 0;
        },
        /**
         * Total cards given
         * @returns {number}
         */
        totalCards(state): { yellow: number; red: number } {
            let yellow = 0;
            let red = 0;

            state.matches.forEach(match => {
                if (!match.events || !Array.isArray(match.events)) return;

                match.events.forEach(event => {
                    if (event.type === 'yellow_card') yellow++;
                    if (event.type === 'red_card') red++;
                });
            });

            return {yellow, red};
        },
        /**
         * Average cards per match.
         * @returns {{average: number, matches}}
         */
        averageCardsPerMatch(state): number {
            let totalCards = 0;
            let playedMatchCount = 0;

            state.matches.forEach(match => {
                const isPlayed = Array.isArray(match.result) &&
                    match.result.length === 2 &&
                    match.result.every(r => typeof r === 'number');

                if (!isPlayed) return;

                playedMatchCount++;

                if (Array.isArray(match.events)) {
                    totalCards += match.events.filter(
                        event => event.type === 'yellow_card' || event.type === 'red_card'
                    ).length;
                }
            });

            if (playedMatchCount === 0) return 0;

            return parseFloat((totalCards / playedMatchCount).toFixed(1));
        },
        /**
         * Group teams by goals against
         * @returns {{}}
         */
        goalsAgainstRanking(state): { label: string; count: number }[] {
            const goalsAgainstMap: Record<string, number> = {};

            state.matches.forEach(match => {
                const result = match.result_after_extra_time ?? match.result;

                const isValidResult =
                    Array.isArray(result) &&
                    result.length === 2 &&
                    result.every(r => typeof r === 'number');

                if (!isValidResult || !Array.isArray(match.teams) || match.teams.length !== 2) return;

                const [teamA, teamB] = match.teams;
                const [scoreA, scoreB] = result;

                goalsAgainstMap[teamA] = (goalsAgainstMap[teamA] || 0) + scoreB;
                goalsAgainstMap[teamB] = (goalsAgainstMap[teamB] || 0) + scoreA;
            });

            return Object.entries(goalsAgainstMap)
                .map(([label, count]) => ({label, count}))
                .sort((a, b) => b.count - a.count);
        },
        /**
         * Group teams cards
         * @returns {*}
         */
        totalCardsPerTeam(state): { label: string; count: number }[] {
            const cardsMap: Record<string, { yellow: number; red: number }> = {};

            state.matches.forEach(match => {
                if (!match.events || !Array.isArray(match.events)) return;

                match.events.forEach(event => {
                    if (event.type === 'yellow_card' || event.type === 'red_card') {
                        const team = event.team;

                        if (!cardsMap[team]) {
                            cardsMap[team] = {yellow: 0, red: 0};
                        }

                        if (event.type === 'yellow_card') {
                            cardsMap[team].yellow++;
                        }
                        if (event.type === 'red_card') {
                            cardsMap[team].red++;
                        }
                    }
                });
            });

            return Object.entries(cardsMap)
                .map(([label, {yellow, red}]) => ({
                    label,
                    count: yellow + red,
                }))
                .sort((a, b) => b.count - a.count);
        },
        /**
         * Group top scorer
         * @returns {*}
         */
        topScorers(state): { label: string; team: string; count: number }[] {
            const scorersMap: Record<string, { team: string; count: number }> = {};

            state.matches.forEach(match => {
                if (!match.events || !Array.isArray(match.events)) return;

                match.events.forEach(event => {
                    if (event.type === 'goal') {
                        const player = event.player;
                        const team = event.team;

                        if (!scorersMap[player]) {
                            scorersMap[player] = {team, count: 0};
                        }

                        scorersMap[player].count++;
                    }
                });
            });

            return Object.entries(scorersMap)
                .map(([label, {team, count}]) => ({label, team, count}))
                .sort((a, b) => b.count - a.count);
        },
        /**
         * Group king assist
         * @returns {*}
         */
        topAssist(state): { label: string; team: string; count: number }[] {
            const scorersMap: Record<string, { team: string; count: number }> = {};

            state.matches.forEach(match => {
                if (!match.events || !Array.isArray(match.events)) return;

                match.events.forEach(event => {
                    if (event.type === 'goal') {
                        const player = event.assist || '-';
                        const team = event.team;

                        if (!scorersMap[player]) {
                            scorersMap[player] = {team, count: 0};
                        }

                        scorersMap[player].count++;
                    }
                });
            });

            return Object.entries(scorersMap)
                .map(([label, {team, count}]) => ({label, team, count}))
                .sort((a, b) => b.count - a.count);
        },


        getBonusPrediction(state): (index: number) => {id: string, count: number}[] {
            return (index: number) => {
                let res: {id: string, count: number}[] = []
                state.players.forEach(player => {
                    if (player.bonus && player.bonus[index]) {
                        const answer = player.bonus[index] as string;
                        const found = res.find(t => t.id === answer)
                        if (!found) res.push({id: answer, count: 1})
                        else found.count++;
                    }
                });

                return res.sort((a, b) => {
                    return b.count - a.count
                })
            }
        },

        /**
         * Return player predictions for total goals
         * @returns {*[]}
         */
        prediction_total_goals() {
            let res: {id: string, count: number}[] = []
            this.players.forEach((player) => {
                if (player.bonus) {
                    const goals = Math.ceil((player.bonus[1]) / 20) * 20;
                    const id = goals > 0 ? `${goals - 20} - ${goals}` : `${goals}`

                    const found = res.find(t => t.id === id)
                    if (!found) res.push({id: id, count: 1})
                    else found.count++;
                }
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Return prediction NL tournament result
         * @returns {*}
         */
        prediction_ned() {
            let res: {id: string, count: number}[] = []
            this.players.forEach((player) => {
                let exit = ''
                if (player.finals.includes('NED'))
                    exit = 'Finale'
                else if (player.semi_finals.includes('NED'))
                    exit = 'Halve Finale'
                else if (player.quarter_finals.includes('NED'))
                    exit = 'Kwartfinale'
                else if (player.round_of_16.includes('NED'))
                    exit = 'Knockout II'
                else if (player.round_of_32.includes('NED'))
                    exit = 'Knockout I'
                else
                    exit = 'Poule Fase'

                const found = res.find(t => t.id === exit)
                if (!found) res.push({id: exit, count: 1})
                else found.count++;
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        }
    },
    actions: {
        /**
         * Fetch tournament data
         */
        async fetchData() {
            this.loading = true;
            try {
                const timestamp = Date.now();
                const [teams, matches, matchDays, locations, players, tournament] = await Promise.all([
                    fetch(`/data/teams.json?t=${timestamp}`).then(res => res.json()),
                    fetch(`/data/matches.json?t=${timestamp}`).then(res => res.json()),
                    fetch(`/data/match_days.json?t=${timestamp}`).then(res => res.json()),
                    fetch(`/data/locations.json?t=${timestamp}`).then(res => res.json()),
                    fetch(`/data/players.json?t=${timestamp}`).then(res => res.json()),
                    fetch(`/data/tournament.json?t=${timestamp}`).then(res => res.json())
                ]);

                this.teams = teams
                this.matches = matches as Match[]
                this.match_days = matchDays as MatchDay[]
                this.locations = locations
                this.players = players
                this.poules = tournament.poules
                this.knock_out = tournament.knock_out

                this.setImages();
                this.checkForProfile()
            } catch (error) {
                console.error('Failed to fetch tournament data:', error);
            } finally {
                setTimeout(() => {this.loading = false;}, 800)
            }
        },
        /**
         * Set images file names
         */
        setImages() {
            //@ts-ignore
            const glob = import.meta.glob('@/assets/images/flags/*.png', {eager: true})
            this.teamImages = Object.fromEntries(
                Object.entries(glob).map(([key, value]) => [filename(key), (value as { default: string }).default])
            )
        },
        /**
         * Get a profile from locale storage
         */
        checkForProfile() {
            const raw = localStorage.getItem("profile");
            this.profile = raw ? JSON.parse(raw) : null;
        },
        /**
         * Set profile in locale storage
         */
        setProfile(teamName: string) {
            this.profile = teamName
            localStorage.setItem("profile", JSON.stringify(teamName));
        },
        /**
         * Unset profile in locale storage
         */
        unsetProfile() {
            this.profile = null
            localStorage.removeItem("profile");
        },
        /**
         * Return standing
         * @returns {*}
         */
        getStanding(snapshot: number | null): Player[] {
            return this.players.map(player => {
                const score = this.getParticipantTotalScore(player.team_name, snapshot)

                return {
                    name: player.name,
                    team_name: player.team_name,
                    score: score,
                    pos: 0
                } as Player
            })
                .sort((a, b) => {
                    const aScore = a.score ?? -Infinity
                    const bScore = b.score ?? -Infinity
                    return bScore - aScore
                })
                .map((player, idx, array) => {
                    player.pos = idx === 0
                        ? 1
                        : player.score === array[idx - 1].score
                            ? array[idx - 1].pos
                            : idx + 1
                    return player
                })
        },
        /**
         * Get players' current position in ranking
         * @param teamName
         * @returns {*}
         */
        getPlayerStanding(teamName: string) {
            return this.getStanding(null).find(p => p.team_name === teamName)?.pos || 0
        },
        /**
         * Return participant by team name
         */
        getParticipant(teamName: string): Player | undefined {
            return this.players.find(item => item.team_name === teamName)
        },
        /**
         * Return Macthc by number
         */
        getMatch(matchNum: number): Match | undefined {
            return this.matches.find(item => item.num === matchNum)
        },
        /**
         * Calculate total score
         * @param name team name
         * @param snapshot
         * @returns {*}
         */
        getParticipantTotalScore(name: string, snapshot: number | null) {
            return this.getParticipantScoreMatches(name, snapshot) + this.getParticipantScoreBonus(name, snapshot) + this.getParticipantScoreKnockOut(name, snapshot)
        },
        /**
         * Calculate total score.
         * @param name team name of the player.
         * @param snapshot snapshot the calculate score for.
         * @returns {*}
         */
        getParticipantScoreMatches(name: string, snapshot: number | null = null) {
            let score = 0

            const slice_num = snapshot !== null ? snapshot : this.playedMatchesGroupedByDay.length;
            const groupDays = this.playedMatchesGroupedByDay.slice(0, slice_num);
            groupDays.forEach((groupDay: MatchesByDay, index: number) => {
                groupDay.matches.forEach((match: Match) => {
                    const player_prediction = this.getMatchPlayerPrediction(name, match.num)
                    score += this.getPredictionScore(player_prediction, match).score
                })
            })
            return score
        },
        /**
         * Calculate total score bonus questions
         * @param name
         * @param snapshot
         * @returns {*}
         */
        getParticipantScoreBonus(name: string, snapshot: number | null = null) {
            let score = 0

            const slice_num = snapshot !== null ? snapshot : this.playedMatchesGroupedByDay.length;
            const groupDays = this.playedMatchesGroupedByDay.slice(0, slice_num);

            const player = this.players.find(player => player.team_name === name)
            if (!player) return 0

            for (let i = 0; i < this.bonusQuestions.length; i++) {
                const res = this.getBonusScore(this.bonusQuestions[i], player.bonus[i], groupDays.length)
                score += Math.max(0, res ? res : 0)
            }
            return score
        },
        /**
         * Get score for given bonus question
         * @param question
         * @param player_answer
         * @param days_played
         */
        getBonusScore(question: Question, player_answer: any, days_played: number): number{
            if (days_played < question.match_day_answered) return -1
            else if (question.type === 'exact' && question.points)
                return (Array.isArray(question.answer) && question.answer.includes(player_answer)) || question.answer === player_answer ? question.points : 0;
            else if (question.type === 'estimate')
                return this.getEstimateScore(question.answer as number, player_answer) as number
            else return -1
        },
        /**
         * Calculate points for est question
         * @param question_answer
         * @param player_answer
         */
        getEstimateScore(question_answer: number, player_answer: any): 0 | 40 | 25 | 15 {
            if (question_answer === player_answer) return 40
            else if (player_answer >= (question_answer - 5) && player_answer <= (question_answer + 5)) return 25
            else if (player_answer >= (question_answer - 10) && player_answer <= (question_answer + 10)) return 15
            else return 0
        },
        /**
         * Calculate total score knockout fase
         * Count only after a certain tournament phase is finished
         * @param name
         * @param snapshot
         * @returns {*}
         */
        getParticipantScoreKnockOut(name: string, snapshot: number | null = null) {
            let score = 0
            const player = this.players.find(player => player.team_name === name)
            if (!player) return 0

            const slice_num = snapshot !== null ? snapshot : Object.keys(this.playedMatchesGroupedByDay).length
            const keys = Object.keys(this.playedMatchesGroupedByDay).slice(0, slice_num)

            if (keys.length > this.roundOf16Start) {
                this.knock_out.round_of_16.forEach(team => {
                    if (player.round_of_16.includes(team)) score += 10
                })
            }
            if (keys.length > this.quarterFinalsStart) {
                this.knock_out.quarter_final.forEach(team => {
                    if (player.quarter_finals.includes(team)) score += 20
                })
            }
            if (keys.length > this.semiFinalsStart) {
                this.knock_out.semi_final.forEach(team => {
                    if (player.semi_finals.includes(team)) score += 30
                })
            }
            if (keys.length > this.finalStart) {
                this.knock_out.final.forEach(team => {
                    if (player.finals.includes(team)) score += 50
                })
            }

            return score
        },
        /**
         * Find player prediction for a given match
         * @param teamName
         * @param match
         * @returns {string[]|*}
         */
        getMatchPlayerPrediction(teamName: string, match: number) {
            const player = this.players.find(player => player.team_name === teamName)
            if (!player) return ['?', '?']
            const prediction = player.predictions.find(prediction => prediction.match === match)
            return prediction?.result || ['?', '?']
        },
        /**
         * Get the teams the player prediction for a match.
         * @param teamName
         * @param match
         * @returns {string[]|*}
         */
        getMatchPlayerPredictionTeams(teamName: string, match: number) {
            const player = this.players.find(player => player.team_name === teamName)
            if (!player) return ['?', '?']
            const prediction = player.predictions.find(prediction => prediction.match === match)
            return prediction?.teams || ['?', '?']
        },
        /**
         * Return the achieved prediction score
         * @param prediction players prediction
         * @param match match object
         */
        getPredictionScore(prediction: any[], match: Match): { score: number, reason: string[] } {
            let score: number = 0;
            let reason: string[] = [];
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
            if (!reason.length) reason = ["Geen punten"]
            return {score, reason}
        },
        /**
         * Get computed poules standing
         * @returns {*[]}
         */
        getPoules(predictions: MatchResult[] | null = null): Poule[] {
            // Utility to calculate winner
            const getMatchWinner = (scoreA: number, scoreB: number, teams: string[]) => {
                if (scoreA === scoreB) return null;
                return scoreA > scoreB ? teams[0] : teams[1];
            };

            // Utility to calculate team stats
            const calculateTeamStats = (team: string, matches: MatchResult[]): TeamStats => {
                let team_stats = {team, points: 0, for: 0, against: 0, matches: []} as TeamStats;

                matches.forEach(matchResult => {
                    if (!matchResult.teams || !matchResult.teams.includes(team)) return;
                    const [scoreA, scoreB] = matchResult.result;
                    const winner = getMatchWinner(scoreA, scoreB, matchResult.teams);

                    if (winner === null) {
                        team_stats.points += 1;
                        team_stats.matches.push('D');
                    } else if (winner === team) {
                        team_stats.points += 3;
                        team_stats.matches.push('W');
                    } else {
                        team_stats.matches.push('L');
                    }

                    team_stats.for += matchResult.teams[0] === team ? scoreA : scoreB;
                    team_stats.against += matchResult.teams[0] === team ? scoreB : scoreA;
                })

                return team_stats;
            };

            const matches = predictions || [] as MatchResult[];
            if (!matches.length) {
                this.playedPouleMatches.forEach(matchesByDay => {
                    matchesByDay.matches.forEach(match => {
                        matches.push({
                            match: match.num,
                            result: match.result,
                            teams: match.teams
                        } as MatchResult);
                    })
                })
            }

            // Now use them in the original computation
            return this.poules.map(poule => {
                let computed_poule: Poule = {name: poule.name, teams: []};

                let poule_teams = poule.teams.map((teamStat: TeamStats) => calculateTeamStats(teamStat.team, matches));

                computed_poule.teams = poule_teams.sort((a, b) => {
                    if (b.points !== a.points) return b.points - a.points;

                    // If points are equal, sort by goal difference
                    const goalDifferenceB = b.for - b.against;
                    const goalDifferenceA = a.for - a.against;
                    if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;

                    // If the goal difference is equal, sort by goals scored
                    return b.for - a.for;
                });

                return computed_poule;
            });
        },
        /**
         * Get grouped score prediction for a given match
         * @param matchNumber
         */
        getGroupedMatchPrediction(matchNumber: number): {id: string, count: number}[] {
            let res: { id: string, count: number }[] = [];
            this.players.forEach((player) => {
                const pred = player.predictions.find((m) => m.match === matchNumber)?.result
                if (!pred) return
                const label = pred.join('-');

                const found = res.find((t) => t.id === label)
                if (!found) res.push({id: label, count: 1})
                else found.count++;
            })
            return res.sort((a, b) => {
                return b.count - a.count
            })
        },
        /**
         * Compare two arrays.
         * @param a first array.
         * @param b second array.
         */
        arrayEquals(a: any[], b: number[]) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        },
        /**
         * Get the location for a match.
         * @param locationId id of the location.
         */
        getLocation(locationId: number) {
            return this.locations.find((location) => location.id === locationId)
        },
        /**
         * Get the team for a match.
         * @param teamId id of the team.
         */
        getTeam(teamId: string) {
            return this.teams.find(team => team.id === teamId)
        }
    }
})