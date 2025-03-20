'use client'

import { FieldSet, Records } from "airtable";
import { CheckInFields } from "@/types/CheckinTypes";
import { createColumnHelper, getCoreRowModel } from "@tanstack/table-core";
import { Table, TableHeader } from "@/components/ui/table";
import { useReactTable } from "@tanstack/react-table";

const CheckinTable = (records: Records<FieldSet>) => {

    const columnHeaders: Array<keyof CheckInFields>= ["Discord Name", "Team Name", "Team No."]
    const columnHelper = createColumnHelper<CheckInFields>()

    const columns = columnHeaders.map((columnName) => {
        return columnHelper.accessor(columnName,{
            id: columnName,
            header: columnName
        })
    })

    const table = useReactTable({
        records,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return(
        <div className="mt-6 rounded-lg overflow-hidden border border-border">
            <Table className="border">
                <TableHeader>
                    {}
                </TableHeader>
            </Table>
        </div>
    )
 }

 export default CheckinTable