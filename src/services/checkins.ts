"use server"

import { checkinTable, transformCheckinData } from "@/lib/airtable";

export const getCheckInsByVoyage = async (voyage: string) => {
    const records = await checkinTable.select({
        filterByFormula: `{Voyage} = "${voyage.toUpperCase()}"`,
        sort: [{
            field: "Team No.",
            direction: "asc",
        }]
    }).all()

    return transformCheckinData(records)
}

// Sort by timestamp doesn't work as it's a string, but not sure why it works with solo project (for passed), possibly because it has a filter
// Workaround: sort with voyage then timestamp
export const getLastestCheckIns = async () => {
    const records = await checkinTable.select({
        sort: [
            {
                field: "Voyage",
                direction: "desc"
            }, {
                field: "Timestamp",
                direction: "desc",
            }
        ],
        pageSize: 100,
    }).firstPage()
    // console.log(JSON.stringify(records))
    // console.log("checkins.ts", records[0]._rawJson.createdTime)
    return transformCheckinData(records)
}

