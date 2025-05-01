export interface Question {
    question: string,
    help?: string,
    answer: any,
    answer_type: "string" | "number" | "team" | "player",
    current_answer: any,
    type: "exact" | "estimate",
    points?: number,
    match_day_answered: number
}

export interface Player {
    name: string,
    team_name: string,
    predictions: MatchResult[],
    bonus: any[],
    round_of_32: string[],
    round_of_16: string[],
    quarter_finals: string[],
    semi_finals: string[],
    finals_bronze: string[],
    finals: string[],
    score?: number,
    pos?: number
}

export interface MatchResult {
    match: number,
    result: number[],
    teams?: string[],
}