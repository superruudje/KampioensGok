import type {TeamStats} from "@/types/tournament.ts";
import type {MatchResult} from "@/types/pool.ts";

export function calculateAndAssignThirds(pouleResults: Record<string, TeamStats>): Record<number, string> {
    const bestThird = getBestThirdTeams(pouleResults);
    return assignThirdPlaceTeamsToMatches(bestThird);
}

/**
 * Collect all 3rd-placed teams (keys starting with '3')
 *
 * @param {Record<string, TeamStats>} pouleResults - An object containing the results of all groups, where each key represents a position (e.g., '3A' for 3rd in group A), and the value contains the team's performance data.
 * @return {string[]} An array of objects representing the best third-placed teams, sorted according to their performance metrics.
 */
function getBestThirdTeams(pouleResults: Record<string, TeamStats>): string[] {
    const thirdPlacedTeams = Object.entries(pouleResults)
        .filter(([key]) => key.startsWith('3'))
        .map(([key, result]) => ({
            key,
            points: result.points,
            goalDifference: result.for - result.against,
            goalsFor: result.for,
            wins: result.matches.filter(m => m === 'W').length,
        }));

    // Sort based on rules
    thirdPlacedTeams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return b.wins - a.wins;
    });

    // Return top 8 keys
    return thirdPlacedTeams.slice(0, 8).map(team => team.key);
}

/**
 * Assigns third-place teams to matches based on predefined options and ensures no team is assigned more than once.
 * Uses a backtracking algorithm to find a valid assignment of teams to matches, checking each combination recursively.
 *
 * @return {Record<number, string>} A mapping of match numbers to assigned third-place teams if a valid assignment is found, or null if no valid assignment exists.
 */
function assignThirdPlaceTeamsToMatches(advancingTeams: string[]): Record<number, string> {
    const matchOptions: Record<number, string[]> = {
        74: ['3A', '3B', '3C', '3D', '3F'],
        77: ['3C', '3D', '3F', '3G', '3H'],
        79: ['3C', '3E', '3F', '3H', '3I'],
        80: ['3E', '3H', '3I', '3J', '3K'],
        81: ['3B', '3E', '3F', '3I', '3J'],
        82: ['3A', '3E', '3H', '3I', '3J'],
        85: ['3E', '3F', '3G', '3I', '3J'],
        87: ['3D', '3E', '3I', '3J', '3L'],
    };

    const matches = Object.keys(matchOptions).map(Number);

    function backtrack(index: number, remainingTeams: string[], currentAssignment: Record<number, string>): Record<number, string> | null {
        if (index === matches.length) {
            return currentAssignment;
        }

        const match = matches[index];
        const options = matchOptions[match];

        for (const team of options) {
            if (remainingTeams.includes(team)) {
                const newAssignment = { ...currentAssignment, [match]: team };
                const newRemainingTeams = remainingTeams.filter(t => t !== team);

                const result = backtrack(index + 1, newRemainingTeams, newAssignment);
                if (result) return result;
            }
        }

        return null;
    }

    const result = backtrack(0, advancingTeams, {});

    if (!result) {
        throw new Error('Unable to assign all advancing third-place teams to matches.');
    }

    return result;
}

/**
 * Determines the matchups for the Round of 16 based on the results from the Round of 32.
 *
 * @param {MatchResult[]} matchPredictions - An array of match results from the Round of 32.
 * Each result contains match details and scores of the competing teams.
 *
 * @return {Record<number, [string, string]>} An object representing the matches in the Round of 16, where each key corresponds to a match number and each value is a tuple of the two competing teams.
 */
export function determineRoundOf16FromResults(matchPredictions: MatchResult[]): Record<number, [string, string]> {
    const { winners, losers } = determineWinnersAndLosers(matchPredictions);

    return {
        89: [winners[74], winners[77]],
        90: [winners[73], winners[75]],
        91: [winners[76], winners[78]],
        92: [winners[79], winners[80]],
        93: [winners[83], winners[84]],
        94: [winners[81], winners[82]],
        95: [winners[86], winners[88]],
        96: [winners[85], winners[87]],

        97: [winners[89], winners[90]],
        98: [winners[93], winners[94]],
        99: [winners[91], winners[92]],
        100: [winners[95], winners[96]],

        101: [winners[97], winners[98]],
        102: [winners[99], winners[100]],

        103: [losers[101], losers[102]],
        104: [winners[101], winners[102]],
    };
}

/**
 * Determines the winners and losers of matches based on the provided match predictions.
 *
 * @param {MatchResult[]} matchPredictions - An array of match prediction objects, where each object contains the teams, their scores, and the match identifier.
 * @return {{ winners: Record<number, string>, losers: Record<number, string> }} An object containing two records:
 * - winners: maps match IDs to winning team names (empty string for draws).
 * - losers: maps match IDs to losing team names (empty string for draws).
 */
function determineWinnersAndLosers(matchPredictions: MatchResult[]) {
    const winners: Record<number, string> = {};
    const losers: Record<number, string> = {};

    for (const prediction of matchPredictions) {
        const [scoreA, scoreB] = prediction.result;
        if (!prediction.teams || !scoreA || !scoreB) continue
        const [teamA, teamB] = prediction.teams;

        if (scoreA > scoreB) {
            winners[prediction.match] = teamA;
            losers[prediction.match] = teamB;
        } else if (scoreB > scoreA) {
            winners[prediction.match] = teamB;
            losers[prediction.match] = teamA;
        } else {
            winners[prediction.match] = '';
            losers[prediction.match] = '';
        }
    }

    return { winners, losers };
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}