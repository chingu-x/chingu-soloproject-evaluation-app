'use client'

import { CheckIn, CheckInFields } from "@/types/CheckinTypes";
import { createColumnHelper, getCoreRowModel } from "@tanstack/table-core";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, useReactTable } from "@tanstack/react-table";

const CheckinTable = ({records}: { records: CheckIn[] }) => {

    const columnHeaders: Array<keyof CheckInFields> = ["Discord Name", "Voyage","Team Name", "Team No."]
    const columnHelper = createColumnHelper<CheckIn>()


    const columns = columnHeaders.map((columnName) => {
        return columnHelper.accessor((row)=> row.fields[columnName],{
            id: columnName,
            header: columnName
        })
    })

    const table = useReactTable<CheckIn>({
        data: records,
        columns,
        getCoreRowModel: getCoreRowModel<CheckIn>()
    })



    return(
        <div className="mt-6 rounded-lg overflow-hidden border border-border">
            <Table className="border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header)=>(
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row)=>(
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell=>(
                                <TableCell
                                    key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
 }

 export default CheckinTable