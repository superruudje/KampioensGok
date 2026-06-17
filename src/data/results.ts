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
        events: [
            {
                minute: 28,
                type: 'goal',
                player: 'John McGinn',
                team: 'SCO',
            },
            {
                minute: 39,
                type: 'yellow_card',
                player: 'Jean-Ricner Bellegarde',
                team: 'HTI'
            },
            {
                minute: 46,
                type: 'yellow_card',
                player: 'Aaron Hickey',
                team: 'SCO'
            },
            {
                minute: 90,
                extraMinute: 1,
                type: 'yellow_card',
                player: 'Findlay Curtis',
                team: 'SCO'
            },
            {
                minute: 90,
                extraMinute: 5,
                type: 'yellow_card',
                player: 'Kenny McLean',
                team: 'SCO'
            },
        ]
    },
    6: {
        result: [2, 0],
        events: [
            {
                minute: 27,
                type: 'goal',
                player: 'Nestory Irankunda',
                assist: 'Paul Okon-Engstler',
                team: 'AUS',
            },
            {
                minute: 75,
                type: 'goal',
                player: 'Connor Metcalfe',
                team: 'AUS',
            },
            {
                minute: 86,
                type: 'yellow_card',
                player: 'Yunus Akgun',
                team: 'TUR'
            },
        ]
    },
    7: {
        result: [1, 1],
        events: [
            {
                minute: 21,
                type: 'goal',
                player: 'Ismael Saibari',
                assist: 'Brahim Díaz',
                team: 'MAR',
            },
            {
                minute: 32,
                type: 'goal',
                player: 'Vinicius Junior',
                assist: 'Bruno Guimarães',
                team: 'BRA',
            },
            {
                minute: 37,
                type: 'yellow_card',
                player: 'Casemiro',
                team: 'BRA'
            },
            {
                minute: 43,
                type: 'yellow_card',
                player: 'Roger Ibanez',
                team: 'BRA'
            },
        ]
    },
    8: {
        result: [1, 1],
        events: [
            {
                minute: 13,
                type: 'yellow_card',
                player: 'Mahmoud Abunada',
                team: 'QAT'
            },
            {
                minute: 17,
                type: 'goal',
                player: 'Breel Embolo',
                team: 'SUI',
                note: '(PEN)'
            },
            {
                minute: 23,
                type: 'yellow_card',
                player: 'Jassem Gaber',
                team: 'QAT'
            },
            {
                minute: 42,
                type: 'yellow_card',
                player: 'Denis Zakaria',
                team: 'SUI'
            },
            {
                minute: 90,
                extraMinute: 4,
                type: 'own_goal',
                player: 'Miro Muheim',
                team: 'SUI',
                note: '(OG)'
            },
        ]
    },
    9: {
        result: [1, 0],
        events: [
            {
                minute: 28,
                type: 'yellow_card',
                player: 'Seko Fofana',
                team: 'CIV'
            },
            {
                minute: 38,
                type: 'yellow_card',
                player: 'Franck Kessie',
                team: 'CIV'
            },
            {
                minute: 40,
                type: 'yellow_card',
                player: 'Guela Doue',
                team: 'CIV'
            },
            {
                minute: 73,
                type: 'yellow_card',
                player: 'Jackson Porozo',
                team: 'ECO'
            },
            {
                minute: 90,
                type: 'goal',
                player: 'Amad Diallo',
                assist: 'Wilfried Singo',
                team: 'CIV'
            },
        ]
    },
    10: {
        result: [7, 1],
        events: [
            {
                minute: 6,
                type: 'goal',
                player: 'Felix Nmecha',
                team: 'GER',
            },
            {
                minute: 21,
                type: 'goal',
                player: 'Livano Comenencia',
                team: 'CUW',
            },
            {
                minute: 38,
                type: 'goal',
                player: 'Nico Schlotterbeck',
                team: 'GER',
            },
            {
                minute: 45,
                extraMinute: 5,
                type: 'goal',
                player: 'Kai Havertz',
                team: 'GER',
            },
            {
                minute: 47,
                type: 'goal',
                player: 'Jamal Musiala',
                team: 'GER',
            },
            {
                minute: 68,
                type: 'goal',
                player: 'Nathaniel Brown',
                team: 'GER',
            },
            {
                minute: 78,
                type: 'goal',
                player: 'Deniz Undav',
                team: 'GER',
            },
            {
                minute: 88,
                type: 'goal',
                player: 'Kai Havertz',
                team: 'GER',
            },
        ]
    },
    11: {
        result: [2, 2],
        events: [
            {
                minute: 50,
                type: 'goal',
                player: 'Virgil van Dijk',
                assist: 'Ryan Gravenberch',
                team: 'NED',
            },
            {
                minute: 57,
                type: 'goal',
                player: 'Keito Nakamura',
                assist: 'Takefusa Kubo',
                team: 'JPN',
            },
            {
                minute: 61,
                type: 'yellow_card',
                player: 'Crysencio Summerville',
                team: 'NED'
            },
            {
                minute: 64,
                type: 'goal',
                player: 'Crysencio Summerville',
                assist: 'Ryan Gravenberch',
                team: 'NED',
            },
            {
                minute: 83,
                type: 'yellow_card',
                player: 'Memphis Depay',
                team: 'NED'
            },
            {
                minute: 88,
                type: 'goal',
                player: 'Daichi Kamada',
                team: 'JPN',
            },
            {
                minute: 90,
                extraMinute: 1,
                type: 'yellow_card',
                player: 'Micky van de Van',
                team: 'NED'
            },
        ]
    },
    12: {
        result: [5, 1],
        events: [
            {
                minute: 7,
                type: 'goal',
                player: 'Yasin Ayari',
                team: 'SWE',
            },
            {
                minute: 30,
                type: 'goal',
                player: 'Alexander Isak',
                assist: 'Viktor Gyökeres',
                team: 'SWE',
            },
            {
                minute: 43,
                type: 'goal',
                player: 'Omar Rekik',
                assist: 'Hannibal Mejbri',
                team: 'TUN',
            },
            {
                minute: 54,
                type: 'yellow_card',
                player: 'Rani Khedira',
                team: 'TUN'
            },
            {
                minute: 59,
                type: 'goal',
                player: 'Viktor Gyokeres',
                assist: 'Alexander Isak',
                team: 'SWE',
            },
            {
                minute: 84,
                type: 'goal',
                player: 'Mattias Svanberg',
                team: 'SWE',
            },
            {
                minute: 90,
                extraMinute: 6,
                type: 'goal',
                player: 'Yasin Ayari',
                team: 'SWE',
            },
        ]
    },
    13: {
        result: [1, 1],
        events: [
            {
                minute: 41,
                type: 'goal',
                player: 'Abduleleh Alamri',
                team: 'KSA',
            },
            {
                minute: 44,
                type: 'yellow_card',
                player: 'Abduleleh Alamri',
                team: 'KSA'
            },
            {
                minute: 80,
                type: 'goal',
                player: 'Maxi Araujo',
                team: 'URU',
            },
        ]
    },
    14: {
        result: [0, 0],
        events: [
            {
                minute: 16,
                type: 'yellow_card',
                player: 'Sidny Lopes Cabral',
                team: 'CPV'
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Pedri',
                team: 'ESP'
            },
        ]
    },
    15: {
        result: [2, 2],
        events: [
            {
                minute: 7,
                type: 'goal',
                player: 'Elijah Just',
                team: 'NZL',
            },
            {
                minute: 32,
                type: 'goal',
                player: 'Ramin Rezaeian',
                team: 'IRN',
            },
            {
                minute: 54,
                type: 'goal',
                player: 'Elijah Just',
                assist: 'Chris Wood',
                team: 'NZL',
            },
            {
                minute: 64,
                type: 'goal',
                player: 'Mohammad Mohebbi',
                assist: 'Ramin Rezaeian',
                team: 'IRN',
            },
            {
                minute: 89,
                type: 'yellow_card',
                player: 'Ehsan Hajisafi',
                team: 'IRN'
            },
        ]
    },
    16: {
        result: [1, 1],
        events: [
            {
                minute: 13,
                type: 'yellow_card',
                player: 'Marawan Attia',
                team: 'EGY'
            },
            {
                minute: 14,
                type: 'yellow_card',
                player: 'Timothy Castagne',
                team: 'BEL'
            },
            {
                minute: 19,
                type: 'goal',
                player: 'Emam Ashour',
                assist: 'Mohamed Salah',
                team: 'EGY',
            },
            {
                minute: 34,
                type: 'yellow_card',
                player: 'Ahmed Fatouh',
                team: 'EGY'
            },
            {
                minute: 66,
                type: 'own_goal',
                player: 'Mohamed Hany',
                team: 'EGY',
                note: '(OG)'
            },
            {
                minute: 75,
                type: 'yellow_card',
                player: 'Maxim de Cuyper',
                team: 'BEL'
            },
        ]
    },
    17: {
        result: [3, 1],
        events: [
            {
                minute: 66,
                type: 'goal',
                player: 'Kylian Mbappe',
                team: 'FRA',
            },
            {
                minute: 82,
                type: 'goal',
                player: 'Bradley Barcola',
                team: 'FRA',
            },
            {
                minute: 90,
                extraMinute: 5,
                type: 'goal',
                player: 'Bradley Barcola',
                team: 'SEN',
            },
            {
                minute: 90,
                extraMinute: 6,
                type: 'goal',
                player: 'Kylian Mbappe',
                team: 'FRA',
            },
        ]
    },
    18: {
        result: [1, 4],
        events: [
            {
                minute: 29,
                type: 'goal',
                player: 'Erling Haaland',
                team: 'NOR',
            },
            {
                minute: 39,
                type: 'goal',
                player: 'Aymen Hussein',
                team: 'IRQ',
            },
            {
                minute: 43,
                type: 'goal',
                player: 'Erling Haaland',
                team: 'NOR',
            },
            {
                minute: 76,
                type: 'goal',
                player: 'Leo Ostigard',
                team: 'NOR',
            },
            {
                minute: 86,
                type: 'yellow_card',
                player: 'Zaid Tahseen',
                team: 'IRQ'
            },
            {
                minute: 90,
                extraMinute: 6,
                type: 'own_goal',
                player: 'Aymen Hussein',
                team: 'IRQ',
                note: '(OG)'
            },
        ]
    },
    19: {
        result: [3, 0],
        events: [
            {
                minute: 17,
                type: 'goal',
                player: 'Lionel Messi',
                team: 'ARG',
            },
            {
                minute: 60,
                type: 'goal',
                player: 'Lionel Messi',
                team: 'ARG',
            },
            {
                minute: 76,
                type: 'goal',
                player: 'Lionel Messi',
                team: 'ARG',
            },
        ]
    },
    20: {
        result: [3, 1],
        events: [
            {
                minute: 20,
                type: 'goal',
                player: 'Romano Schmid',
                team: 'AUT',
            },
            {
                minute: 50,
                type: 'goal',
                player: 'Ali Olwan',
                team: 'JOR',
            },
            {
                minute: 76,
                type: 'own_goal',
                player: 'Yazan Alarab',
                team: 'JOR',
                note: '(OG)'
            },
            {
                minute: 77,
                type: 'yellow_card',
                player: 'Marcel Sabitzer',
                team: 'AUT'
            },
            {
                minute: 90,
                extraMinute: 12,
                type: 'goal',
                player: 'Marko Arnautovic',
                team: 'AUT',
            },
        ]
    },
    23: {
        result: [1, 1],
        events: []
    }
};