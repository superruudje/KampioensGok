export interface Tournament {
    name: string;
    matches: Match[];
    locations: Location[];
    poules: Poule[];
    teams: Team[];
}

export interface Match {
    num: number;
    match_day_id: number;
    time: string;
    location_id: number;
    teams: string[];
    result: number[];
    result_after_extra_time?: number[];
    result_after_penalties?: number[];
    events?: MatchEvent[];
    poule_name: string;
}

export type MatchEventType =
    'goal' |
    'own_goal' |
    'penalty_goal' |
    'missed_penalty' |
    'yellow_card' |
    'red_card' |
    'substitution';

export interface MatchEvent {
    type: MatchEventType;
    minute: number;
    player: string;
    team: string;
    assist?: string;
    note?: string;
}

export interface MatchDay {
    id: number;
    date: string;
    type: MatchDayType;
    stage: 'group' | 'knockout';
}

export interface MatchesByDay {
    matchDayId: number;
    matchDayDate: string;
    matches: Match[];
}

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

export interface Location {
    id: number;
    country: string;
    city: string;
    stadium: string;
    capacity: number;
}

export interface TournamentPoule {
    name: string;
    teams: string[];
}

export interface Poule {
    id?: number;
    name: string;
    teams: TeamStats[];
}

export interface PouleWithMatches {
    name: string;
    matches: Match[];
}

export interface Team {
    id: string;
    short_name: string;
    full_name: string;
    poule_name: string;
    squad: string[];
}

export interface TeamStats {
    team: string; // Team name
    points: number;
    for: number;
    against: number;
    matches: string[]; // 'W', 'L', or 'D' for win, loss, draw
}