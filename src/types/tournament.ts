/**
 * Represents a complete tournament configuration including
 * teams, matches, poules, and tournament locations.
 */
export interface Tournament {
    /** Tournament name */
    name: string;

    /** All matches played during the tournament */
    matches: Match[];

    /** Available tournament locations/stadiums */
    locations: Location[];

    /** Tournament poules/groups */
    poules: Poule[];

    /** Participating teams */
    teams: Team[];
}

/**
 * Represents a single tournament match.
 */
export interface Match {
    /** Unique match number */
    num: number;

    /** Reference to the match day */
    match_day_id: number;

    /** Match start time */
    time: string;

    /** Reference to the match location */
    location_id: number;

    /** Participating teams (home/away order) */
    teams: string[];

    /** Final result after regular time */
    result: number[];

    /** Result after extra time */
    result_after_extra_time?: number[];

    /** Result after penalty shootout */
    result_after_penalties?: number[];

    /** Match events such as goals and cards */
    events?: MatchEvent[];

    /** Poule/group name */
    poule_name: string;
}

/**
 * Supported match event types.
 */
export type MatchEventType =
    'goal' |
    'own_goal' |
    'penalty_goal' |
    'missed_penalty' |
    'yellow_card' |
    'red_card' |
    'substitution';

/**
 * Represents an event that occurred during a match.
 */
export interface MatchEvent {
    /** Event type */
    type: MatchEventType;

    /** Minute in which the event occurred */
    minute: number;

    /** Player involved in the event */
    player: string;

    /** Team associated with the event */
    team: string;

    /** Assisting player (if applicable) */
    assist?: string;

    /** Additional event details */
    note?: string;
}

/**
 * Represents a tournament match day.
 */
export interface MatchDay {
    /** Unique match day identifier */
    id: number;

    /** Match day date */
    date: string;

    /** Match day type/stage */
    type: MatchDayType;

    /** Tournament stage */
    stage: 'group' | 'knockout';
}

/**
 * Groups matches by match day.
 */
export interface MatchesByDay {
    /** Match day identifier */
    matchDayId: number;

    /** Match day date */
    matchDayDate: string;

    /** Matches scheduled for the day */
    matches: Match[];
}

/**
 * Supported tournament stages and match day types.
 */
export enum MatchDayType {
    MatchDay1 = 'match_day_1',
    MatchDay2 = 'match_day_2',
    MatchDay3 = 'match_day_3',
    RoundOf32 = 'round_of_32',
    RoundOf16 = 'round_of_16',
    QuaterFinal = 'quarter_finals',
    SemiFinal = 'semi_finals',
    FinalBronze = 'bronze_final',
    Final = 'final'
}

/**
 * Represents a tournament location/stadium.
 */
export interface Location {
    /** Unique location identifier */
    id: number;

    /** Country where the stadium is located */
    country: string;

    /** City where the stadium is located */
    city: string;

    /** Stadium name */
    stadium: string;

    /** Stadium capacity */
    capacity: number;
}

/**
 * Lightweight poule definition containing only team names.
 */
export interface TournamentPoule {
    /** Poule/group name */
    name: string;

    /** Team identifiers/names */
    teams: string[];
}

/**
 * Represents a tournament poule/group including standings.
 */
export interface Poule {
    /** Optional database identifier */
    id?: number;

    /** Poule/group name */
    name: string;

    /** Team standings within the poule */
    teams: TeamStats[];
}

/**
 * Represents a poule together with its matches.
 */
export interface PouleWithMatches {
    /** Poule/group name */
    name: string;

    /** Matches played within the poule */
    matches: Match[];
}

/**
 * Represents a tournament team.
 */
export interface Team {
    /** Unique team identifier */
    id: string;

    /** Short display name */
    short_name: string;

    /** Full team name */
    full_name: string;

    /** Assigned poule/group name */
    poule_name: string;

    /** Team squad/player names */
    squad: string[];
}

/**
 * Represents calculated statistics for a team within a poule.
 */
export interface TeamStats {
    /** Team name */
    team: string;

    /** Total points */
    points: number;

    /** Goals scored */
    for: number;

    /** Goals conceded */
    against: number;

    /**
     * Match results in chronological order.
     * Values:
     * - W = Win
     * - D = Draw
     * - L = Loss
     */
    matches: string[];
}