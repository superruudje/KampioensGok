import type { Match } from "@/types/tournament";

export const results: Record<
    number,
    Pick<
        Match,
        | "result"
        | "result_after_extra_time"
        | "result_after_penalties"
        | "events"
    >
> = {
    1: {
        result: [2, 0],
        events: [
            {
                minute: 9,
                type: 'goal',
                player: 'Julian Quinones',
                team: 'MEX',
                assist: 'Erik Lira'
            },
            {
                minute: 17,
                type: 'yellow_card',
                player: 'Teboho Mokoena',
                team: 'RSA'
            },
            {
                minute: 23,
                type: 'yellow_card',
                player: 'Brian Gutierrez',
                team: 'MEX'
            },
            {
                minute: 49,
                type: 'red_card',
                player: 'Sphephelo Sithole',
                team: 'RSA'
            },
            {
                minute: 67,
                type: 'goal',
                player: 'Raul Jimenez',
                team: 'MEX',
                assist: 'Roberto Alvarado'
            },
            {
                minute: 74,
                type: 'yellow_card',
                player: 'Nkosinathi Sibisi',
                team: 'RSA'
            },
            {
                minute: 84,
                type: 'red_card',
                player: 'Themba Zwane',
                team: 'RSA'
            },
            {
                minute: 92,
                type: 'red_card',
                player: 'Cesar Montes',
                team: 'MEX'
            },
        ]
    },
    2: {
        result: [2, 1],
        events: [
            {
                minute: 59,
                type: 'goal',
                player: 'Ladislav Krejci',
                team: 'CZE'
            },
            {
                minute: 67,
                type: 'goal',
                player: 'Hwang Inbeom',
                team: 'KOR'
            },
            {
                minute: 80,
                type: 'goal',
                player: 'Oh Hyeongyu',
                team: 'KOR'
            },
            {
                minute: 96,
                type: 'yellow_card',
                player: 'Lee Gihyuk',
                team: 'KOR'
            },
        ]
    },
    3: {
        result: [1, 1],
        events: [
            {
                minute: 11,
                type: 'yellow_card',
                player: 'Alistair Johnston',
                team: 'CAN'
            },
            {
                minute: 21,
                type: 'goal',
                player: 'Jovo Lukic',
                team: 'BIH'
            },
            {
                minute: 44,
                type: 'yellow_card',
                player: 'Ermedin Demirovic',
                team: 'BIH'
            },
            {
                minute: 46,
                type: 'yellow_card',
                player: 'Jovo Lukic',
                team: 'BIH'
            },
            {
                minute: 53,
                type: 'yellow_card',
                player: 'Luc De Fougerolles',
                team: 'CAN'
            },
            {
                minute: 78,
                type: 'goal',
                player: 'Cyle Larin',
                team: 'CAN'
            },
            {
                minute: 93,
                type: 'yellow_card',
                player: 'Nikola Katic',
                team: 'BIH'
            },
        ]
    }
};