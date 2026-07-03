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
                assist: 'Michael Olise',
                team: 'FRA',
            },
            {
                minute: 82,
                type: 'goal',
                player: 'Bradley Barcola',
                assist: 'Adrien Rabiot',
                team: 'FRA',
            },
            {
                minute: 90,
                extraMinute: 5,
                type: 'goal',
                player: 'Ibrahim Mbaye',
                assist: 'Iliman Ndiaye',
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
                assist: 'D. M. Wolfe',
                team: 'NOR',
            },
            {
                minute: 39,
                type: 'goal',
                player: 'Aymen Hussein',
                assist: 'Amir Al-Ammari',
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
                assist: 'Martin Ødegaard',
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
                assist: 'R. D. Paul',
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
                assist: 'Nico González',
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
                assist: 'Xaver Schlager',
                team: 'AUT',
            },
            {
                minute: 50,
                type: 'goal',
                player: 'Ali Olwan',
                assist: 'Noor Al Rawabdeh',
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
                note: '(PEN)'
            },
        ]
    },
    21: {
        result: [1, 0],
        events: [
            {
                minute: 16,
                type: 'yellow_card',
                player: 'Caleb Yirenkyi',
                team: 'GHA'
            },
            {
                minute: 72,
                type: 'yellow_card',
                player: 'Cesar Blackman',
                team: 'PAN'
            },
            {
                minute: 90,
                extraMinute: 5,
                type: 'goal',
                player: 'Caleb Yirenkyi',
                team: 'GHA',
            },
            {
                minute: 90,
                extraMinute: 9,
                type: 'yellow_card',
                player: 'Carlos Harvey',
                team: 'PAN'
            },
        ]
    },
    22: {
        result: [4, 2],
        events: [
            {
                minute: 12,
                type: 'goal',
                player: 'Harry Kane',
                team: 'ENG',
                note: '(PEN)'
            },
            {
                minute: 36,
                type: 'goal',
                player: 'Martin Baturina',
                assist: 'Petar Sučić',
                team: 'CRO',
            },
            {
                minute: 42,
                type: 'goal',
                player: 'Harry Kane',
                assist: 'Declan Rice',
                team: 'ENG',
            },
            {
                minute: 45,
                extraMinute: 5,
                type: 'goal',
                player: 'Petar Musa',
                assist: 'Ivan Perišić',
                team: 'CRO',
            },
            {
                minute: 47,
                type: 'goal',
                player: 'Jude Bellingham',
                assist: 'Elliot Anderson',
                team: 'ENG',
            },
            {
                minute: 85,
                type: 'goal',
                player: 'Marcus Rashford',
                assist: 'Bukayo Saka',
                team: 'ENG',
            },
        ]
    },
    23: {
        result: [1, 1],
        events: [
            {
                minute: 6,
                type: 'goal',
                player: 'Joao Neves',
                assist: 'Pedro Neto',
                team: 'POR',
            },
            {
                minute: 13,
                type: 'yellow_card',
                player: 'Bernardo Silva',
                team: 'POR'
            },
            {
                minute: 32,
                type: 'yellow_card',
                player: 'Chancel Mbemba',
                team: 'COD'
            },
            {
                minute: 45,
                extraMinute: 5,
                type: 'goal',
                player: 'Yoane Wissa',
                assist: 'Arthur Masuaku',
                team: 'COD',
            },
            {
                minute: 88,
                type: 'yellow_card',
                player: 'Nelson Semedo',
                team: 'POR'
            },
            {
                minute: 90,
                extraMinute: 2,
                type: 'yellow_card',
                player: 'Tomas Araujo',
                team: 'POR'
            },
        ]
    },
    24: {
        result: [1, 3],
        events: [
            {
                minute: 7,
                type: 'yellow_card',
                player: 'Johan Mojica',
                team: 'COL'
            },
            {
                minute: 34,
                type: 'yellow_card',
                player: 'Abdukodir Khusanov',
                team: 'UZB'
            },
            {
                minute: 40,
                type: 'goal',
                player: 'Daniel Munoz',
                assist: 'Luis Diaz',
                team: 'COL',
            },
            {
                minute: 60,
                type: 'goal',
                player: 'Abbosbek Fayzullaev',
                team: 'UZB',
            },
            {
                minute: 65,
                type: 'goal',
                player: 'Luis Diaz',
                assist: 'Gustavo Puerta',
                team: 'COL',
            },
            {
                minute: 90,
                extraMinute: 9,
                type: 'goal',
                player: 'Jaminton Campaz',
                assist: 'J. C. Hernandez',
                team: 'COL',
            },
        ]
    },
    25: {
        result: [1, 1],
        events: [
            {
                minute: 6,
                type: 'goal',
                player: 'Michal Sadilek',
                assist: 'Alexandr Sojka',
                team: 'CZE',
            },
            {
                minute: 33,
                type: 'yellow_card',
                player: 'Teboho Mokoena',
                team: 'RSA'
            },
            {
                minute: 40,
                type: 'yellow_card',
                player: 'Thalente Mbatha',
                team: 'RSA'
            },
            {
                minute: 75,
                type: 'yellow_card',
                player: 'Ladislav Krejci',
                team: 'CZE'
            },
            {
                minute: 6,
                type: 'goal',
                player: 'Teboho Mokoena',
                team: 'RSA',
                note: '(PEN)'
            },
        ]
    },
    26: {
        result: [4, 1],
        events: [
            {
                minute: 59,
                type: 'yellow_card',
                player: 'Amar Dedic',
                team: 'BIH'
            },
            {
                minute: 61,
                type: 'yellow_card',
                player: 'Edin Dzeko',
                team: 'BIH'
            },
            {
                minute: 65,
                type: 'yellow_card',
                player: 'Nico Elvedi',
                team: 'SUI'
            },
            {
                minute: 74,
                type: 'goal',
                player: 'Johan Manzambi',
                team: 'SUI',
            },
            {
                minute: 80,
                type: 'red_card',
                player: 'Tarik Muharemovic',
                team: 'BIH'
            },
            {
                minute: 84,
                type: 'goal',
                player: 'Ruben Vargas',
                assist: 'Breel Embolo',
                team: 'SUI',
            },
            {
                minute: 90,
                type: 'goal',
                player: 'Johan Manzambi',
                assist: 'Ruben Vargas',
                team: 'SUI',
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'goal',
                player: 'Ermin Mahmic',
                team: 'BIH',
            },
            {
                minute: 90,
                extraMinute: 7,
                type: 'goal',
                player: 'Granit Xhaka',
                team: 'SUI',
                note: '(PEN)'
            },
        ]
    },
    27: {
        result: [6, 0],
        events: [
            {
                minute: 9,
                type: 'yellow_card',
                player: 'Derek Cornelius',
                team: 'CAN'
            },
            {
                minute: 16,
                type: 'goal',
                player: 'Cyle Larin',
                team: 'CAN',
            },
            {
                minute: 29,
                type: 'goal',
                player: 'Jonathan David',
                team: 'CAN',
            },
            {
                minute: 33,
                type: 'red_card',
                player: 'Homam Al-Amin',
                team: 'QAT'
            },
            {
                minute: 45,
                extraMinute: 3,
                type: 'goal',
                player: 'Jonathan David',
                team: 'CAN',
            },
            {
                minute: 53,
                type: 'red_card',
                player: 'Assim Madibo',
                team: 'QAT'
            },
            {
                minute: 62,
                type: 'yellow_card',
                player: 'A. F. Abdoulla',
                team: 'QAT'
            },
            {
                minute: 64,
                type: 'goal',
                player: 'Nathan-Dylan Saliba',
                team: 'CAN',
            },
            {
                minute: 75,
                type: 'own_goal',
                player: 'Mohammed Al-Mannai',
                team: 'BIH',
                note: '(OG)'
            },
            {
                minute: 90,
                extraMinute: 2,
                type: 'goal',
                player: 'Jonathan David',
                team: 'CAN',
            },
        ]
    },
    28: {
        result: [1, 0],
        events: [
            {
                minute: 4,
                type: 'yellow_card',
                player: 'Lee Kang-in',
                team: 'KOR'
            },
            {
                minute: 50,
                type: 'goal',
                player: 'Luis Romo',
                team: 'MEX',
            },
            {
                minute: 58,
                type: 'yellow_card',
                player: 'Paik Seung-Ho',
                team: 'KOR'
            },
        ]
    },
    29: {
        result: [3, 0],
        events: [
            {
                minute: 4,
                type: 'yellow_card',
                player: 'Carlens Arcus',
                team: 'HTI'
            },
            {
                minute: 23,
                type: 'goal',
                player: 'Matheus Cunha',
                team: 'BRA',
            },
            {
                minute: 36,
                type: 'goal',
                player: 'Matheus Cunha',
                team: 'BRA',
            },
            {
                minute: 45,
                extraMinute: 3,
                type: 'goal',
                player: 'Vinicius Junior',
                team: 'BRA',
            },
            {
                minute: 45,
                extraMinute: 4,
                type: 'yellow_card',
                player: 'Frantzy Pierrot',
                team: 'HTI'
            },
            {
                minute: 65,
                type: 'yellow_card',
                player: 'Douglas Santor',
                team: 'BRA'
            },
            {
                minute: 72,
                type: 'yellow_card',
                player: 'Danley Jean Jacques',
                team: 'HTI'
            },
        ]
    },
    30: {
        result: [0, 1],
        events: [
            {
                minute: 2,
                type: 'goal',
                player: 'Ismael Saibari',
                assist: 'Brahim Diaz',
                team: 'MAR',
            },
            {
                minute: 22,
                type: 'yellow_card',
                player: 'Issa Diop',
                team: 'MAR'
            },
            {
                minute: 65,
                type: 'yellow_card',
                player: 'Andy Robertson',
                team: 'SCO'
            },
        ]
    },
    31: {
        result: [0, 1],
        events: [
            {
                minute: 2,
                type: 'goal',
                player: 'Matias Galarza',
                assist: 'Julio Enciso',
                team: 'PAR',
            },
            {
                minute: 4,
                type: 'yellow_card',
                player: 'Matias Galarza',
                team: 'PAR'
            },
            {
                minute: 37,
                type: 'yellow_card',
                player: 'Carlos Gonzalez',
                team: 'PAR'
            },
            {
                minute: 45,
                extraMinute: 3,
                type: 'red_card',
                player: 'Miguel Almiron',
                team: 'PAR'
            },
            {
                minute: 63,
                type: 'yellow_card',
                player: 'Vincenzo Montella',
                team: 'TUR'
            },
            {
                minute: 71,
                type: 'yellow_card',
                player: 'Eren Elmali',
                team: 'TUR'
            },
        ]
    },
    32: {
        result: [2, 0],
        events: [
            {
                minute: 11,
                type: 'own_goal',
                player: 'Cameron Burgess',
                team: 'AUS',
                note: '(OG)'
            },
            {
                minute: 16,
                type: 'yellow_card',
                player: 'Jordan Bos',
                team: 'AUS'
            },
            {
                minute: 32,
                type: 'yellow_card',
                player: 'Alessandro Circati',
                team: 'AUS'
            },
            {
                minute: 43,
                type: 'goal',
                player: 'Alex Freeman',
                team: 'USA',
            },
            {
                minute: 56,
                type: 'yellow_card',
                player: 'Antonee Robinson',
                team: 'USA'
            },
            {
                minute: 89,
                type: 'yellow_card',
                player: 'Folarin Balogun',
                team: 'USA'
            },
            {
                minute: 89,
                type: 'yellow_card',
                player: 'Jacob Italiano',
                team: 'AUS'
            },
            {
                minute: 89,
                type: 'yellow_card',
                player: 'Harry Souttar',
                team: 'AUS'
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Chris Richards',
                team: 'USA'
            },
        ]
    },
    33: {
        result: [2, 1],
        events: [
            {
                minute: 30,
                type: 'goal',
                player: 'Franck Kessie',
                team: 'CIV',
            },
            {
                minute: 68,
                type: 'goal',
                player: 'Deniz Undav',
                assist: 'Nadiem Amiri',
                team: 'GER',
            },
            {
                minute: 90,
                extraMinute: 4,
                type: 'goal',
                player: 'Deniz Undav',
                assist: 'Felix Nmecha',
                team: 'GER',
            },
        ]
    },
    34: {
        result: [0, 0],
        events: [
            {
                minute: 38,
                type: 'yellow_card',
                player: 'Jordy Alcivar',
                team: 'ECU'
            },
            {
                minute: 38,
                type: 'yellow_card',
                player: 'Leandro Bacuna',
                team: 'CUW'
            },
            {
                minute: 53,
                type: 'yellow_card',
                player: 'Juninho Bacuna',
                team: 'CUW'
            },
            {
                minute: 56,
                type: 'yellow_card',
                player: 'Livano Comenencia',
                team: 'CUW'
            },
            {
                minute: 75,
                type: 'yellow_card',
                player: 'Jurien Gaari',
                team: 'CUW'
            },
            {
                minute: 90,
                extraMinute: 1,
                type: 'yellow_card',
                player: 'Gervane Kastaneer',
                team: 'CUW'
            },
        ]
    },
    35: {
        result: [5, 1],
        events: [
            {
                minute: 5,
                type: 'goal',
                player: 'Brian Brobbey',
                team: 'NED',
            },
            {
                minute: 17,
                type: 'goal',
                player: 'Brian Brobbey',
                team: 'NED',
            },
            {
                minute: 47,
                type: 'goal',
                player: 'Cody Gakpo',
                team: 'NED',
            },
            {
                minute: 53,
                type: 'yellow_card',
                player: 'Gabriel Gudmundsson',
                team: 'SWE'
            },
            {
                minute: 54,
                type: 'goal',
                player: 'Cody Gakpo',
                team: 'NED',
            },
            {
                minute: 59,
                type: 'goal',
                player: 'Anthony Elanga',
                team: 'SWE',
            },
            {
                minute: 75,
                type: 'yellow_card',
                player: 'Yasin Ayari',
                team: 'SWE'
            },
            {
                minute: 80,
                type: 'yellow_card',
                player: 'Lucas Bergvall',
                team: 'SWE'
            },
            {
                minute: 89,
                type: 'goal',
                player: 'Crysencio Summerville',
                team: 'NED',
            },
        ]
    },
    36: {
        result: [0, 4],
        events: [
            {
                minute: 5,
                type: 'goal',
                player: 'Daichi Kamada',
                assist: 'Keito Nakamura',
                team: 'JPN',
            },
            {
                minute: 31,
                type: 'goal',
                player: 'Ayasa Ueda',
                assist: 'Kou Itakura',
                team: 'JPN',
            },
            {
                minute: 69,
                type: 'goal',
                player: 'Junya Ito',
                assist: 'Ayase Ueda',
                team: 'JPN',
            },
            {
                minute: 83,
                type: 'goal',
                player: 'Ayasa Ueda',
                assist: 'Kaishu Sano',
                team: 'JPN',
            },
        ]
    },
    37: {
        result: [2, 2],
        events: [
            {
                minute: 5,
                type: 'yellow_card',
                player: 'Sidney Lopes Cabral',
                team: 'CPV'
            },
            {
                minute: 20,
                type: 'yellow_card',
                player: 'Rodrigo Bentancur',
                team: 'URU'
            },
            {
                minute: 21,
                type: 'goal',
                player: 'Kevin Pina',
                team: 'CPV',
            },
            {
                minute: 44,
                type: 'goal',
                player: 'Maxi Araujo',
                team: 'URU',
            },
            {
                minute: 45,
                extraMinute: 6,
                type: 'goal',
                player: 'Agustin Canobbio',
                assist: 'Maximiliano Araujo',
                team: 'URU',
            },
            {
                minute: 58,
                type: 'yellow_card',
                player: 'Mathias Olivera',
                team: 'URU'
            },
            {
                minute: 61,
                type: 'goal',
                player: 'Helio Varela',
                team: 'CPV',
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Diney Borges',
                team: 'CPV'
            },
        ]
    },
    38: {
        result: [4, 0],
        events: [
            {
                minute: 10,
                type: 'goal',
                player: 'Lamine Yamal',
                assist: 'Mikel Oyarzabal',
                team: 'ESP',
            },
            {
                minute: 21,
                type: 'goal',
                player: 'Mikel Oyarzabal',
                assist: 'Aymeric Laporte',
                team: 'ESP',
            },
            {
                minute: 24,
                type: 'goal',
                player: 'Mikel Oyarzabal',
                assist: 'Dani Olmo',
                team: 'ESP',
            },
            {
                minute: 30,
                type: 'yellow_card',
                player: 'Salem Aldawsari',
                team: 'KSA'
            },
            {
                minute: 49,
                type: 'own_goal',
                player: 'Hassan Altambakti',
                team: 'KSA',
                note: "(OG)"
            },
            {
                minute: 60,
                type: 'yellow_card',
                player: 'Mohamed Kanno',
                team: 'KSA'
            },
        ]
    },
    39: {
        result: [0, 0],
        events: [
            {
                minute: 3,
                type: 'yellow_card',
                player: 'Romelu Lukaku',
                team: 'BEL'
            },
            {
                minute: 33,
                type: 'yellow_card',
                player: 'Saeid Ezatolahi',
                team: 'IRN'
            },
            {
                minute: 66,
                type: 'red_card',
                player: 'Nathan Ngoy',
                team: 'BEL'
            },
        ]
    },
    40: {
        result: [1, 3],
        events: [
            {
                minute: 15,
                type: 'goal',
                player: 'Finn Surman',
                assist: 'Tim Payne',
                team: 'NZL',
            },
            {
                minute: 17,
                type: 'yellow_card',
                player: 'Mohanad Lashin',
                team: 'EGY'
            },
            {
                minute: 20,
                type: 'yellow_card',
                player: 'Sarpreet Singh',
                team: 'NZL'
            },
            {
                minute: 34,
                type: 'yellow_card',
                player: 'Callum McCowatt',
                team: 'NZL'
            },
            {
                minute: 58,
                type: 'goal',
                player: 'Mostafa Zico',
                assist: 'Mohamed Hany',
                team: 'EGY',
            },
            {
                minute: 67,
                type: 'goal',
                player: 'Mahamed Salah',
                assist: 'Mostafa Zico',
                team: 'EGY',
            },
            {
                minute: 82,
                type: 'goal',
                player: 'Mahmoud Trezeguet',
                assist: 'Mohamed Salah',
                team: 'EGY',
            },
        ]
    },
    41: {
        result: [3, 2],
        events: [
            {
                minute: 43,
                type: 'goal',
                player: 'Marcus Holmgren Pedersen',
                team: 'NOR',
            },
            {
                minute: 48,
                type: 'goal',
                player: 'Erling Haaland',
                assist: 'Martin Ødegaard',
                team: 'NOR',
            },
            {
                minute: 53,
                type: 'goal',
                player: 'Ismaila Sarr',
                assist: 'Sadio Mané',
                team: 'SEN',
            },
            {
                minute: 58,
                type: 'goal',
                player: 'Erling Haaland',
                assist: 'Patrick Berg',
                team: 'NOR',
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'goal',
                player: 'Ismaila Sarr',
                assist: 'Nicolas Jackson',
                team: 'SEN',
            },
        ]
    },
    42: {
        result: [3, 0],
        events: [
            {
                minute: 6,
                type: 'yellow_card',
                player: 'Amir Alammari',
                team: 'IRQ'
            },
            {
                minute: 14,
                type: 'goal',
                player: 'Kylian Mbappe',
                assist: 'Michael Olise',
                team: 'FRA',
            },
            {
                minute: 54,
                type: 'goal',
                player: 'Kylian Mbappe',
                assist: 'Ousmane Dembélé',
                team: 'FRA',
            },
            {
                minute: 66,
                type: 'goal',
                player: 'Ousmane Dembélé',
                assist: 'Michael Olise',
                team: 'FRA',
            },
        ]
    },
    43: {
        result: [2, 0],
        events: [
            {
                minute: 38,
                type: 'goal',
                player: 'Lionel Messi',
                assist: 'Facundo Medina',
                team: 'ARG',
            },
            {
                minute: 40,
                type: 'yellow_card',
                player: 'Stefan Posch',
                team: 'AUT'
            },
            {
                minute: 76,
                type: 'yellow_card',
                player: 'Konrad Laimer',
                team: 'AUT'
            },
            {
                minute: 76,
                type: 'yellow_card',
                player: 'Facundo Medina',
                team: 'ARG'
            },
            {
                minute: 90,
                extraMinute: 2,
                type: 'yellow_card',
                player: 'Leandro Paredes',
                team: 'ARG'
            },
            {
                minute: 90,
                extraMinute: 5,
                type: 'goal',
                player: 'Lionel Messi',
                team: 'ARG',
            },
        ]
    },
    44: {
        result: [1, 2],
        events: [
            {
                minute: 36,
                type: 'goal',
                player: 'Nizar Alrashdan',
                team: 'JOR',
            },
            {
                minute: 44,
                type: 'yellow_card',
                player: 'Ramiz Zerrouki',
                team: 'ALG'
            },
            {
                minute: 64,
                type: 'yellow_card',
                player: 'Husam Abudahab',
                team: 'JOR'
            },
            {
                minute: 69,
                type: 'goal',
                player: 'Nadhir Benbouali',
                assist: 'Riyad Mahrez',
                team: 'ALG',
            },
            {
                minute: 82,
                type: 'goal',
                player: 'Amine Gouiri',
                team: 'ALG',
            },
        ]
    },
    45: {
        result: [0, 0],
        events: [
            {
                minute: 41,
                type: 'yellow_card',
                player: 'Declan Rice',
                team: 'ENG'
            },
            {
                minute: 60,
                type: 'yellow_card',
                player: 'Inaki Williams',
                team: 'GHA'
            },
        ]
    },
    46: {
        result: [0, 1],
        events: [
            {
                minute: 54,
                type: 'goal',
                player: 'Ante Budimir',
                assist: 'Josip Stanišić',
                team: 'CRO',
            },
            {
                minute: 61,
                type: 'yellow_card',
                player: 'Edgar Yoel Barcenas',
                team: 'PAN'
            },
            {
                minute: 90,
                extraMinute: 2,
                type: 'yellow_card',
                player: 'Petar Sucic',
                team: 'CRO'
            },
        ]
    },
    47: {
        result: [5, 0],
        events: [
            {
                minute: 6,
                type: 'goal',
                player: 'Cristiano Ronaldo',
                assist: 'João Cancelo',
                team: 'POR',
            },
            {
                minute: 14,
                type: 'yellow_card',
                player: 'Odiljon Xamrobekov',
                team: 'UZB'
            },
            {
                minute: 17,
                type: 'goal',
                player: 'Nuno Mendes',
                team: 'POR',
            },
            {
                minute: 39,
                type: 'goal',
                player: 'Cristiano Ronaldo',
                assist: 'Bruno Fernandes',
                team: 'POR',
            },
            {
                minute: 60,
                type: 'own_goal',
                player: 'Abduvohid Nematov',
                team: 'UZB',
                note: '(OG)'
            },
            {
                minute: 68,
                type: 'yellow_card',
                player: 'Renato Veiga',
                team: 'POR'
            },
            {
                minute: 87,
                type: 'goal',
                player: 'Rafael Leao',
                team: 'POR',
            },
        ]
    },
    48: {
        result: [1, 0],
        events: [
            {
                minute: 56,
                type: 'yellow_card',
                player: 'Jhon Lucumi',
                team: 'COL'
            },
            {
                minute: 76,
                type: 'goal',
                player: 'Daniel Munoz',
                assist: 'J. F. Quintero',
                team: 'COL',
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Charles Pickel',
                team: 'COD'
            },
            {
                minute: 90,
                extraMinute: 4,
                type: 'yellow_card',
                player: 'Jefferson Lerma',
                team: 'COL'
            },
        ]
    },
    49: {
        result: [0, 3],
        events: [
            {
                minute: 7,
                type: 'goal',
                player: 'Vinicius Junior',
                team: 'BRA',
            },
            {
                minute: 45,
                extraMinute: 3,
                type: 'goal',
                player: 'Vinicius Junior',
                assist: 'Bruno Guimarães',
                team: 'BRA',
            },
            {
                minute: 60,
                type: 'goal',
                player: 'Matheus Cunha',
                assist: 'Bruno Guimarães',
                team: 'BRA',
            },
            {
                minute: 62,
                type: 'yellow_card',
                player: 'Danilo',
                team: 'BRA'
            },
            {
                minute: 82,
                type: 'yellow_card',
                player: 'Fabinho',
                team: 'BRA'
            },
            {
                minute: 89,
                type: 'yellow_card',
                player: 'Ryan Christie',
                team: 'SCO'
            },
        ]
    },
    50: {
        result: [4, 2],
        events: [
            {
                minute: 10,
                type: 'own_goal',
                player: 'Yassine Bounou',
                team: 'MAR',
                note: '(OG)'
            },
            {
                minute: 39,
                type: 'goal',
                player: 'Achraf Hakimi',
                team: 'MAR',
            },
            {
                minute: 43,
                type: 'goal',
                player: 'Wilson Isidor',
                assist: 'Jean-Kevin Duverne',
                team: 'HTI',
            },
            {
                minute: 45,
                extraMinute: 1,
                type: 'goal',
                player: 'Ismael Saibari',
                assist: 'Achraf Hakimi',
                team: 'MAR',
            },
            {
                minute: 78,
                type: 'goal',
                player: 'Soufiane Rahimi',
                team: 'MAR',
            },
            {
                minute: 79,
                type: 'yellow_card',
                player: 'Johny Placide',
                team: 'HTI'
            },
            {
                minute: 79,
                type: 'yellow_card',
                player: 'Duckens Nazon',
                team: 'HTI'
            },
            {
                minute: 89,
                type: 'goal',
                player: 'Gessime Yassine',
                assist: 'Soufiane Rahimi',
                team: 'MAR',
            },
            {
                minute: 90,
                extraMinute: 3,
                type: 'yellow_card',
                player: 'Josue Casimir',
                team: 'HTI'
            },
        ]
    },
    51: {
        result: [2, 1],
        events: [
            {
                minute: 32,
                type: 'yellow_card',
                player: 'Cyle Larin',
                team: 'CAN'
            },
            {
                minute: 32,
                type: 'yellow_card',
                player: 'Granit Xhaka',
                team: 'SUI'
            },
            {
                minute: 46,
                type: 'goal',
                player: 'Ruben Vargas',
                assist: 'Johan Manzambi',
                team: 'SUI'
            },
            {
                minute: 57,
                type: 'goal',
                player: 'Johan Manzambi',
                assist: 'Breel Embolo',
                team: 'SUI'
            },
            {
                minute: 76,
                type: 'goal',
                player: 'Promise David',
                assist: 'Nathan-Dylan Saliba',
                team: 'CAN'
            },
            {
                minute: 87,
                type: 'yellow_card',
                player: 'Liam Millar',
                team: 'CAN'
            },
        ]
    },
    52: {
        result: [3, 1],
        events: [
            {
                minute: 29,
                type: 'goal',
                player: 'Kerim Alajbegovic',
                team: 'BIH'
            },
            {
                minute: 34,
                type: 'own_goal',
                player: 'Mahmoud Abunada',
                team: 'QAT',
                note: '(OG)'
            },
            {
                minute: 42,
                type: 'goal',
                player: 'Hassan Alhaydos',
                team: 'QAT'
            },
            {
                minute: 78,
                type: 'yellow_card',
                player: 'Ahmed Fathy',
                team: 'QAT'
            },
            {
                minute: 80,
                type: 'goal',
                player: 'Ermin Mahmic',
                team: 'BIH'
            },
            {
                minute: 82,
                type: 'yellow_card',
                player: 'Ermin Mahmic',
                team: 'BIH'
            },
        ]
    },
    53: {
        result: [0, 3],
        events: []
    },
    54: {
        result: [1, 0],
        events: []
    },
    55: {
        result: [0, 2],
        events: []
    },
    56: {
        result: [2, 1],
        events: []
    },
    57: {
        result: [1, 1],
        events: []
    },
    58: {
        result: [1, 3],
        events: []
    },
    59: {
        result: [3, 2],
        events: []
    },
    60: {
        result: [0, 0],
        events: []
    },
    61: {
        result: [1, 4],
        events: []
    },
    62: {
        result: [5, 0],
        events: []
    },
    63: {
        result: [1, 1],
        events: []
    },
    64: {
        result: [1, 5],
        events: []
    },
    65: {
        result: [0, 0],
        events: []
    },
    66: {
        result: [0, 1],
        events: []
    },
    67: {
        result: [0, 2],
        events: []
    },
    68: {
        result: [2, 1],
        events: []
    },
    69: {
        result: [3, 3],
        events: []
    },
    70: {
        result: [1, 3],
        events: []
    },
    71: {
        result: [0, 0],
        events: []
    },
    72: {
        result: [3, 1],
        events: []
    },
    73: {
        result: [0, 1],
        events: []
    },
    74: {
        result: [1, 1],
        result_after_extra_time: [1, 1],
        result_after_penalties: [3, 4],
        events: []
    },
    75: {
        result: [1, 1],
        result_after_extra_time: [1, 1],
        result_after_penalties: [2, 3],
        events: []
    },
    76: {
        result: [2, 1],
        events: []
    },
    77: {
        result: [3, 0],
        events: []
    },
    78: {
        result: [1, 2],
        events: []
    },
    79: {
        result: [2, 0],
        events: []
    },
    80: {
        result: [2, 1],
        events: []
    },
    81: {
        result: [2, 0],
        events: []
    },
    82: {
        result: [2, 2],
        result_after_extra_time: [3, 2],
        events: []
    },
    83: {
        result: [2, 1],
        events: []
    },
    84: {
        result: [3, 0],
        events: []
    },
    85: {
        result: [2, 0],
        events: []
    }
};