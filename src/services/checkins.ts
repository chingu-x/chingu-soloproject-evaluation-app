"use server"

import { checkinTable, transformCheckinData } from "@/lib/airtable";

export const getCheckInsByVoyageNumber = async () => {

}

export const getLastestCheckIns = async () => {
    const records = await checkinTable.select({}).firstPage()
    return transformCheckinData(records)
}