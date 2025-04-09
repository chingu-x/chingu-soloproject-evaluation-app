export type CheckIn = {
    id: string,
    fields: CheckInFields
}

export type CheckInFields = {
    Timestamp: string,
    Email: string,
    "Discord Name": string,
    "Team Name": Tier, // This is really tier number / name
    "Team No.": string,
    "Team Communications": string,
    "Time Spent - Pair programming": string,
    "Time Spent - On Your Own": string,
    "Time Spent - Team Activities": string,
    "Progress Rating": ProgessRating,
    "Deployed to Prod": string,
    "Inactive Teammates": string,
    "Helpful Teammates": string,
    "Team Achievements": string,
    Voyage: string,
    "Sprint No.": SprintNumber,
    "Time Spent - Learning & Research": string,
    "Individual Feedback Sent": string,
    "Ack. Email Sent": string,
    Role: CheckinFormRole,
    "Addl. Comments": string,
}

export type ProgessRating =
    | "GREEN - We have had a good start!"
    | "YELLOW - I'm nervous we won't finish."
    | "RED - It doesn't look good right now"

export type SprintNumber =
    | "Sprint 1"
    | "Sprint 2"
    | "Sprint 3"
    | "Sprint 4"
    | "Sprint 5"
    | "Sprint 6"

export type CheckinFormRole =
    | "Web Developer"
    | "UI/UX Designer"
    | "Data Scientist"
    | "Product Owner"
    | "Scrum Master"
    | "unknown"

export type Tier =
    | "Tier 1"
    | "Tier 2"
    | "Tier 3"