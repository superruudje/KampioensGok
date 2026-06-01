# Betting Pool Player JSON Structure

This JSON file contains all tournament predictions submitted by betting pool participants.

The root element is an array of player objects.

---

## Example

```json
[
  {
    "name": "John Doe",
    "team_name": "A-Team",
    "predictions": [],
    "bonus": [],
    "round_of_32": [],
    "round_of_16": [],
    "quarter_finals": [],
    "semi_finals": [],
    "bronze_final": [],
    "final": []
  }
]
```

---

# Player Object

Represents a single participant in the betting pool.

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Name of the participant |
| `team_name` | `string` | Optional team/group name of the participant |
| `predictions` | `Prediction[]` | Match predictions |
| `bonus` | `string[]` | Bonus question answers |
| `round_of_32` | `string[]` | Predicted teams advancing to the Round of 32 |
| `round_of_16` | `string[]` | Predicted teams advancing to the Round of 16 |
| `quarter_finals` | `string[]` | Predicted quarter finalists |
| `semi_finals` | `string[]` | Predicted semi finalists |
| `bronze_final` | `string[]` | Predicted bronze final teams |
| `final` | `string[]` | Predicted finalists |

---

# Prediction Object

Represents a prediction for a single match.

```json
{
  "match": 1,
  "result": [3, 4],
  "teams": ["MEX", "BEL"]
}
```

| Field | Type | Description |
|---|---|---|
| `match` | `number` | Match number identifier |
| `result` | `number[]` | Predicted score in `[home, away]` format |
| `teams` | `string[]` | Participating teams in `[home, away]` order |

---

# Knockout Stage Arrays

The knockout stage arrays contain team codes in predicted advancing order.

Example:

```json
"quarter_finals": [
  "RSA",
  "MAR",
  "CPV",
  "POR",
  "EGY",
  "NGA",
  "HTI",
  "PAR"
]
```

---

# Bonus Array

The `bonus` array contains answers to tournament bonus questions.

Example:

```json
"bonus": [
  "MEX",
  "200",
  "200",
  "JOR",
  "SEN",
  "Stefan De Vrij",
  "Denzel Dumfries",
  "Bart Verbruggen",
  "Virgil van Dijk"
]
```

The meaning and order of bonus values are application-specific and should match the configured bonus questions in the tournament setup.

---

# Team Codes

Teams are represented using short country/team codes.

Examples:

| Code | Team |
|---|---|
| `MEX` | Mexico |
| `BEL` | Belgium |
| `JOR` | Jordan |
| `SEN` | Senegal |

---

# Notes

- All knockout stage arrays should contain the expected number of teams for that stage.
- Match predictions use regular time results unless otherwise specified.
- Team order in `teams` and `result` arrays must remain consistent.
- Match numbers should correspond to the tournament match definitions.