"use server"

import { checkinTable } from "@/lib/airtable";

export const getCheckInsByVoyageNumber = async () => {

}

export const getLastestCheckIns = async () => {
    const records = await checkinTable.select({}).firstPage()
    return records
}