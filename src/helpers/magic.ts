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
    const roundWinners= determineWinners(matchPredictions);

    return {
        89: [roundWinners[74], roundWinners[77]],
        90: [roundWinners[73], roundWinners[75]],
        91: [roundWinners[76], roundWinners[78]],
        92: [roundWinners[79], roundWinners[80]],
        93: [roundWinners[83], roundWinners[84]],
        94: [roundWinners[81], roundWinners[82]],
        95: [roundWinners[86], roundWinners[88]],
        96: [roundWinners[85], roundWinners[87]],

        97: [roundWinners[89], roundWinners[90]],
        98: [roundWinners[93], roundWinners[94]],
        99: [roundWinners[91], roundWinners[92]],
        100: [roundWinners[95], roundWinners[96]],

        101: [roundWinners[97], roundWinners[98]],
        102: [roundWinners[99], roundWinners[100]],

        104: [roundWinners[101], roundWinners[102]],
    };
}

/**
 * Determines the winners of matches based on the provided match predictions.
 *
 * @param {MatchResult[]} matchPredictions - An array of match prediction objects, where each object contains the teams, their scores, and the match identifier.
 * @return {Record<number, string>} An object where the keys are match identifiers and the values are the names of the winning teams. If the match ends in a tie, the value will be an empty string.
 */
function determineWinners(matchPredictions: MatchResult[]) {
    const roundWinners: Record<number, string> = {};
    for (const prediction of matchPredictions) {
        const [scoreA, scoreB] = prediction.result;

        let winner: string;
        if (scoreA > scoreB) {
            // @ts-ignore
            winner = prediction.teams[0];
        } else if (scoreB > scoreA) {
            // @ts-ignore
            winner = prediction.teams[1];
        } else {
            winner = '';
        }

        roundWinners[prediction.match] = winner;
    }
    return roundWinners;
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}