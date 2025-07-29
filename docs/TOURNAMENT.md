# Tournament Data
- [Data Folder Overview (`/public/data`)](#data-folder-overview-publicdata)
    - [`locations.json`](#locationsjson)
    - [`match_days.json`](#match_daysjson)
    - [`teams.json`](#teamsjson)
    - [`tournament.json`](#tournamentjson)
        - [Poules](#poules)
        - [Knock-out Stage](#knock-out-stage)

## Data Folder Overview (`/public/data`)

This project stores all tournament and player data in the `public/data` directory. Below is a description of each JSON file and its structure:

---

### `locations.json`

Contains an array of all stadiums where matches will be played.

Each entry includes:

| Field     | Type    | Description                      |
|-----------|---------|----------------------------------|
| `id`      | number  | Unique identifier of the location |
| `country` | string  | Country where the stadium is located |
| `city`    | string  | City where the stadium is located |
| `stadium` | string  | Name of the stadium              |
| `capacity`| number  | Stadium capacity (number of seats) |

---

### `match_days.json`

Defines all match days in the tournament schedule.

Each entry includes:

| Field    | Type    | Description                                |
|----------|---------|--------------------------------------------|
| `id`     | number  | Unique identifier of the match day         |
| `date`   | string  | Date in `MM/DD/YYYY` format                |
| `type`   | string  | Custom label for the match day             |
| `stage`  | string  | Tournament phase: `'group'` or `'knockout'` |

---

### `teams.json`

Contains all teams participating in the tournament.

Each entry includes:

| Field        | Type      | Description                                   |
|--------------|-----------|-----------------------------------------------|
| `id`         | string    | Team code (e.g., `"NED"`, `"BRA"`)            |
| `short_name` | string    | Abbreviated name for display                  |
| `full_name`  | string    | Full country/team name                        |
| `poule_name` | string    | Group or pool assignment (e.g., `"A" \| "B"`) |
| `squad`      | string[]  | List of player names in the team              |

---

### `tournament.json`

Defines the tournament structure, including group stages and knockout rounds.

#### Poules

The `poules` array represents the group stage of the tournament. Each group contains four teams identified by their team codes (as defined in `teams.json`).

```json
{
  "name": "A",
  "teams": ["MEX", "BEL", "JOR", "SEN"]
}
```

| Property | Type     | Description                           |
|----------|----------|---------------------------------------|
| `name`   | `string` | Group name (e.g., `"A"`, `"B"`, etc.) |
| `teams`  | `string[]` | Array of team codes in the group     |

#### Knock-out Stage

The `knock_out` object holds the structure for the elimination rounds. Each property contains an array of team codes representing the teams that qualified for that round.

```json
"knock_out": {
  "round_of_32": [],
  "round_of_16": [],
  "quarter_final": [],
  "semi_final": [],
  "bronze_final": [],
  "final": []
}
```

| Property         | Description                      |
|------------------|----------------------------------|
| `round_of_32`    | First knockout round             |
| `round_of_16`    | Second knockout round            |
| `quarter_final`  | Quarter-finals                   |
| `semi_final`     | Semi-finals                      |
| `bronze_final`   | Match for third place            |
| `final`          | Final match                      |

> 💡 All team codes correspond to the `id` values in `teams.json`.

---

Ensure any changes to these files maintain the correct structure, as they are critical to the functioning of the application.