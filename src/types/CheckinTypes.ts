export type CheckIn = {
    id: string,
    fields: CheckInFields
}

export type CheckInFields = {
    Email: string,
    "Discord Name": string,
    "Team Name": Tier, // This is really tier number / name
    "Team No.": string,
    "Team Communications": string,
    "Time Spent - Pair programming": string,
    "Time Spent - On Your Own": string,
    "Time Spent - Team Activities": string,
    "Progress Rating": ProcessRating,
    "Deployed to Prod": boolean,
    "Inactive Teammates": string,
    "Helpful Teammates": string,
    "Team Achievements": string,
    Voyage: string,
    "Sprint No.": SprintNumber,
    "Time Spent - Learning & Research": string,
    "Individual Feedback Sent": boolean,
    "Ack. Email Sent": boolean,
    Role: CheckinFormRole,
    "Addl. Comments": string,
}

type ProcessRating =
    | "GREEN - We have had a good start!"
    | "YELLOW - I'm nervous we won't finish."
    | "RED - It doesn't look good right now"

type SprintNumber =
    | "Sprint 1"
    | "Sprint 2"
    | "Sprint 3"
    | "Sprint 4"
    | "Sprint 5"
    | "Sprint 6"

type CheckinFormRole =
    | "Web Developer"
    | "UI/UX Designer"
    | "Data Scientist"
    | "Product Owner"
    | "Scrum Master"
    | "unknown"

type Tier =
    | "Tier 1"
    | "Tier 2"
    | "Tier 3"