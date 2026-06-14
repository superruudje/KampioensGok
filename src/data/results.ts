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
                assist: 'Erik Lira',
                team: 'MEX'
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
                assist: 'Roberto Alvarado',
                team: 'MEX'
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
                assist: 'Vladimír Coufal',
                team: 'CZE'
            },
            {
                minute: 67,
                type: 'goal',
                player: 'Hwang Inbeom',
                assist: 'Lee Kang-in',
                team: 'KOR'
            },
            {
                minute: 80,
                type: 'goal',
                player: 'Oh Hyeongyu',
                assist: 'Hwang Inbeom',
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
                assist: 'Sead Kolašinac',
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
                assist: 'Promise David',
                team: 'CAN'
            },
            {
                minute: 93,
                type: 'yellow_card',
                player: 'Nikola Katic',
                team: 'BIH'
            },
        ]
    },
    4: {
        result: [4, 1],
        events: [
            {
                minute: 7,
                type: 'own_goal',
                player: 'Damian Bobadilla',
                team: 'PAR',
                note: '(OG)'
            },
            {
                minute: 9,
                type: 'yellow_card',
                player: 'Juan Jose Caceres',
                team: 'PAR'
            },
            {
                minute: 31,
                type: 'goal',
                player: 'Folarin Balogun',
                assist: 'Christian Pulisic',
                team: 'USA',
            },
            {
                minute: 45,
                extraMinute: 5,
                type: 'goal',
                player: 'Folarin Balogun',
                assist: 'Malik Tillman',
                team: 'USA',
            },
            {
                minute: 53,
                type: 'yellow_card',
                player: 'Miguel Almiron',
                team: 'PAR'
            },
            {
                minute: 59,
                type: 'yellow_card',
                player: 'Tyler Adams',
                team: 'USA'
            },
            {
                minute: 73,
                type: 'goal',
                player: 'Mauricio',
                assist: 'Julio Enciso',
                team: 'PAR',
            },
            {
                minute: 79,
                type: 'yellow_card',
                player: 'Diego Gomez',
                team: 'PAR'
            },
            {
                minute: 88,
                type: 'yellow_card',
                player: 'Alex Arce',
                team: 'PAR'
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Junior Alonso',
                team: 'PAR'
            },
            {
                minute: 90,
                extraMinute: 8,
                type: 'goal',
                player: 'Giovanni Reyna',
                assist: 'Alex Freeman',
                team: 'USA',
            },
        ]
    },
    5: {
        result: [0, 1],
        events: []
    },
    6: {
        result: [2, 0],
        events: []
    },
    7: {
        result: [1, 1],
        events: []
    },
    8: {
        result: [1, 1],
        events: []
    }
};