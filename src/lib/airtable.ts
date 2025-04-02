import Airtable, {FieldSet, Record, Records} from "airtable";
import {EvaluationStatus, Submission, VoyageRole} from "@/types/SoloProjectTypes";
import { CheckIn, CheckinFormRole, ProcessRating, SprintNumber, Tier } from "@/types/CheckinTypes";

const base = new Airtable({apiKey: process.env.AIRTABLE_PAT})
    .base(process.env.AIRTABLE_BASEID as string)

const table = base(process.env.AIRTABLE_TABLEID as string)
const userTable = base(process.env.AIRTABLE_USERS_TABLEID as string)
const checkinTable = base(process.env.AIRTABLE_CHECKIN_TABLEID as string)

const fields = [
    "Email",
    "Discord Name",
    "GitHub ID",
    "Timestamp",
    "Tier",
    "GitHub Repo URL",
    "Deployed App URL",
    "UI/UX Project URL",
    "Evaluation Status",
    "Evaluator",
    "Evaluation Feedback",
    "Instructions",
    "Addl. Comments",
    "Voyage Role (from Applications link)",
    "Role Type",
    "Role",
    "Discord ID",
    // PO
    "PO: Certification",
    "PO: Highest Certification",
    "PO: Participated in Project as PO",
    "PO: Project Details",
    "PO05",
    "PO06",
    "PO07",
    "PO08",
    "PO09",
    "PO10",
    "PO11",
    "PO12",
    "PO13",
    "PO14",
    "PO15",
    "PO16",
    "PO17",
    "PO18",
    "PO19",
    "PO20",
    "PO21",
    "PO Product Backlog URL",
    // SM
    "SM: Certification",
    "SM: Highest Certification",
    "SM: Participated in Project as SM",
    "SM: Project Details",
    "SM05",
    "SM06",
    "SM07",
    "SM08",
    "SM09",
    "SM10",
    "SM11",
    "SM12",
    "SM13",
    "SM14",
    "SM15",
    "SM16",
    "SM17",
    "SM18",
    "SM19",
    "SM20",
    "SM21",
    "SM22",
]

// solo project
const transformRecord = (record: Record<FieldSet>) => {
    return {
        id: record.id,
        commentCount: record.commentCount as number,
        fields: {
            "Email": record.fields["Email"] as string,
            "Discord Name": record.fields["Discord Name"] as string,
            "GitHub ID": record.fields["GitHub ID"] as string,
            "Timestamp": record.fields["Timestamp"] as string,
            "Tier": record.fields["Tier"] as string,
            "GitHub Repo URL": record.fields["GitHub Repo URL"] as string,
            "Deployed App URL": record.fields["Deployed App URL"] as string,
            "UI/UX Project URL": record.fields["UI/UX Project URL"] as string,
            "Evaluation Status": record.fields["Evaluation Status"] as EvaluationStatus,
            "Evaluator": record.fields["Evaluator"] as string,
            "Evaluation Feedback": record.fields["Evaluation Feedback"] as string,
            "Instructions": record.fields["Instructions"] as string,
            "Addl. Comments": record.fields["Addl. Comments"] as string,
            "Voyage Role (from Applications link)": record.fields["Voyage Role (from Applications link)"] as VoyageRole,
            "Role": record.fields["Role"] as VoyageRole,
            "Role Type": record.fields["Role Type"] as string,
            "Discord ID": record.fields["Discord ID"] as string,
            // PO
            "PO: Certification": record.fields["PO: Certification"] as string,
            "PO: Highest Certification": record.fields["PO: Highest Certification"] as string,
            "PO: Participated in Project as PO": record.fields["PO: Participated in Project as PO"] as string,
            "PO: Project Details": record.fields["PO: Project Details"] as string,
            "PO05": record.fields["PO05"] as string,
            "PO06": record.fields["PO06"] as string,
            "PO07": record.fields["PO07"] as string,
            "PO08": record.fields["PO08"] as string,
            "PO09": record.fields["PO09"] as string,
            "PO10": record.fields["PO10"] as string,
            "PO11": record.fields["PO11"] as string,
            "PO12": record.fields["PO12"] as string,
            "PO13": record.fields["PO13"] as string,
            "PO14": record.fields["PO14"] as string,
            "PO15": record.fields["PO15"] as string,
            "PO16": record.fields["PO16"] as string,
            "PO17": record.fields["PO17"] as string,
            "PO18": record.fields["PO18"] as string,
            "PO19": record.fields["PO19"] as string,
            "PO20": record.fields["PO20"] as string,
            "PO21": record.fields["PO21"] as string,
            "PO Product Backlog URL": record.fields["PO Product Backlog URL"] as string,
            // SM
            "SM: Certification": record.fields["SM: Certification"] as string,
            "SM: Highest Certification": record.fields["SM: Highest Certification"] as string,
            "SM: Participated in Project as SM": record.fields["SM: Participated in Project as SM"] as string,
            "SM: Project Details": record.fields["SM: Project Details"] as string,
            "SM05": record.fields["SM05"] as string,
            "SM06": record.fields["SM06"] as string,
            "SM07": record.fields["SM07"] as string,
            "SM08": record.fields["SM08"] as string,
            "SM09": record.fields["SM09"] as string,
            "SM10": record.fields["SM10"] as string,
            "SM11": record.fields["SM11"] as string,
            "SM12": record.fields["SM12"] as string,
            "SM13": record.fields["SM13"] as string,
            "SM14": record.fields["SM14"] as string,
            "SM15": record.fields["SM15"] as string,
            "SM16": record.fields["SM16"] as string,
            "SM17": record.fields["SM17"] as string,
            "SM18": record.fields["SM18"] as string,
            "SM19": record.fields["SM19"] as string,
            "SM20": record.fields["SM20"] as string,
            "SM21": record.fields["SM21"] as string,
            "SM22": record.fields["SM22"] as string,
        }
    }
}

const transformData = (records:Records<FieldSet>): Submission[] => {
    return records.map((record: Record<FieldSet>)=>transformRecord(record))
}

const transformDataSingleRecord = (record:Record<FieldSet>) => {
   return transformRecord(record)
}


/*********
 Checkin
 ************/

const transformCheckinRecord = (record: Record<FieldSet>) => {
    return {
        id: record.id,
        fields: {
            "Timestamp": record.fields["Timestamp"] as string,
            "Email": record.fields["Email"] as string,
            "Discord Name": record.fields["Discord Name"] as string,
            "Team Name": record.fields["Team Name"] as Tier,
            "Team No.": record.fields["Team No."] as string,
            "Team Communications": record.fields["Team Communications"] as string,
            "Time Spent - Pair programming": record.fields["Time Spent - Pair programming"] as string,
            "Time Spent - On Your Own": record.fields["Time Spent - On Your Own"] as string,
            "Time Spent - Team Activities": record.fields["Time Spent - Team Activities"] as string,
            "Progress Rating": record.fields["Progress Rating"] as ProcessRating,
            "Deployed to Prod": record.fields["Deployed to Prod"] as boolean,
            "Inactive Teammates": record.fields["Inactive Teammates"] as string,
            "Helpful Teammates": record.fields["Helpful Teammates"] as string,
            "Team Achievements": record.fields["Team Achievements"] as string,
            Voyage: record.fields["Voyage"] as string,
            "Sprint No.": record.fields["Sprint No."] as SprintNumber,
            "Time Spent - Learning & Research": record.fields["Time Spent - Learning & Research"] as string,
            "Individual Feedback Sent": record.fields["Individual Feedback Sent"] as boolean,
            "Ack. Email Sent": record.fields["Ack. Email Sent"] as boolean,
            Role: record.fields["Role"] as CheckinFormRole,
            "Addl. Comments": record.fields["Addl. Comments"] as string,
        }
    }
}

const transformCheckinData = (records:Records<FieldSet>): CheckIn[] => {
    return records.map((record: Record<FieldSet>)=>transformCheckinRecord(record))
}

const transformCheckinDataSingleRecord = (record:Record<FieldSet>) => {
    return transformCheckinRecord(record)
}

export {
    table,
    userTable,
    checkinTable,
    fields,
    transformData,
    transformDataSingleRecord,
    transformCheckinData,
    transformCheckinDataSingleRecord
}

